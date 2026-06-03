#!/bin/sh
set -eu

json_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

API_BASE="${VITE_API_BASE_URL:-http://127.0.0.1:8000}"
API_KEY="${VITE_API_KEY:-}"
BASE_ESC=$(json_escape "$API_BASE")
KEY_ESC=$(json_escape "$API_KEY")

cat > /usr/share/nginx/html/config.js <<EOF
window.__RUNTIME_CONFIG__ = {
  "__docker": true,
  "apiBaseUrl": "${BASE_ESC}",
  "apiKey": "${KEY_ESC}"
};
EOF

exec "$@"
