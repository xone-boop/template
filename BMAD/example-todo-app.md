# Todo App with Authentication

## Description
A full-stack todo application with user authentication, allowing users to create, read, update, and delete their personal todo items.

## Tech Stack
- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: SQLite (for simplicity)
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **Other Tools**: Prisma ORM, bcrypt for password hashing

## Features

### Core Features
1. User registration and login
2. Create new todo items
3. Mark todos as complete/incomplete
4. Edit todo text
5. Delete todos
6. Filter todos (all/active/completed)
7. User-specific todos (users only see their own)

### Nice-to-Have Features
1. Due dates for todos
2. Categories/tags
3. Search functionality

## Pages/Routes

### Frontend Routes
- `/` - Landing page (redirect to /todos if logged in)
- `/register` - User registration
- `/login` - User login
- `/todos` - Main todo list (protected route)

### API Endpoints
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Security Requirements
- [x] Input validation and sanitization
- [x] SQL injection prevention (using Prisma)
- [x] XSS prevention
- [x] CSRF protection
- [x] Rate limiting on auth endpoints
- [x] Secure password hashing with bcrypt
- [x] Environment variables for JWT secret
- [x] JWT-based authentication
- [x] Protected API routes (require valid token)

## Testing Requirements

### Unit Tests
- Authentication utilities
- Todo CRUD operations
- Input validation functions

### Integration Tests
- Auth endpoints (register, login)
- Todo endpoints (CRUD operations)
- Unauthorized access attempts

### E2E Tests
- Complete user registration flow
- Login and create todo flow
- Edit and delete todo flow
- Filter functionality

### Security Tests
- SQL injection attempts
- XSS payload attempts
- Authentication bypass attempts
- Invalid JWT handling

### Performance Tests
- Page load time < 2s
- API response time < 300ms
- Handle 100 concurrent requests

## Database Schema
```
User Table:
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password (TEXT - hashed)
- created_at (DATETIME)

Todo Table:
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- text (TEXT)
- completed (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)
```

## Environment Variables
```
DATABASE_URL=file:./dev.db
JWT_SECRET=your-secret-key-here
PORT=3000
NODE_ENV=development
```

## Design/UI Notes
- Clean, minimal design
- Mobile-responsive
- Accessible (keyboard navigation, ARIA labels)
- Color scheme: Blue primary, gray secondary
- Loading states for async operations
- Error messages for failed operations

## Deployment Target
Ready for local development and production deployment on Vercel/Netlify (frontend) and Railway/Render (backend).

## Additional Requirements
- Use React hooks (no class components)
- TypeScript for better type safety
- Proper error handling with user-friendly messages
- Loading indicators for all async operations
- Form validation with helpful error messages

## Success Criteria
1. Users can register and login securely
2. Users can perform all CRUD operations on todos
3. All tests pass (unit, integration, E2E, security)
4. No security vulnerabilities found
5. Performance benchmarks met
6. Complete documentation included
7. Production-ready code with no placeholders