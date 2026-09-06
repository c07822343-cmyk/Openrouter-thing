VITE project for BananaRouter VM

PR creation (use GitHub CLI)

# Create a pull request for the feature branch

# If you have the GitHub CLI installed and authenticated (gh auth login):
#
# gh pr create --base main --head feature/vm-vm-ui --title "feat(vm): initial BananaRouter VM scaffold" --body "Initial scaffold: VM shell, window manager, AI window, session persistence, server proxy. No API key committed; set OPENROUTER_API_KEY in your .env."

# Or using curl with the REST API (requires a token in GITHUB_TOKEN):
#
# curl -X POST -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" \
#  https://api.github.com/repos/c07822343-cmyk/Openrouter-thing/pulls \
#  -d '{"title":"feat(vm): initial BananaRouter VM scaffold","head":"feature/vm-vm-ui","base":"main","body":"Initial scaffold: VM shell, window manager, AI window, session persistence, server proxy."}'


# Local dev

1. Copy env example: cp .env.example .env
2. npm install
3. npm run dev

# One-line clone + run (dev)

git clone https://github.com/c07822343-cmyk/Openrouter-thing.git && cd Openrouter-thing && cp .env.example .env && npm install && npm run dev
