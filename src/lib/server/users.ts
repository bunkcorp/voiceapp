import { StoreRequestError, storeJson } from "@/lib/server/store";

export type StoredUser = {
  id: string;
  email: string;
  password_hash: string;
  created_at: number;
  updated_at: number;
};

export type PublicUser = {
  id: string;
  email: string;
  created_at: number;
  updated_at: number;
};

export async function countUsers() {
  const data = await storeJson<{ count: number }>("/users/count");
  return Number(data.count || 0);
}

export async function getUserByEmail(email: string) {
  try {
    return await storeJson<StoredUser>(
      `/users?email=${encodeURIComponent(email.trim().toLowerCase())}`
    );
  } catch (error) {
    if (error instanceof StoreRequestError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    return await storeJson<StoredUser>(`/users/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof StoreRequestError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function listUsers() {
  const data = await storeJson<{ users: PublicUser[] }>("/users");
  return data.users ?? [];
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  id?: string;
}) {
  return storeJson<PublicUser>("/users", {
    method: "POST",
    body: JSON.stringify({
      email: input.email.trim().toLowerCase(),
      password_hash: input.passwordHash,
      id: input.id,
    }),
  });
}

export async function updateUserPassword(id: string, passwordHash: string) {
  return storeJson<PublicUser>(`/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ password_hash: passwordHash }),
  });
}
