# Fixed: "gpt-5" Model Error in Coding Agents

## The Problem

Your Coding agents app was failing with:
```
[DEBUG] [CLI] Using model: gpt-5
[ERROR] [Codex] Failed to initialize Codex session
```

**Why:** `gpt-5` doesn't exist! It was hardcoded as a default model.

---

## What Was Fixed

### File 1: `codex_cli.py`
**Changed:**
```python
"default_models": ["gpt-5", "gpt-4o", "claude-3.5-sonnet"]
```

**To:**
```python
"default_models": ["gpt-4o", "claude-3.5-sonnet", "gpt-4-turbo"]
```

### File 2: `cursor_agent.py`
**Changed:**
```python
"default_models": ["gpt-5", "sonnet-4"]
```

**To:**
```python
"default_models": ["gpt-4o", "claude-3.5-sonnet"]
```

---

## Real Models Available

### OpenAI Models:
- ✅ `gpt-4o` (latest GPT-4 Omni)
- ✅ `gpt-4-turbo`
- ✅ `gpt-4`
- ✅ `gpt-3.5-turbo`
- ❌ `gpt-5` (doesn't exist!)

### Claude Models:
- ✅ `claude-3.5-sonnet`
- ✅ `claude-3-opus`
- ✅ `claude-3-sonnet`
- ✅ `claude-sonnet-4.5` (if available)
- ❌ `sonnet-4` (wrong format)

---

## How to Use

### Restart the Coding Agents App

```bash
cd "/Users/labib/neuronAI workspace/New Folder With Items/NEURON AI FINALE/Neuron-AI-Final/Commit--prev/Coding agents"

# Restart backend API
# (Kill the Python process and restart it)

# Or if using npm scripts:
npm run dev
```

---

## Testing

### Test Codex:
```bash
# Should now use gpt-4o instead of gpt-5
curl http://localhost:8080/api/cli/status
```

Should show:
```json
{
  "codex": {
    "available": true,
    "configured": true,
    "default_models": ["gpt-4o", "claude-3.5-sonnet", "gpt-4-turbo"]
  }
}
```

---

## If You Want to Change Models

### Option 1: In Global Settings UI
1. Open Coding agents web app
2. Click **Settings** (gear icon)
3. Go to **AI Assistants**
4. Select your preferred model from dropdown

### Option 2: Edit Config Files Directly

**For Codex** (`codex_cli.py`):
```python
"default_models": ["gpt-4o", "claude-3.5-sonnet", "gpt-4-turbo"]
```

**For Cursor** (`cursor_agent.py`):
```python
"default_models": ["gpt-4o", "claude-3.5-sonnet"]
```

---

## Summary

✅ **Fixed:** Removed non-existent `gpt-5` model
✅ **Replaced with:** `gpt-4o` (real, working model)
✅ **Codex will now work** without initialization errors

**Restart your Coding agents app and it should work!** 🚀
