# Development Workspace

AI-powered development workspace with automated project creation, testing, and security hardening.

## Structure

```
template/
├── BMAD/              # Project briefs (Build, Make, Automate, Deploy)
├── projects/          # Generated projects
├── shared/            # Shared code
├── .github/
│   └── instructions/  # AI workflow instructions
└── .vscode/           # MCP server configuration
```

## MCP Servers Available

- **memory** - Context & memory management across sessions
- **playwright** - Browser automation & E2E testing
- **chrome-devtools** - Browser debugging & performance analysis
- **puppeteer** - Alternative browser automation

All servers run headless, no GUI required.

## Quick Start

### 1. Setup MCP Servers
```bash
./setup-mcp.sh
```

### 2. Create Project Brief
```bash
cd BMAD
cp _template.md my-project.md
# Edit my-project.md with your requirements
```

### 3. Build with AI
Add `BMAD/my-project.md` to chat with AI. The AI will:
- Read requirements
- Plan implementation
- Create project structure
- Implement all features
- Write comprehensive tests
- Add security measures
- Generate documentation

All code saved to: `projects/my-project/`

## Workflow Features

### Automatic Implementation
- Production-ready code (no placeholders)
- Complete test suites (unit, integration, E2E)
- Security hardening (input validation, XSS/SQL injection prevention)
- Performance optimization
- Full documentation

### Testing Coverage
- Unit tests for business logic
- Integration tests for APIs
- E2E tests with Playwright
- Security penetration tests
- Performance benchmarks

### Security Testing
- SQL injection prevention
- XSS attack prevention
- CSRF protection validation
- Authentication bypass testing
- Rate limiting verification

## Example Projects

See `BMAD/example-todo-app.md` for a complete project brief example.

## Manual Project Creation

```bash
cd projects
mkdir my-project
cd my-project

# Choose your stack
npm init vite@latest .           # React/Vue
npx nuxi init .                  # Nuxt
npx create-next-app@latest .     # Next.js
```

## Documentation

- `BMAD/README.md` - Project brief guide
- `BMAD/_template.md` - Project brief template
- `.github/instructions/aturan.instructions.md` - Code style rules
- `.github/instructions/workflow.instructions.md` - AI workflow guide
