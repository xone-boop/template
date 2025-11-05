# BMAD - Build, Make, Automate, Deploy

Project briefs and requirements go here.

## How to Use

1. Create a new markdown file for your project: `[project-name].md`
2. Fill in project details (see template below)
3. Add the file to chat with AI
4. AI will automatically develop the complete project

## Project Brief Template

Create a file named `your-project.md` with this structure:

```markdown
# Project Name

## Description
Brief description of what the project does

## Tech Stack
- Frontend: React/Vue/Next.js/etc
- Backend: Node.js/Express/etc
- Database: PostgreSQL/MongoDB/etc
- Other: Authentication, APIs, etc

## Features
1. Feature one
2. Feature two
3. Feature three

## Security Requirements
- Authentication needed
- Data validation requirements
- Rate limiting
- Other security concerns

## Testing Requirements
- Unit tests for business logic
- E2E tests for critical flows
- Security tests for vulnerabilities
- Performance benchmarks

## Additional Notes
Any other important information
```

## What Happens Next

The AI will:
1. Read your brief
2. Plan implementation phases
3. Create project structure in `/projects/[project-name]/`
4. Implement all features
5. Write comprehensive tests
6. Add security measures
7. Create documentation
8. Deliver production-ready code

No placeholder code, no TODOs, complete implementation only.

## Available Tools

The AI has access to:
- MCP Memory: Context persistence
- Playwright: Browser automation & testing
- Chrome DevTools: Debugging & performance
- Puppeteer: Alternative browser automation

All ready for headless operation.