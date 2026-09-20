#!/usr/bin/env bash
# Install LaunchAgents so Tibetan STT + Cloudflare Tunnel survive logout/reboot.
#
# macOS blocks LaunchAgents from executing scripts under Desktop/Documents
# (TCC "Operation not permitted"). This installer rsyncs the service to
# ~/tibetan-stt and points LaunchAgents there. Re-run after pulling STT changes.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# When invoked from repo: .../voiceapp/services/tibetan-stt/scripts
# When invoked from ~/tibetan-stt copy: still works if SRC is passed.
SRC="${TIBETAN_STT_SRC:-$(cd "$(dirname "$0")/.." && pwd)}"
# Prefer the voiceapp tree as source of truth when present.
if [[ -d "$REPO_ROOT/services/tibetan-stt/app" ]]; then
  SRC="$REPO_ROOT/services/tibetan-stt"
elif [[ -d "$HOME/Desktop/voiceapp/services/tibetan-stt/app" ]]; then
  SRC="$HOME/Desktop/voiceapp/services/tibetan-stt"
fi

DST="${TIBETAN_STT_HOME:-$HOME/tibetan-stt}"
LOG_DIR="${TIBETAN_STT_LOG_DIR:-$HOME/Library/Logs/tibetan-stt}"
AGENTS="$HOME/Library/LaunchAgents"

mkdir -p "$DST" "$LOG_DIR" "$AGENTS"

echo "Syncing $SRC → $DST"
rsync -a \
  --exclude logs \
  --exclude '__pycache__' \
  --exclude '*.pyc' \
  --exclude .venv \
  "$SRC/" "$DST/"
chmod +x "$DST/run.sh" "$DST/scripts/"*.sh

# Ensure a local venv exists under ~/tibetan-stt (Desktop .venv is not relocatable / TCC-safe).
if [[ ! -x "$DST/.venv/bin/python" ]]; then
  echo "Creating venv in $DST (one-time)…"
  # Prefer copying from repo venv via run.sh on first start; run.sh creates it.
fi

STT_PLIST="$AGENTS/org.karmadots.tibetan-stt.plist"
TUNNEL_PLIST="$AGENTS/org.karmadots.tibetan-stt-tunnel.plist"

cat > "$STT_PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>org.karmadots.tibetan-stt</string>
	<key>ProgramArguments</key>
	<array>
		<string>/bin/bash</string>
		<string>$DST/scripts/run-stt.sh</string>
	</array>
	<key>WorkingDirectory</key>
	<string>$DST</string>
	<key>RunAtLoad</key>
	<true/>
	<key>KeepAlive</key>
	<true/>
	<key>ThrottleInterval</key>
	<integer>15</integer>
	<key>StandardOutPath</key>
	<string>$LOG_DIR/stt-stdout.log</string>
	<key>StandardErrorPath</key>
	<string>$LOG_DIR/stt-stderr.log</string>
	<key>EnvironmentVariables</key>
	<dict>
		<key>PATH</key>
		<string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
		<key>PORT</key>
		<string>8088</string>
		<key>HOME</key>
		<string>$HOME</string>
	</dict>
</dict>
</plist>
EOF

cat > "$TUNNEL_PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>org.karmadots.tibetan-stt-tunnel</string>
	<key>ProgramArguments</key>
	<array>
		<string>/bin/bash</string>
		<string>$DST/scripts/run-tunnel.sh</string>
	</array>
	<key>WorkingDirectory</key>
	<string>$DST</string>
	<key>RunAtLoad</key>
	<true/>
	<key>KeepAlive</key>
	<true/>
	<key>ThrottleInterval</key>
	<integer>5</integer>
	<key>StandardOutPath</key>
	<string>$LOG_DIR/tunnel-stdout.log</string>
	<key>StandardErrorPath</key>
	<string>$LOG_DIR/tunnel-stderr.log</string>
	<key>EnvironmentVariables</key>
	<dict>
		<key>PATH</key>
		<string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
		<key>HOME</key>
		<string>$HOME</string>
	</dict>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/org.karmadots.tibetan-stt" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/org.karmadots.tibetan-stt-tunnel" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$STT_PLIST"
launchctl bootstrap "gui/$(id -u)" "$TUNNEL_PLIST"
launchctl enable "gui/$(id -u)/org.karmadots.tibetan-stt" 2>/dev/null || true
launchctl enable "gui/$(id -u)/org.karmadots.tibetan-stt-tunnel" 2>/dev/null || true
launchctl kickstart -k "gui/$(id -u)/org.karmadots.tibetan-stt"
launchctl kickstart -k "gui/$(id -u)/org.karmadots.tibetan-stt-tunnel"

echo "Installed LaunchAgents (runtime: $DST)"
echo "  $STT_PLIST"
echo "  $TUNNEL_PLIST"
echo "Logs: $LOG_DIR/"
echo "Public URL: https://tibetan-stt.karmadots.org"
echo
echo "Note: macOS will not run LaunchAgents from Desktop; keep using this installer"
echo "after STT code changes so ~/tibetan-stt stays in sync."
