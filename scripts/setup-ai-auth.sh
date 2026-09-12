#!/bin/bash
# One-time setup: create .htpasswd on the server for AI at Squarespace.
# Run from repo root after deploy. Requires SSH access (same as deploy.sh).

set -e

SSH_OPTS="-p 2222 -o IdentityFile=~/.ssh/id_ed25519 -o IdentitiesOnly=yes"
REMOTE="haileytang@augustang.com"
HTPASSWD_PATH="/home2/haileytang/.htpasswd"
USER_NAME="${1:-reviewer}"

if [[ -z "${AI_SQSP_PASSWORD:-}" ]]; then
  echo "Set AI_SQSP_PASSWORD to the password you want, then re-run:"
  echo "  AI_SQSP_PASSWORD='your-long-random-password' ./scripts/setup-ai-auth.sh [username]"
  exit 1
fi

# APR1-MD5 — widely supported on shared Apache hosts (bcrypt can cause 500)
htpasswd -nbm "$USER_NAME" "$AI_SQSP_PASSWORD" | head -1 | ssh $SSH_OPTS "$REMOTE" \
  "cat > $HTPASSWD_PATH && chmod 644 $HTPASSWD_PATH && echo 'Created $HTPASSWD_PATH for user $USER_NAME'"
