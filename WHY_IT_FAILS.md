# Why Codex Initialization Fails

## The Problem

When you try to create a project, you see:
```
[ERROR] [Codex] Failed to initialize Codex session
```

But no details about WHY it failed.

---

## Root Causes

### 1. **Multiple Instances Running** ✅ FIXED
**Problem:** You had 3 different instances of the app running simultaneously:
- API on ports 8080, 8081, 8082
- Frontend on ports 3000, 3001, 3002, 3003
- Preview servers on 3100, 3101

**Why it happens:** Running `npm run dev` multiple times without killing previous instances.

**Fix:** I created `START_FRESH.sh` to kill all instances first.

### 2. **Codex Session Initialization Timeout**
**Problem:** The code waits for Codex to output `session_configured` message, but:
- Codex might be slow to initialize (API call to OpenAI)
- Codex might be outputting errors to stderr (not being captured)
- Network issues or API rate limits

**Why it happens:** 
```python
# Waiting for this message:
if event.get("msg", {}).get("type") == "session_configured":
    # Session ready!
```

But if Codex never sends this message (or sends it in a different format), the code times out after 100 lines.

**Fix:** I added:
- stderr error capture
- Debug logging of Codex output
- Better error messages to UI

---

## How to Debug

### Test 1: Check if Codex works manually

```bash
cd /tmp
mkdir test-codex
cd test-codex

# Try to run codex
codex proto -c "sandbox_mode=danger-full-access"
```

**Expected:** You should see JSON output starting with `{"msg":{"type":"session_configured",...}}`

**If you see an error:**
- Check: `echo $OPENAI_API_KEY` (should start with `sk-proj-...`)
- Check: `codex --version` (should show `0.57.0`)
- Check: Are you rate-limited? Try on OpenAI dashboard

### Test 2: Check API key permissions

Go to: https://platform.openai.com/api-keys

Make sure your API key:
- ✅ Has access to GPT-5 models
- ✅ Not expired
- ✅ Has sufficient credits
- ✅ Not rate-limited

### Test 3: Try with a different model

Instead of `gpt-5`, try `gpt-4o`:
1. Open http://localhost:3000
2. Create project
3. Select "Codex" + **"gpt-4o"** (not gpt-5)
4. See if it works

---

## Quick Fixes

### Fix 1: Use START_FRESH.sh

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

./START_FRESH.sh
```

This kills all old instances and starts fresh.

### Fix 2: Check Codex CLI Config

```bash
# See if there's a codex config file
cat ~/.config/codex/config.json 2>/dev/null

# Or check for any .codex files
ls -la ~ | grep codex
```

### Fix 3: Clear Old Sessions

```bash
# Clear any stuck codex sessions
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

# Remove old project data (CAREFUL - this deletes projects!)
rm -rf data/projects/*

# Or just remove failed projects
rm -rf data/projects/project-*
```

---

## What I Fixed in the Code

### Before (codex_cli.py):
```python
if not session_ready:
    ui.error("Failed to initialize Codex session", "Codex")
    return  # Silent failure - no error shown to user!
```

### After:
```python
if not session_ready:
    error_msg = "Failed to initialize Codex session"
    if stderr_lines:
        error_msg += f"\nStderr: {' '.join(stderr_lines)}"
    ui.error(error_msg, "Codex")
    
    # NOW shows error in UI!
    yield Message(
        role="assistant",
        message_type="error",
        content=f"❌ Codex failed to start.\n\n{error_msg}\n\nTry: Check OpenAI API key",
        ...
    )
    return
```

Now you'll see the actual error in the chat!

---

## Most Likely Cause

**My guess:** Codex CLI is trying to call OpenAI's API but either:
1. GPT-5 model access is restricted (try `gpt-4o` instead)
2. API key doesn't have GPT-5 permission yet
3. Rate limited on OpenAI API
4. Network issue connecting to OpenAI

---

## Test This NOW

Run this in terminal:

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

# Kill everything
./START_FRESH.sh
```

Wait for it to start, then try creating a project with **gpt-4o** instead of gpt-5.

If gpt-4o works but gpt-5 doesn't → Your API key doesn't have GPT-5 access yet!
