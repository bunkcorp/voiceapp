const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });

function pathParts(url) {
  return url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
}

export default {
  async fetch(request, env) {
    const auth = request.headers.get("Authorization") || "";
    if (auth !== `Bearer ${env.STORE_SECRET}`) {
      return json({ error: "Unauthorized" }, 401);
    }

    const url = new URL(request.url);
    const parts = pathParts(url);

    try {
      if (
        request.method === "GET" &&
        parts.length === 1 &&
        parts[0] === "conversations"
      ) {
        const { results } = await env.DB.prepare(
          "SELECT id, title, created_at, updated_at FROM conversations ORDER BY updated_at DESC"
        ).all();
        return json({ conversations: results || [] });
      }

      if (
        request.method === "POST" &&
        parts.length === 1 &&
        parts[0] === "conversations"
      ) {
        const body = await request.json().catch(() => ({}));
        const id = typeof body.id === "string" && body.id ? body.id : crypto.randomUUID();
        const title =
          typeof body.title === "string" && body.title.trim()
            ? body.title.trim()
            : "New chat";
        const now = Date.now();
        await env.DB.prepare(
          "INSERT INTO conversations (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)"
        )
          .bind(id, title, now, now)
          .run();
        return json({ id, title, created_at: now, updated_at: now });
      }

      if (
        request.method === "GET" &&
        parts[0] === "conversations" &&
        parts.length === 2
      ) {
        const id = parts[1];
        const conversation = await env.DB.prepare(
          "SELECT id, title, created_at, updated_at FROM conversations WHERE id = ?"
        )
          .bind(id)
          .first();
        if (!conversation) {
          return json({ error: "Not found" }, 404);
        }
        const { results: messages } = await env.DB.prepare(
          "SELECT id, conversation_id, role, kind, text, file_id, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC"
        )
          .bind(id)
          .all();
        const { results: files } = await env.DB.prepare(
          "SELECT id, conversation_id, filename, mime_type, size, storage_key, extracted_text, created_at FROM files WHERE conversation_id = ? ORDER BY created_at ASC"
        )
          .bind(id)
          .all();
        return json({
          conversation,
          messages: messages || [],
          files: files || [],
        });
      }

      if (
        request.method === "PATCH" &&
        parts[0] === "conversations" &&
        parts.length === 2
      ) {
        const id = parts[1];
        const existing = await env.DB.prepare(
          "SELECT id FROM conversations WHERE id = ?"
        )
          .bind(id)
          .first();
        if (!existing) {
          return json({ error: "Not found" }, 404);
        }
        const body = await request.json().catch(() => ({}));
        const now = Date.now();
        if (typeof body.title === "string" && body.title.trim()) {
          await env.DB.prepare(
            "UPDATE conversations SET title = ?, updated_at = ? WHERE id = ?"
          )
            .bind(body.title.trim(), now, id)
            .run();
        } else {
          await env.DB.prepare(
            "UPDATE conversations SET updated_at = ? WHERE id = ?"
          )
            .bind(now, id)
            .run();
        }
        const conversation = await env.DB.prepare(
          "SELECT id, title, created_at, updated_at FROM conversations WHERE id = ?"
        )
          .bind(id)
          .first();
        return json(conversation);
      }

      if (
        request.method === "DELETE" &&
        parts[0] === "conversations" &&
        parts.length === 2
      ) {
        const id = parts[1];
        const { results: files } = await env.DB.prepare(
          "SELECT storage_key FROM files WHERE conversation_id = ?"
        )
          .bind(id)
          .all();
        for (const file of files || []) {
          await env.UPLOADS.delete(file.storage_key);
        }
        await env.DB.prepare("DELETE FROM messages WHERE conversation_id = ?")
          .bind(id)
          .run();
        await env.DB.prepare("DELETE FROM files WHERE conversation_id = ?")
          .bind(id)
          .run();
        await env.DB.prepare("DELETE FROM conversations WHERE id = ?")
          .bind(id)
          .run();
        return json({ ok: true });
      }

      if (
        request.method === "PUT" &&
        parts[0] === "conversations" &&
        parts[2] === "messages" &&
        parts.length === 3
      ) {
        const id = parts[1];
        const existing = await env.DB.prepare(
          "SELECT id FROM conversations WHERE id = ?"
        )
          .bind(id)
          .first();
        if (!existing) {
          return json({ error: "Not found" }, 404);
        }
        const body = await request.json().catch(() => ({}));
        const messages = Array.isArray(body.messages) ? body.messages : [];
        const now = Date.now();
        const stmts = messages.map((message) =>
          env.DB.prepare(
            `INSERT INTO messages (id, conversation_id, role, kind, text, file_id, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET
               text = excluded.text,
               kind = excluded.kind,
               file_id = excluded.file_id`
          ).bind(
            String(message.id),
            id,
            String(message.role),
            String(message.kind || "text"),
            String(message.text || ""),
            message.file_id ? String(message.file_id) : null,
            Number(message.created_at) || now
          )
        );
        stmts.push(
          env.DB.prepare(
            "UPDATE conversations SET updated_at = ? WHERE id = ?"
          ).bind(now, id)
        );
        await env.DB.batch(stmts);
        return json({ ok: true, count: messages.length });
      }

      if (
        request.method === "POST" &&
        parts[0] === "conversations" &&
        parts[2] === "files" &&
        parts.length === 3
      ) {
        const conversationId = parts[1];
        const existing = await env.DB.prepare(
          "SELECT id FROM conversations WHERE id = ?"
        )
          .bind(conversationId)
          .first();
        if (!existing) {
          return json({ error: "Not found" }, 404);
        }

        const form = await request.formData();
        const upload = form.get("file");
        if (!(upload instanceof File)) {
          return json({ error: "Missing file" }, 400);
        }

        const fileId = String(form.get("id") || crypto.randomUUID());
        const filename = String(form.get("filename") || upload.name || "upload");
        const mimeType = String(
          form.get("mime_type") || upload.type || "application/octet-stream"
        );
        const extractedText = String(form.get("extracted_text") || "");
        const bytes = await upload.arrayBuffer();
        const storageKey = `${conversationId}/${fileId}`;
        const now = Date.now();

        await env.UPLOADS.put(storageKey, bytes);
        await env.DB.prepare(
          `INSERT INTO files (id, conversation_id, filename, mime_type, size, storage_key, extracted_text, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            fileId,
            conversationId,
            filename,
            mimeType,
            bytes.byteLength,
            storageKey,
            extractedText,
            now
          )
          .run();
        await env.DB.prepare(
          "UPDATE conversations SET updated_at = ? WHERE id = ?"
        )
          .bind(now, conversationId)
          .run();

        return json({
          id: fileId,
          conversation_id: conversationId,
          filename,
          mime_type: mimeType,
          size: bytes.byteLength,
          storage_key: storageKey,
          extracted_text: extractedText,
          created_at: now,
        });
      }

      if (
        request.method === "GET" &&
        parts[0] === "conversations" &&
        parts[2] === "files" &&
        parts.length === 4
      ) {
        const file = await env.DB.prepare(
          "SELECT id, conversation_id, filename, mime_type, size, storage_key, extracted_text, created_at FROM files WHERE id = ? AND conversation_id = ?"
        )
          .bind(parts[3], parts[1])
          .first();
        if (!file) {
          return json({ error: "Not found" }, 404);
        }
        if (url.searchParams.get("meta") === "1") {
          return json(file);
        }
        const object = await env.UPLOADS.get(file.storage_key, {
          type: "arrayBuffer",
        });
        if (!object) {
          return json({ error: "Not found" }, 404);
        }
        return new Response(object, {
          headers: {
            "content-type": file.mime_type || "application/octet-stream",
            "cache-control": "private, max-age=3600",
            "content-disposition": `inline; filename="${encodeURIComponent(file.filename)}"`,
          },
        });
      }

      return json({ error: "Not found" }, 404);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : "Store error" },
        500
      );
    }
  },
};
