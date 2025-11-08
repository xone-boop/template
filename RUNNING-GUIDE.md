# 🚀 Cara Jalanin Todo App - Step by Step

## 1️⃣ SETUP PERTAMA KALI (Hanya sekali)

### Clone/Setup Repository
```bash
cd /workspaces/template
npm install
```

### Setup MCP Servers
```bash
./setup-mcp.sh
```

### Setup Project Dependencies
```bash
npm install --prefix projects/todo-app
cd projects/todo-app
npx prisma generate
npx prisma db push
```

---

## 2️⃣ JALANIN BACKEND SERVER

### Opsi A: Run Server Saja (untuk testing API)
```bash
cd projects/todo-app
npm run dev:server
```
✅ Server jalan di: `http://localhost:3001`

### Opsi B: Run Frontend + Backend Bareng
```bash
cd projects/todo-app
npm run dev:all
```
✅ Frontend: `http://localhost:5173`  
✅ Backend: `http://localhost:3001`

### Opsi C: Run Frontend Saja
```bash
cd projects/todo-app
npm run dev
```
✅ Frontend: `http://localhost:5173` (tapi backend harus udah running di port lain)

---

## 3️⃣ TEST SEMUA YANG ADA

### Test API Endpoints (harus server running)
```bash
cd projects/todo-app
node test-mcp-apis.js
```
**Output**: Semua API test results

### Test Playwright MCP (browser automation)
```bash
cd projects/todo-app
node test-playwright-mcp.js
```
**Output**: Browser automation tests, screenshots saved

### Test Memory MCP (context persistence)
```bash
cd projects/todo-app
node test-memory-mcp.js
```
**Output**: Memory persistence tests

### Run SEMUA Tests Sekaligus
```bash
cd projects/todo-app
node run-mcp-tests.js
```
**Output**: Complete test suite results (21 tests)

---

## 4️⃣ TERMINAL MANAGEMENT (PENTING!)

### ✅ CARA YANG BENAR (Separate Terminals)

**Terminal 1: Backend Server**
```bash
cd projects/todo-app
npm run dev:server
# Ini stay running, jangan di-interrupt!
```

**Terminal 2: Testing/Commands**
```bash
cd projects/todo-app
node test-mcp-apis.js
# Atau command lainnya
```

**Terminal 3: Frontend (Optional)**
```bash
cd projects/todo-app
npm run dev
# Frontend dev server
```

### ❌ JANGAN BEGINI
- Jangan run `npm run dev:server` terus langsung run test di terminal yang sama
- Jangan kill server yang lagi running untuk jalanin command lain
- Server harus always running di background

---

## 5️⃣ ENVIRONMENT SETUP

### Cek `.env` File
```bash
cd projects/todo-app
cat .env
```

Harus berisi:
```
DATABASE_URL=file:./prisma/dev.db
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
```

### Copy dari Template jika belum ada
```bash
cp .env.example .env
```

---

## 6️⃣ DATABASE

### Setup Database (pertama kali)
```bash
cd projects/todo-app
npx prisma db push
```

### Reset Database (hapus semua data)
```bash
cd projects/todo-app
rm prisma/dev.db
npx prisma db push
```

### View Database (GUI)
```bash
cd projects/todo-app
npx prisma studio
```
✅ Buka browser: `http://localhost:5555`

---

## 7️⃣ BUILD & PRODUCTION

### Build Frontend untuk Production
```bash
cd projects/todo-app
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
cd projects/todo-app
npm run preview
```

---

## 8️⃣ DEBUGGING & LOGS

### Enable Debug Mode (Backend)
Edit `.env`:
```
DEBUG=true
```

### Check Server Status
```bash
lsof -i :3001
# Lihat apa yang running di port 3001
```

### Kill Process jika error
```bash
pkill -f "node server/index.js"
# Atau
lsof -i :3001 | awk 'NR!=1 {print $2}' | xargs kill -9
```

---

## 9️⃣ QUICK START CHECKLIST

- [ ] Terminal 1: `cd projects/todo-app && npm run dev:server`
- [ ] Terminal 2: `cd projects/todo-app && npm run dev:all` (atau `npm run dev` untuk frontend saja)
- [ ] Buka Frontend: `http://localhost:5173`
- [ ] Test API: Terminal 3 - `node test-mcp-apis.js`
- [ ] Test MCP: Terminal 3 - `node run-mcp-tests.js`

---

## 🆘 TROUBLESHOOTING

### Port 3001 Already in Use
```bash
# Kill existing process
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Atau change port di .env
PORT=3002
```

### Port 5173 Already in Use
```bash
# Frontend akan auto-increment port (5174, 5175, dll)
# Atau specify port
npm run dev -- --port 3000
```

### Dependencies Error
```bash
# Reinstall everything
rm -rf node_modules package-lock.json
npm install
```

### Database Error
```bash
# Reset Prisma
rm prisma/dev.db
npx prisma generate
npx prisma db push
```

### Tests Failing
```bash
# Make sure server running di port 3001
# Check dengan: lsof -i :3001
```

---

## 📋 COMMAND REFERENCE

```bash
# Setup
npm install
npm install --prefix projects/todo-app
npx prisma db push

# Development
npm run dev:server          # Backend saja
npm run dev                 # Frontend saja
npm run dev:all             # Frontend + Backend

# Testing
node test-mcp-apis.js       # API tests
node test-playwright-mcp.js # Browser automation
node test-memory-mcp.js     # Memory persistence
node run-mcp-tests.js       # All tests

# Building
npm run build               # Production build
npm run preview             # Preview production

# Linting
npm run lint                # Check code quality

# Database
npx prisma db push          # Sync database
npx prisma studio          # Open database GUI
```

---

## 🎯 TYPICAL WORKFLOW

### Development Day:
```bash
# Terminal 1: Backend (jalanin dulu!)
cd projects/todo-app
npm run dev:server

# Terminal 2: Frontend (tunggu backend ready)
cd projects/todo-app
npm run dev

# Terminal 3: Testing jika perlu
cd projects/todo-app
node run-mcp-tests.js
```

### Testing:
```bash
# Pastikan server running (Terminal 1)
# Buka Terminal baru
cd projects/todo-app
node test-mcp-apis.js
```

### Production:
```bash
cd projects/todo-app
npm run build
# Deploy `dist/` folder ke hosting
```

---

## ✅ Sekarang Lo Siap!

Pilih opsi:
1. **Jalanin backend saja**: `npm run dev:server`
2. **Jalanin frontend + backend**: `npm run dev:all`
3. **Test API**: `node test-mcp-apis.js`
4. **Test semua MCP**: `node run-mcp-tests.js`

**Ingat**: Selalu buka terminal baru untuk command baru, jangan di terminal yang sama dengan server! 🎯
