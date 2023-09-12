#!/bin/sh

CACHE_DIR="cache/assets"
ASSET_URL="https://überlandpost.ch/_astro"

mkdir -p $CACHE_DIR
cd $CACHE_DIR
wget -q "https://überlandpost.ch/_astro/assets.txt"

# if assets.txt doesn't exist, some HTML page is served instead
if ! grep -q "DOCTYPE html" assets.txt; then
  echo "Prepopulating asset cache"
  cat assets.txt | xargs -n 1 -P 20 -I{} sh -c "echo 'Downloading $ASSET_URL/{}'; wget -q '$ASSET_URL/{}'"
  echo "Cache prepopulated"
fi
