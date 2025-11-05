---
applyTo: '**/BMAD/**'
---

# Project Workflow Instructions

## Overview
This workflow system is designed for rapid project development with full AI assistance. When a project brief is provided via markdown file in BMAD folder, follow this complete workflow.

## Available MCP Servers
The following MCP servers are configured and ready to use:
- **memory**: Context and memory management across sessions
- **playwright**: Browser automation, E2E testing, web scraping
- **chrome-devtools**: Browser debugging and performance analysis
- **puppeteer**: Alternative browser automation tool

All servers run in headless mode, no GUI required.

## Project Structure Convention
```
template/
├── projects/
│   └── [project-name]/     ← Each project gets its own folder
│       ├── src/
│       ├── tests/
│       ├── .env.example
│       ├── README.md
│       └── package.json
└── BMAD/
    └── [project-name].md   ← Project brief/requirements
```

## Workflow Steps

### 1. Read Project Brief
- Project brief is in `/workspaces/template/BMAD/[project-name].md`
- Extract: requirements, tech stack, features, security needs
- Store context using MCP memory server for persistence

### 2. Analyze & Plan
Break down into phases:
- **Phase 1**: Project structure & dependencies
- **Phase 2**: Core functionality implementation
- **Phase 3**: Testing suite (unit, integration, E2E)
- **Phase 4**: Security hardening
- **Phase 5**: Performance optimization

Create implementation plan and share with user for approval.

### 3. Setup Project Structure
```bash
cd projects
mkdir [project-name]
cd [project-name]

# Initialize based on tech stack
# Examples:
npm init vite@latest .           # React/Vue
npx nuxi init .                  # Nuxt
npx create-next-app@latest .     # Next.js
npm init -y                      # Node.js/Express
```

Create standard folders:
- `src/` or `app/` - Source code
- `tests/` - All test files
- `public/` - Static assets (if frontend)
- `.env.example` - Environment variables template

### 4. Implementation
Implement features phase by phase:
- Write production-ready code (no placeholders)
- Follow documentation best practices for chosen stack
- Implement error handling from the start
- Use TypeScript when applicable
- Create modular, testable components

Save all files to: `/workspaces/template/projects/[project-name]/`

### 5. Testing Strategy

#### Unit Tests
- Test individual functions/components
- Use appropriate framework: Jest, Vitest, Mocha
- Location: `tests/unit/`

#### Integration Tests
- Test API endpoints
- Test component interactions
- Location: `tests/integration/`

#### E2E Tests with Playwright
```javascript
// tests/e2e/main.spec.js
import { test, expect } from '@playwright/test';

test('critical user flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Test interactions
});
```

#### Security Testing
Use available tools:
- Input validation tests
- SQL injection prevention tests
- XSS prevention tests
- CSRF token validation
- Authentication/authorization tests

Create: `tests/security/` folder

### 6. Security Hardening Checklist

#### Input Validation
- Sanitize all user inputs
- Validate data types and formats
- Implement rate limiting

#### Authentication & Authorization
- Use secure session management
- Implement JWT properly (if used)
- Hash passwords with bcrypt
- Add role-based access control

#### Security Headers
```javascript
// Express example
helmet({
  contentSecurityPolicy: true,
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true
})
```

#### Environment Variables
- Never commit secrets
- Use .env files
- Create .env.example template

#### Dependencies
- Run `npm audit`
- Fix vulnerabilities
- Keep dependencies updated

### 7. Penetration Testing Setup

Create automated security tests:

```javascript
// tests/security/penetration.spec.js

// SQL Injection Test
test('prevents SQL injection', async () => {
  const maliciousInput = "' OR '1'='1";
  const response = await request.post('/api/login')
    .send({ username: maliciousInput });
  expect(response.status).toBe(400);
});

// XSS Test
test('prevents XSS attacks', async () => {
  const xssPayload = '<script>alert("XSS")</script>';
  const response = await request.post('/api/comment')
    .send({ text: xssPayload });
  expect(response.body.text).not.toContain('<script>');
});

// CSRF Test
test('requires CSRF token', async () => {
  const response = await request.post('/api/action')
    .send({ data: 'test' });
  expect(response.status).toBe(403);
});
```

### 8. Performance Testing

Use Playwright for performance:
```javascript
// tests/performance/load.spec.js
test('page loads within 2 seconds', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('http://localhost:3000');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(2000);
});
```

### 9. Documentation

Create comprehensive README:
```markdown
# Project Name

## Setup
npm install
cp .env.example .env

## Development
npm run dev

## Testing
npm test                    # All tests
npm run test:unit          # Unit tests
npm run test:e2e           # E2E tests
npm run test:security      # Security tests

## Security
See SECURITY.md for security considerations

## Deployment
[Deployment instructions]
```

### 10. Debugging Support

Use Chrome DevTools MCP for:
- Performance profiling
- Network analysis
- Memory leak detection
- Console debugging

Example debugging session:
```javascript
// Enable debugging
const debugMode = process.env.DEBUG === 'true';
if (debugMode) {
  console.log('Debug info:', { context, data });
}
```

## Progress Communication

### When Starting
"Starting [Project Name] development. Breakdown:
- Phase 1: Structure (5 min)
- Phase 2: Core features (X min)
- Phase 3: Testing (X min)
- Phase 4: Security (X min)
Beginning Phase 1..."

### During Implementation
Report completion of each phase:
"✓ Phase 1 complete: Project structure created at projects/[name]
→ Starting Phase 2: Core implementation..."

### On Completion
"✓ All phases complete!
Location: /workspaces/template/projects/[project-name]/
Ready to run: cd projects/[project-name] && npm install && npm run dev
Tests available: npm test"

## Context Management

Use MCP Memory server to maintain context:
- Store project requirements
- Track implementation decisions
- Remember user preferences
- Maintain consistency across sessions

## Error Handling

If errors occur:
1. Read full error message
2. Check documentation
3. Verify file paths
4. Provide clear fix
5. Continue workflow

## Breaking Down Large Projects

If project is large (>30 min estimated):
1. Present breakdown to user
2. Ask which phase to start with
3. Allow user to request specific features first
4. Maintain context between phases

Example:
"This project is large. Suggested phases:
1. Authentication system (15 min)
2. Dashboard UI (20 min)
3. API integration (15 min)
4. Testing suite (10 min)

Which phase should I start with, or proceed with all?"

## Terminal Management

- Keep dev server in Terminal 1
- Run tests in Terminal 2
- Build commands in Terminal 3
- Never kill active dev server

## Quality Checks

Before marking complete:
- [ ] All files in correct location
- [ ] Dependencies installed
- [ ] Tests written and passing
- [ ] Security measures implemented
- [ ] Documentation complete
- [ ] .env.example created
- [ ] No TODO or placeholder code
- [ ] TypeScript types complete (if applicable)

## Stack-Specific Notes

### Frontend (React/Vue/Nuxt)
- Use Vite or framework tooling
- Implement error boundaries
- Add loading states
- Optimize images
- Code splitting

### Backend (Node/Express)
- Input validation middleware
- Error handling middleware
- Rate limiting
- CORS configuration
- API documentation

### Fullstack (Next.js)
- API routes in app/api or pages/api
- Server/client component separation
- Environment variables handling
- Image optimization

## Final Deliverables

Each project must include:
1. Complete source code
2. Test suite (unit, integration, E2E, security)
3. README with setup instructions
4. .env.example
5. package.json with all scripts
6. Security documentation
7. Performance benchmarks (if applicable)

All files saved to: `/workspaces/template/projects/[project-name]/`

---

Remember: Provide production-ready, fully functional code. No placeholders, no TODOs, complete implementation only.