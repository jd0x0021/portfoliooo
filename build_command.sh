# !/bin/bash
# different build commands per branch: https://developers.cloudflare.com/pages/how-to/build-commands-branches/

# this will be changed to master once v2-vanilla-react's build is completed
if [ "$CF_PAGES_BRANCH" != "master" ]; then
  npm run build
fi