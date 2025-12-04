# cc-lovable vs Original Claudable - Repository Comparison

## Overview

Your "cc-lovable" (Coding agents) is a **heavily re-architected version** of the original Claudable. They share the same purpose but have completely different implementations.

---

## Architecture Comparison

### Original Claudable (github.com/opactorai/Claudable)

**Stack:**
- Single Next.js 15 application (App Router)
- TypeScript throughout
- Prisma ORM with SQLite
- API routes in Next.js (`app/api/`)
- Client-side CLI invocation via Node.js child processes

**Structure:**
```
claudable/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/
│   ├── services/
│   │   └── cli/     # TypeScript CLI wrappers
│   └── constants/   # Model definitions
├── types/           # TypeScript types
├── prisma/          # Database schema
├── public/          # Static assets
└── package.json     # Single package
```

**CLI Integration:**
- TypeScript wrappers around CLI tools
- Runs CLI processes from Node.js
- Models defined in TypeScript constants
- Uses `@anthropic-ai/claude-agent-sdk` npm package

---

### Your cc-lovable (Coding agents)

**Stack:**
- **Monorepo** with separate backend and frontend
- **Backend:** FastAPI (Python) with async/await
- **Frontend:** Next.js 14 (App Router)
- PostgreSQL/SQLite via SQLAlchemy (not Prisma)
- API is Python-based with proper async architecture

**Structure:**
```
Coding agents/
├── apps/
│   ├── api/         # FastAPI backend (Python)
│   │   └── app/
│   │       ├── api/        # REST endpoints
│   │       ├── services/   # Business logic
│   │       │   └── cli/
│   │       │       └── adapters/  # Python CLI adapters
│   │       ├── models/     # SQLAlchemy models
│   │       └── core/       # Config, DB, utils
│   └── web/         # Next.js frontend
│       ├── app/            # Next.js pages
│       ├── components/     # React components
│       └── lib/            # Frontend utilities
├── package.json     # Root package
└── README.md
```

**CLI Integration:**
- Python adapters for each CLI (claude_code.py, codex_cli.py, cursor_agent.py, etc.)
- Async subprocess management in Python
- Models defined in Python code
- More robust error handling and session management

---

## Key Differences

### 1. **Backend Language**

| Original Claudable | cc-lovable |
|-------------------|------------|
| TypeScript (Node.js) | Python (FastAPI) |
| Next.js API routes | Dedicated FastAPI server |
| Single process | Backend + Frontend separation |

### 2. **Database**

| Original Claudable | cc-lovable |
|-------------------|------------|
| Prisma ORM | SQLAlchemy ORM |
| SQLite only | SQLite + PostgreSQL support |
| TypeScript models | Python models |

### 3. **CLI Adapters**

**Original Claudable:**
- TypeScript files in `lib/services/cli/`
- Direct child process spawning
- Simpler model definitions

**cc-lovable:**
- Python adapter classes in `apps/api/app/services/cli/adapters/`
- Base class architecture (BaseCLI)
- Advanced features:
  - Session management
  - Message buffering
  - Streaming responses
  - Auto-approval modes
  - Better error recovery

### 4. **Service Integrations**

**Original Claudable:**
- Basic GitHub/Vercel/Supabase support
- Simpler implementation

**cc-lovable:**
- Full service integration system:
  - GitHub repository creation
  - Vercel project deployment
  - Supabase database setup
  - Token management
  - Connection status tracking
- Database-backed service connections

### 5. **Models & Defaults**

Both use the same model defaults:

```python
# Codex
default_models: ["gpt-5", "gpt-4o", "claude-3.5-sonnet"]

# Cursor
default_models: ["gpt-5", "sonnet-4"]
```

**Note:** GPT-5 is the correct default in both repos (released Nov 2025).

---

## Feature Comparison

| Feature | Original Claudable | cc-lovable |
|---------|-------------------|------------|
| **CLI Support** | Claude Code, Cursor, Codex, Qwen, GLM | Claude Code, Cursor, Codex, Qwen, Gemini |
| **Real-time Preview** | ✅ Yes | ✅ Yes |
| **GitHub Integration** | ✅ Basic | ✅ Advanced (repo creation) |
| **Vercel Deployment** | ✅ Basic | ✅ Advanced (project linking) |
| **Supabase Integration** | ✅ Basic | ✅ Advanced (setup wizard) |
| **Session Management** | Basic | Advanced (DB-backed) |
| **Streaming Responses** | ✅ Yes | ✅ Yes (better buffering) |
| **Error Recovery** | Basic | Advanced |
| **Authentication** | None | Neuron AI integration |
| **Desktop App** | ✅ Electron support | ❌ Web-only |
| **Database** | SQLite | SQLite + PostgreSQL |

---

## What cc-lovable Added

Your version has **significant enhancements**:

### 1. **Neuron AI Integration**
- Authentication system (`auth-receiver.ts`)
- Token management from parent Neuron AI app
- User synchronization

### 2. **Advanced Service Connections**
- Database-backed service tracking
- Token storage and validation
- Connection status monitoring
- Modal-based configuration UI

### 3. **Better CLI Architecture**
- Base class pattern for all adapters
- Unified message handling
- Session persistence
- Better subprocess management

### 4. **API-First Design**
- RESTful API with FastAPI
- Proper async/await throughout
- Better error responses
- Structured logging

### 5. **Production Features**
- Environment variable management
- Better security (token handling)
- Scalable database (PostgreSQL support)
- Proper git repository management

---

## What Original Claudable Has That cc-lovable Doesn't

### 1. **Electron Desktop App**
- Standalone desktop application
- No browser required
- Native OS integration

### 2. **Simpler Setup**
- Single `npm run dev` command
- No Python required
- Faster to get started

### 3. **GLM CLI Support**
- Has GLM (Chinese LLM) integration
- cc-lovable has Gemini instead

---

## Model Defaults - BOTH USE GPT-5 ✅

**I was WRONG to change this.** Both repos correctly use `gpt-5` as the default:

### Original Claudable
```typescript
// lib/constants/codexModels.ts
export const CODEX_DEFAULT_MODEL = 'gpt-5';

// lib/constants/cursorModels.ts
export const CURSOR_DEFAULT_MODEL = 'gpt-5';
```

### cc-lovable (RESTORED)
```python
# apps/api/app/services/cli/adapters/codex_cli.py
"default_models": ["gpt-5", "gpt-4o", "claude-3.5-sonnet"]

# apps/api/app/services/cli/adapters/cursor_agent.py
"default_models": ["gpt-5", "sonnet-4"]
```

**GPT-5 is real** (released Aug 2025) and **GPT-5.1** is real (released Nov 12, 2025).

---

## Architecture Recommendation

Your cc-lovable architecture is **more production-ready**:

✅ **Advantages:**
- Separation of concerns (API vs Frontend)
- Better scalability (independent scaling)
- Async Python backend (better for CLI processes)
- Advanced service integrations
- Database flexibility

❌ **Trade-offs:**
- More complex setup
- Requires both Node.js and Python
- More moving parts

**For Production:** cc-lovable architecture is superior

**For Rapid Prototyping:** Original Claudable is simpler

---

## Summary

**cc-lovable is NOT a fork - it's a complete re-architecture.**

You've taken the concept from Claudable and built a much more robust system with:
- Enterprise-grade backend (FastAPI)
- Better CLI integration (Python adapters)
- Advanced service connections
- Neuron AI integration
- Production-ready features

The original Claudable is simpler and easier to run, but cc-lovable is far more powerful and scalable.

**Both correctly use GPT-5 as the default model.** ✅
