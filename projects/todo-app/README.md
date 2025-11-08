# Todo App with Authentication

A full-stack todo application with user authentication, built with modern web technologies. Users can register, login, and manage their personal todo items with full CRUD operations.

## Features

- **User Authentication**
  - User registration with email validation
  - Secure login with JWT tokens
  - Password hashing with bcrypt
  - Protected routes

- **Todo Management**
  - Create new todo items
  - Mark todos as complete/incomplete
  - Edit todo text
  - Delete todos
  - Filter todos (all/active/completed)
  - User-specific todos (users only see their own)

- **Security**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Input validation and sanitization
  - SQL injection prevention (Prisma ORM)
  - XSS prevention
  - CSRF protection
  - Rate limiting on auth endpoints
  - Secure HTTP headers (Helmet.js)

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- Tailwind CSS for styling
- Mobile-responsive design

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- SQLite database
- JWT for authentication
- bcrypt for password hashing

### Testing
- Vitest for unit and integration tests
- Playwright for E2E tests
- Security testing suite
- Performance testing

## Project Structure

```
todo-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript types
│   └── package.json
├── server/                # Backend Express application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── tests/
│       ├── unit/          # Unit tests
│       ├── integration/   # Integration tests
│       ├── e2e/           # End-to-end tests
│       ├── security/      # Security tests
│       └── performance/   # Performance tests
├── prisma/                # Database schema and migrations
└── package.json           # Root package.json
```

## Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
cd projects/todo-app
```

2. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your JWT secret:
```env
DATABASE_URL="file:./server/dev.db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
NODE_ENV=development
```

4. Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Development

### Running the Application

Start both backend and frontend servers:

**Backend (Terminal 1):**
```bash
npm run dev:server
```
Server will start on http://localhost:3000

**Frontend (Terminal 2):**
```bash
npm run dev:client
```
Frontend will start on http://localhost:5173

### Database Management

View database in Prisma Studio:
```bash
npm run prisma:studio
```

Create a new migration:
```bash
npm run prisma:migrate
```

## Testing

### Run All Tests
```bash
npm test
```

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

### Security Tests
```bash
npm run test:security
```

### Watch Mode
```bash
npm run test:watch
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
  - Body: `{ email: string, password: string }`
  - Returns: `{ token: string, user: User }`

- `POST /api/auth/login` - Login user
  - Body: `{ email: string, password: string }`
  - Returns: `{ token: string, user: User }`

### Todos (Requires Authentication)
- `GET /api/todos` - Get user's todos
  - Query: `?filter=all|active|completed`
  - Headers: `Authorization: Bearer <token>`

- `POST /api/todos` - Create new todo
  - Body: `{ text: string }`
  - Headers: `Authorization: Bearer <token>`

- `PATCH /api/todos/:id` - Update todo
  - Body: `{ text?: string, completed?: boolean }`
  - Headers: `Authorization: Bearer <token>`

- `DELETE /api/todos/:id` - Delete todo
  - Headers: `Authorization: Bearer <token>`

## Security Considerations

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 7 days
- Rate limiting: 5 requests per 15 minutes on auth endpoints
- Input validation on all endpoints
- SQL injection prevention through Prisma ORM
- XSS prevention through input sanitization
- Secure HTTP headers via Helmet.js
- CORS enabled for frontend origin only

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Performance Benchmarks

- Page load time: < 2 seconds
- API response time: < 300ms
- Handles 100+ concurrent requests

## Production Deployment

### Environment Variables
Set these environment variables in production:
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="long-random-secure-string"
PORT=3000
NODE_ENV=production
CLIENT_URL="https://your-frontend-domain.com"
```

### Build Commands
```bash
npm run build:server
npm run build:client
```

### Deployment Targets
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, Heroku, or any Node.js hosting
- **Database**: Consider migrating to PostgreSQL for production

## License

ISC

## Contributing

This is a demonstration project. Feel free to use it as a template for your own projects.
