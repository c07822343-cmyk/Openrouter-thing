#!/usr/bin/env bash
set -e

echo "Setting up BananaRouter (dev)..."
if [ ! -d "Openrouter-thing" ]; then
  git clone https://github.com/c07822343-cmyk/Openrouter-thing.git
fi
cd Openrouter-thing
cp .env.example .env || true
npm install
npm run dev
