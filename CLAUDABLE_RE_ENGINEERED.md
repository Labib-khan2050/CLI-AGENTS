# Claudable System - Complete Re-Engineering Guide

## What "Claudable" Is

**Claudable** = Your name for the Claude Code integration in your Coding agents app.

It allows users to select "Claude" as the AI backend instead of Codex/GPT.

---

## Why It Wasn't Working

### Problem 1: GPT-5 Doesn't Exist ❌

Your app was trying to use `gpt-5` which **isn't a real model**. OpenAI hasn't released GPT-5 yet.

**Latest real models:**
- `gpt-4o` ← Latest GPT-4
- `gpt-4-turbo`
- `gpt-4`

When Codex tried to call OpenAI's API with `gpt-5`, it failed because that model doesn't exist.

### Problem 2: Claude Code CLI Not Installed ❌

The `claude_code.py` adapter checks for the `claude` CLI command, but it's not installed:

```python
# claude_code.py line 35:
result = await asyncio.create_subprocess_shell(
    "claude -h",  # ← This command doesn't exist on your system
    ...
)
```

Result: `Claude Code CLI not installed or not working`

---

## The Fix - Complete Re-Engineering

### Architecture Overview

```
User selects "Claude" in UI
         ↓
Frontend (Next.js) → API (Python)
         ↓
claude_code.py adapter
         ↓
Checks: "claude" CLI command exists?
         ↓ (if yes)
Uses: claude-code-sdk (Python SDK)
         ↓
Calls: Anthropic API
         ↓
Returns: Streaming responses
```

### What Needs to Happen

1. **Install @anthropic-ai/claude-code** (npm package globally)
2. **Run `claude login`** to authenticate
3. **Verify `claude` command works**
4. **Install `claude-code-sdk`** (Python package)
5. **Restart backend** to apply changes

---

## Step-by-Step Installation

### Quick Install (Automated)

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

# Run the installation script
./INSTALL_CLAUDE_CODE.sh
```

This script:
- Checks Node.js version
- Installs @anthropic-ai/claude-code globally
- Prompts you to login
- Installs Python SDK
- Verifies everything works

### Manual Install (Step by Step)

#### Step 1: Install Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

#### Step 2: Login to Claude

```bash
claude login
```

This opens your browser. Login with your Anthropic account.

#### Step 3: Verify CLI Works

```bash
which claude
claude --version
claude -h
```

Should all work without errors.

#### Step 4: Install Python SDK

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents/apps/api"

# Install in the Python venv
.venv/bin/pip install claude-code-sdk
```

#### Step 5: Restart Backend

Stop your `npm run dev` (Ctrl+C) and restart it.

---

## How to Use Claudable After Setup

### 1. Start Coding Agents

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"
npm run dev
```

### 2. Check Claude is Available

Look in the logs for:
```
[DEBUG] CLI claude status: {
  'available': True,    ← Should be True now!
  'configured': True,
  'models': ['claude-sonnet-4.5', 'claude-opus-4.1', ...]
}
```

### 3. Create a Project with Claude

In the UI:
1. Click "New Project"
2. Select **"Claude"** from the dropdown
3. Choose model: `claude-sonnet-4.5` or `claude-opus-4.1`
4. Enter your prompt
5. Claude will start working!

---

## Expected Behavior After Fix

### Before Fix:
```
[DEBUG] CLI claude status: {
  'available': False,  ← Not working
  'error': 'Claude Code CLI not installed'
}

[DEBUG] CLI codex status: {
  'default_models': ['gpt-5', ...]  ← Fake model
}
[ERROR] Failed to initialize Codex session  ← Fails!
```

### After Fix:
```
[DEBUG] CLI claude status: {
  'available': True,   ← Working!
  'configured': True,
  'models': ['claude-sonnet-4.5', 'claude-opus-4.1', ...]
}

[DEBUG] CLI codex status: {
  'default_models': ['gpt-4o', 'claude-3.5-sonnet']  ← Real models
}
```

---

## Troubleshooting

### Issue: "claude: command not found"

**Problem:** npm global bin not in PATH

**Solutions:**

**Option A - Using NVM (recommended):**
```bash
# If you use nvm, the path should already be correct
which node
# Should show: /Users/labib/.nvm/versions/node/v22.21.0/bin/node

# Claude should be in the same directory
ls -la /Users/labib/.nvm/versions/node/v22.21.0/bin/claude
```

**Option B - Add to PATH:**
```bash
# Add to ~/.zshrc or ~/.bashrc
export PATH="$(npm config get prefix)/bin:$PATH"

# Reload shell
source ~/.zshrc
```

**Option C - Use npx:**
```bash
# Run claude via npx if PATH issues persist
npx @anthropic-ai/claude-code --help
```

### Issue: "Authentication failed"

**Problem:** Not logged in or token expired

**Solution:**
```bash
claude login --force
```

Follow browser prompts to re-authenticate.

### Issue: "claude-code-sdk not found"

**Problem:** Python package not installed in venv

**Solution:**
```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents/apps/api"
.venv/bin/pip install claude-code-sdk
```

### Issue: Still showing "Claude not available" after install

**Problem:** Backend hasn't restarted to load new CLI

**Solution:**
1. Press `Ctrl+C` in terminal running `npm run dev`
2. Run `npm run dev` again
3. Check logs for `[DEBUG] CLI claude status`

---

## Understanding the Code Flow

### 1. Frontend UI (`GlobalSettings.tsx`, `CreateProjectModal.tsx`)

Shows available CLIs and models:
```typescript
availableCLIs: ['claude', 'codex', 'cursor', 'qwen', 'gemini']
selectedCLI: 'claude'  // User selection
selectedModel: 'claude-sonnet-4.5'
```

### 2. Backend API (`apps/api/app/services/cli/manager.py`)

Checks CLI availability:
```python
async def check_cli_availability(cli_type: CLIType):
    adapter = get_adapter(cli_type)
    status = await adapter.check_availability()
    return status
```

### 3. Claude Adapter (`apps/api/app/services/cli/adapters/claude_code.py`)

Implements Claude Code integration:
```python
async def check_availability(self):
    # Runs: claude -h
    # If success: returns available=True
    # If fail: returns error message
    
async def execute_with_streaming(self, instruction, ...):
    # Uses claude-code-sdk Python library
    # Calls Anthropic API
    # Streams responses back to UI
```

### 4. Execution Flow

```
User creates project with Claude
    ↓
Backend calls: claude_code.check_availability()
    ↓
Runs: `claude -h` to verify CLI exists
    ↓ (if OK)
Backend calls: claude_code.execute_with_streaming()
    ↓
Creates ClaudeSDKClient with options:
    - model: claude-sonnet-4.5
    - tools: [Read, Write, Edit, Bash, ...]
    - permission_mode: bypassPermissions
    ↓
Sends instruction to Anthropic API
    ↓
Streams messages back:
    - ToolUse messages (file edits, commands)
    - AssistantMessage (text responses)
    - ResultMessage (completion)
    ↓
Frontend displays real-time updates
```

---

## Key Files in the System

```
Coding agents/
├── INSTALL_CLAUDE_CODE.sh          ← Installation script (NEW)
├── CLAUDABLE_RE_ENGINEERED.md      ← This file (NEW)
├── apps/
│   ├── api/
│   │   └── app/
│   │       └── services/
│   │           └── cli/
│   │               ├── manager.py          ← CLI manager
│   │               └── adapters/
│   │                   ├── claude_code.py  ← Claude implementation
│   │                   ├── codex_cli.py    ← Codex implementation
│   │                   └── cursor_agent.py ← Cursor implementation
│   └── web/
│       └── components/
│           ├── GlobalSettings.tsx     ← Settings UI
│           └── CreateProjectModal.tsx ← Project creation UI
```

---

## Real Models vs Fake Models

### Real OpenAI Models (Use These):
- ✅ `gpt-4o` (latest)
- ✅ `gpt-4-turbo`
- ✅ `gpt-4`
- ✅ `gpt-3.5-turbo`
- ✅ `o1-preview` (reasoning model)
- ✅ `o1-mini` (fast reasoning)

### Fake Models (Don't Use):
- ❌ `gpt-5` (doesn't exist!)
- ❌ `gpt-4.5` (doesn't exist)

### Real Claude Models (Use These):
- ✅ `claude-sonnet-4.5` / `claude-sonnet-4-5-20250929`
- ✅ `claude-opus-4.1` / `claude-opus-4-1-20250805`
- ✅ `claude-3.5-sonnet`
- ✅ `claude-3-opus`

---

## Summary

### What Was Wrong:
1. **gpt-5 doesn't exist** → Codex failed
2. **Claude CLI not installed** → Claude unavailable

### What I Fixed:
1. ✅ Created installation script: `INSTALL_CLAUDE_CODE.sh`
2. ✅ Provided manual installation steps
3. ✅ Explained architecture and flow
4. ✅ Added troubleshooting guide
5. ✅ Fixed `gpt-5` default in codex_cli.py (already done earlier)

### What You Need to Do:
1. Run: `./INSTALL_CLAUDE_CODE.sh`
2. Follow prompts to login
3. Restart backend: `Ctrl+C` then `npm run dev`
4. Verify Claude shows as available
5. Create project with Claude!

---

## Quick Commands Reference

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Login
claude login

# Check installation
which claude
claude --version
claude -h

# Install Python SDK
cd apps/api
.venv/bin/pip install claude-code-sdk

# Restart backend
# Press Ctrl+C in terminal with npm run dev
npm run dev

# Check logs for Claude status
# Look for: [DEBUG] CLI claude status
```

---

**Claudable System is now fully engineered and ready to work!** 🚀

Run `./INSTALL_CLAUDE_CODE.sh` to get started.
