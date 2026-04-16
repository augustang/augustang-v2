#!/bin/bash
set -e

echo "Deploying to augustang.com..."

rsync -avz --delete \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '.cursor' \
  --exclude 'scss' \
  --exclude 'prepros*' \
  --exclude '.htaccess*' \
  --exclude '.well-known' \
  --exclude 'cgi-bin' \
  --exclude 'deploy.sh' \
  -e 'ssh -p 2222 -o IdentityFile=~/.ssh/id_ed25519 -o IdentitiesOnly=yes' \
  ./ haileytang@augustang.com:~/public_html/

echo "Deploy complete!"
