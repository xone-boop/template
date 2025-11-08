# 🎯 WORKFLOW VISUAL GUIDE

## FIRST TIME SETUP
```
┌─────────────────────────────────────┐
│ cd /workspaces/template             │
│ bash quick-start.sh                 │
│ (Setup everything automatically!)   │
└─────────────────────────────────────┘
                    ↓
      ✅ Ready to run the app!
```

---

## DAILY DEVELOPMENT WORKFLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT DAY                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐  ┌─────────────────┐
│   TERMINAL 1             │  │   TERMINAL 2             │  │  TERMINAL 3     │
│   (BACKEND SERVER)       │  │   (FRONTEND)             │  │  (TESTING)      │
├──────────────────────────┤  ├──────────────────────────┤  ├─────────────────┤
│ cd projects/todo-app     │  │ cd projects/todo-app     │  │ cd projects/    │
│ npm run dev:server       │  │ npm run dev              │  │ todo-app        │
├──────────────────────────┤  ├──────────────────────────┤  ├─────────────────┤
│ ✅ Running on :3001      │  │ ✅ Running on :5173      │  │ node test-mcp-  │
│                          │  │                          │  │ apis.js         │
│ KEEP RUNNING!            │  │ [CTRL+C to stop]        │  │ (or other tests)│
│ (Don't interrupt!)       │  │                          │  │                 │
└──────────────────────────┘  └──────────────────────────┘  └─────────────────┘
        ↑                              ↑                              ↑
    ALWAYS FIRST                   Can pause/restart            Run separately
    Stay running!                   anytime safely              each time
```

---

## API FLOW

```
┌──────────────┐
│   Frontend   │ (React @ :5173)
│  localhost   │
└──────┬───────┘
       │ HTTP Requests
       ↓
┌──────────────────────┐
│  Express Backend     │ (Node @ :3001)
│  /api/auth/* 🔐      │
│  /api/todos/* ✅     │
│  Rate Limiting ⏱️    │
│  Helmet Security 🛡️  │
└──────┬───────────────┘
       │ Database Query
       ↓
┌──────────────────────┐
│  Prisma ORM          │
│  ↓                   │
│  SQLite Database     │
│  (dev.db)            │
└──────────────────────┘
```

---

## TEST FLOW

```
┌────────────────────────────────────────────────────────┐
│   run-mcp-tests.js (Test Suite Runner)                │
└────────────────────────────────────────────────────────┘
              ↙           ↓          ↖
         
    ┌───────────────┐ ┌────────────────┐ ┌──────────────┐
    │  API Tests    │ │ Playwright MCP │ │ Memory MCP   │
    │               │ │                │ │              │
    │ 7 tests       │ │ 8 tests        │ │ 5 tests      │
    │ ✅ All Pass   │ │ ✅ All Pass    │ │ ✅ All Pass  │
    └───────────────┘ └────────────────┘ └──────────────┘
              ↓
    ┌────────────────────────┐
    │ Test Summary Report    │
    │ 21 Tests Total ✅      │
    │ 0 Failed               │
    └────────────────────────┘
```

---

## PORT MAPPING

```
┌──────────────────────────────────────┐
│         LOCALHOST PORTS              │
├──────────────────────────────────────┤
│ :3001  → Backend API Server          │
│         http://localhost:3001/api/*  │
│                                      │
│ :5173  → Frontend Dev Server         │
│         http://localhost:5173        │
│                                      │
│ :5555  → Prisma Studio (optional)    │
│         npx prisma studio            │
└──────────────────────────────────────┘
```

---

## QUICK COMMANDS CHEATSHEET

```
┌────────────────────────────────────────────────────────┐
│                QUICK REFERENCE                         │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🚀 START                                             │
│  npm run dev:server    → Backend only                 │
│  npm run dev           → Frontend only                │
│  npm run dev:all       → Frontend + Backend           │
│                                                        │
│  🧪 TEST                                              │
│  node test-mcp-apis.js         → API tests            │
│  node test-playwright-mcp.js    → Browser tests       │
│  node test-memory-mcp.js        → Memory tests        │
│  node run-mcp-tests.js          → All tests           │
│                                                        │
│  🛠️ SETUP                                              │
│  bash quick-start.sh            → Auto setup          │
│  npm install                    → Install deps        │
│  npx prisma db push             → Setup DB            │
│  npx prisma studio              → View DB (GUI)       │
│                                                        │
│  🔧 UTIL                                              │
│  npm run build                  → Production build    │
│  npm run lint                   → Code quality check  │
│  pkill -f "node server"         → Kill server         │
│  lsof -i :3001                  → Check port usage    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## TROUBLESHOOTING FLOW

```
Problem: Server won't start
    ↓
Check: Is port 3001 already in use?
    ├─ YES → Kill process: pkill -f "node server"
    └─ NO  → Check: Did you npm install?
                ├─ NO → npm install --prefix projects/todo-app
                └─ YES → Check: Is .env file correct?
                    ├─ NO → cp .env.example .env
                    └─ YES → Check: Is database ready?
                        ├─ NO → npx prisma db push
                        └─ YES → Restart terminal

Problem: Tests failing
    ↓
Check: Is backend server running on :3001?
    ├─ NO  → Start it first: npm run dev:server
    ├─ YES → Did you wait 2 seconds?
    └─ YES → Run tests again: node test-mcp-apis.js
```

---

## SUCCESS INDICATORS ✅

```
Terminal 1 (Backend):
  "Server running on http://localhost:3001" ✅

Terminal 2 (Frontend):
  "Local:        http://localhost:5173/" ✅

Terminal 3 (Testing):
  "✅ All MCP server tests passed!" ✅
```

---

## FILE LOCATIONS

```
Project Root:
/workspaces/template/

├── projects/todo-app/          ← Main project
│   ├── server/                 ← Backend code
│   │   ├── index.js            ← Express app
│   │   ├── routes/             ← API endpoints
│   │   └── middleware/         ← Auth middleware
│   ├── src/                    ← Frontend code
│   ├── prisma/
│   │   ├── schema.prisma       ← DB schema
│   │   └── dev.db              ← SQLite database
│   ├── tests/                  ← Test files
│   ├── .env                    ← Environment (create from .env.example)
│   └── package.json
│
├── RUNNING-GUIDE.md            ← You are here!
├── BUILD-SUMMARY.md            ← Project summary
├── quick-start.sh              ← Auto setup script
└── README.md
```

---

## 🎯 NEXT STEPS

1. **First Time?** → Run: `bash quick-start.sh`
2. **Daily Work?** → Open 3 terminals with commands above
3. **Need Help?** → Read: `RUNNING-GUIDE.md`
4. **See Status?** → Read: `BUILD-SUMMARY.md`
