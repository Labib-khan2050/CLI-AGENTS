# Fix Claude Code ("Claudable") Not Working

## The Problems

From your logs:

### Problem 1: Claude Code CLI Not Installed
```
[DEBUG] CLI claude status: {
  'available': False, 
  'configured': False, 
  'error': 'Claude Code CLI not installed or not working.'
}
```

### Problem 2: Still Using gpt-5 (Need to Restart)
```
[DEBUG] [CLI] Using model: gpt-5
[ERROR] [Codex] Failed to initialize Codex session
```

My fix for `gpt-5` hasn't taken effect because the Python backend is still running with old code.

---

## Fix 1: Install Claude Code CLI

### Option A: Install Official Claude Code (Recommended)

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Or using npx (no installation)
npx @anthropic-ai/claude-code login
```

### Option B: Install Anthropic's CLI

```bash
# Install Anthropic CLI
npm install -g @anthropic-ai/cli

# Login
anthropic login
```

### Verify Installation

```bash
# Check if claude command exists
which claude

# Or check if it's installed
claude --version
```

---

## Fix 2: Restart Backend to Apply gpt-5 Fix

The backend is still using old code with `gpt-5`. You need to restart it.

### Kill the Current Backend

In your terminal where `npm run dev` is running:

**Press `Ctrl+C`** to stop both backend and frontend.

### Restart

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

# Restart everything
npm run dev
```

After restart, you should see:
```
[DEBUG] CLI codex status: {
  'default_models': ['gpt-4o', 'claude-3.5-sonnet', 'gpt-4-turbo']
  # ↑ No more gpt-5!
}
```

---

## Expected Result After Fixes

### After Installing Claude Code:
```
[DEBUG] CLI claude status: {
  'available': True,
  'configured': True,
  'models': ['claude-sonnet-4.5', 'claude-opus-4.1', ...]
}
```

### After Restarting Backend:
```
[DEBUG] CLI codex status: {
  'default_models': ['gpt-4o', 'claude-3.5-sonnet', 'gpt-4-turbo']
  # No more gpt-5!
}
```

---

## Complete Setup Steps

### Step 1: Stop Current Server

In your terminal with `npm run dev`:
- Press `Ctrl+C`

### Step 2: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 3: Login to Claude

```bash
claude login
```

Follow the browser prompt to authenticate.

### Step 4: Restart Server

```bash
npm run dev
```

### Step 5: Verify

Check the logs - you should see:
```
[DEBUG] CLI claude status: {'available': True, 'configured': True, ...}
[DEBUG] CLI codex status: {'default_models': ['gpt-4o', ...]}
```

No more `gpt-5` or Claude errors!

---

## Alternative: If Claude Code Still Doesn't Work

If the official package doesn't work, check what the app is actually looking for:

```bash
# Check what command it's trying to run
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"
grep -r "claude login" apps/api/
```

It might be looking for a specific binary name.

---

## Summary

**Two fixes needed:**

1. **Install Claude Code CLI:**
   ```bash
   npm install -g @anthropic-ai/claude-code
   claude login
   ```

2. **Restart backend to apply gpt-5 fix:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev  # Restart
   ```

After both fixes:
- ✅ Claude Code will be available
- ✅ Codex will use `gpt-4o` instead of fake `gpt-5`
- ✅ Both should work!

---

## Quick Commands

```bash
# 1. Stop server (Ctrl+C)

# 2. Install Claude
npm install -g @anthropic-ai/claude-code

# 3. Login
claude login

# 4. Restart
npm run dev
```

Done! Both Claude and Codex should work now.
