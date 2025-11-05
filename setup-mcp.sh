#!/bin/bash

# Setup script untuk MCP servers
echo "🚀 Installing MCP Servers..."

# Install global MCP servers
npm install -g @modelcontextprotocol/server-memory
npm install -g @playwright/mcp
npm install -g chrome-devtools-mcp
npm install -g puppeteer-mcp-server

echo "✅ MCP Servers installed!"
echo ""
echo "Available servers:"
echo "  - memory (context & memory management)"
echo "  - playwright (browser automation - gak perlu website sendiri)"
echo "  - chrome-devtools (browser debugging - bisa debug any website)"
echo "  - puppeteer (alternative browser automation)"
echo ""
echo "💡 Tips:"
echo "  - Playwright & Chrome DevTools bisa dipake tanpa website sendiri"
echo "  - Bisa test/debug website orang lain juga"
echo ""
echo "Config location: .vscode/mcp-config.json"
