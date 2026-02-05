#!/bin/bash
# different build commands per branch: https://developers.cloudflare.com/pages/how-to/build-commands-branches/

# update this in case we need a different build command on another branch
# if [ "$CF_PAGES_BRANCH" != "master" ]; then
#   npm run build
# fi

# now we'll run this to all the branches
npm run build