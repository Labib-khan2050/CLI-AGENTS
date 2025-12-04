#!/bin/bash

# Complete Claude Code Installation Script for Claudable
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Installing Claude Code for Claudable System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Node.js version
echo "1️⃣  Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null || echo "not installed")

if [ "$NODE_VERSION" == "not installed" ]; then
    echo "❌ Node.js not found!"
    echo "   Install Node.js first: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if version is >= 18
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "⚠️  Warning: Claude Code requires Node.js 18+, you have $NODE_VERSION"
    echo "   It may not work correctly"
fi

echo ""

# Install Claude Code globally
echo "2️⃣  Installing @anthropic-ai/claude-code globally..."
npm install -g @anthropic-ai/claude-code

echo ""

# Verify installation
echo "3️⃣  Verifying installation..."
if command -v claude &> /dev/null; then
    CLAUDE_VERSION=$(claude --version 2>&1 || echo "unknown")
    echo "✅ Claude Code installed: $CLAUDE_VERSION"
    CLAUDE_PATH=$(which claude)
    echo "   Location: $CLAUDE_PATH"
else
    echo "❌ Claude command not found in PATH"
    echo "   Trying to locate it..."
    
    # Try common npm global locations
    if [ -f "$HOME/.nvm/versions/node/*/bin/claude" ]; then
        echo "   Found in NVM directory"
        CLAUDE_PATH=$(find $HOME/.nvm/versions/node/*/bin -name claude | head -1)
        echo "   Location: $CLAUDE_PATH"
    elif [ -f "/usr/local/bin/claude" ]; then
        echo "   Found in /usr/local/bin"
        CLAUDE_PATH="/usr/local/bin/claude"
    else
        echo "   Not found in common locations"
        echo "   You may need to add npm global bin to your PATH"
        exit 1
    fi
fi

echo ""

# Login to Claude
echo "4️⃣  Configuring Claude authentication..."
echo ""
echo "⚠️  IMPORTANT: You need to login to Claude now!"
echo ""
echo "Running: claude login"
echo ""
echo "This will open your browser for authentication."
echo "Press Enter to continue..."
read

claude login

echo ""

# Test Claude CLI
echo "5️⃣  Testing Claude CLI..."
if claude -h &> /dev/null; then
    echo "✅ Claude CLI is working!"
else
    echo "⚠️  Claude CLI test had issues, but may still work"
fi

echo ""

# Install Python SDK if needed
echo "6️⃣  Checking Python SDK..."
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents/apps/api"

if [ -d ".venv" ]; then
    echo "✅ Found Python virtual environment"
    
    # Check if claude-code-sdk is installed
    if .venv/bin/pip show claude-code-sdk &> /dev/null; then
        echo "✅ claude-code-sdk already installed"
    else
        echo "📦 Installing claude-code-sdk..."
        .venv/bin/pip install claude-code-sdk
        echo "✅ claude-code-sdk installed"
    fi
else
    echo "⚠️  No Python venv found, skipping SDK install"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CLAUDE CODE INSTALLATION COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Restart your Coding agents backend (Ctrl+C and npm run dev)"
echo "2. Claude should now appear as available in the UI"
echo "3. Select 'Claude' when creating a new project"
echo ""
echo "Troubleshooting:"
echo "- Run: claude --version"
echo "- Run: which claude"
echo "- Check: npm list -g @anthropic-ai/claude-code"
echo ""
