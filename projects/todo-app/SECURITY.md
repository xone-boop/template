# Security Policy

## Security Features

This application implements multiple layers of security to protect user data and prevent common vulnerabilities.

### Authentication & Authorization

1. **JWT-Based Authentication**
   - Tokens expire after 7 days
   - Tokens are validated on every protected request
   - Tokens are stored securely in localStorage

2. **Password Security**
   - Passwords are hashed using bcrypt with 10 salt rounds
   - Password requirements enforced:
     - Minimum 8 characters
     - At least one uppercase letter
     - At least one lowercase letter
     - At least one number
   - Passwords are never logged or exposed in API responses

3. **Authorization**
   - Users can only access their own todos
   - All todo operations verify user ownership
   - Protected routes require valid JWT tokens

### Input Validation & Sanitization

1. **Email Validation**
   - Email format validation using express-validator
   - Email normalization to prevent duplicates
   - XSS prevention in email fields

2. **Password Validation**
   - Strong password requirements enforced
   - Validation on both client and server

3. **Todo Text Validation**
   - Maximum length: 500 characters
   - Empty text rejected
   - XSS payload handling

### SQL Injection Prevention

- **Prisma ORM** is used for all database operations
- Parameterized queries prevent SQL injection
- No raw SQL queries without sanitization

### XSS (Cross-Site Scripting) Prevention

- Input sanitization on all user inputs
- Content-Type headers properly set
- React's built-in XSS protection
- HTML encoding of user-generated content

### CSRF (Cross-Site Request Forgery) Protection

- JWT tokens in Authorization headers (not cookies)
- CORS configured to allow only specific origins
- SameSite cookie policy if cookies are used

### Rate Limiting

- **Authentication endpoints**: 5 requests per 15 minutes per IP
- Prevents brute force attacks
- Automatic lockout after rate limit exceeded

### Security Headers (Helmet.js)

- Content-Security-Policy
- X-XSS-Protection
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security

### CORS Configuration

- Origin restricted to frontend URL only
- Credentials enabled for secure communication
- Preflight requests handled properly

## Security Testing

The application includes comprehensive security tests:

1. **SQL Injection Tests**
   - Login endpoint injection attempts
   - Todo creation with SQL payloads
   - Database integrity verification

2. **XSS Tests**
   - Script tag injection in todos
   - XSS in registration fields
   - HTML entity handling

3. **Authentication Bypass Tests**
   - Missing token rejection
   - Invalid token rejection
   - Malformed header rejection
   - Expired token rejection

4. **Authorization Tests**
   - Cross-user todo access prevention
   - Ownership verification

5. **Rate Limiting Tests**
   - Authentication rate limit verification
   - Automated attack simulation

6. **Input Validation Tests**
   - Email format validation
   - Password strength validation
   - Text length validation

## Known Security Considerations

### Development Environment

1. **JWT Secret**
   - Default JWT secret is insecure
   - MUST be changed in production
   - Should be a long, random string (32+ characters)

2. **Database**
   - SQLite is used for simplicity
   - Consider PostgreSQL for production
   - Enable database encryption if needed

3. **HTTPS**
   - Application should be served over HTTPS in production
   - Use Let's Encrypt for free SSL certificates
   - Force HTTPS redirects

### Production Recommendations

1. **Environment Variables**
   ```env
   JWT_SECRET=<generate-long-random-string>
   NODE_ENV=production
   DATABASE_URL=<production-database-url>
   CLIENT_URL=<your-frontend-url>
   ```

2. **Database**
   - Use PostgreSQL instead of SQLite
   - Enable SSL for database connections
   - Regular backups
   - Database connection pooling

3. **Monitoring**
   - Set up error monitoring (Sentry, etc.)
   - Log security events
   - Monitor failed login attempts
   - Track rate limit violations

4. **Updates**
   - Keep dependencies updated
   - Regular `npm audit` checks
   - Security patches applied promptly

## Vulnerability Reporting

If you discover a security vulnerability, please email the maintainer directly rather than creating a public issue.

## Security Checklist for Deployment

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Set NODE_ENV to production
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Enable error monitoring
- [ ] Review and update rate limits
- [ ] Run security audit: `npm audit`
- [ ] Test all authentication flows
- [ ] Verify input validation
- [ ] Check security headers
- [ ] Test rate limiting
- [ ] Verify SQL injection protection
- [ ] Test XSS prevention

## Dependencies Security

Regular dependency audits are performed:

```bash
npm audit
npm audit fix
```

Critical vulnerabilities are addressed immediately.

## Compliance

This application follows OWASP security best practices:
- A1: Injection Prevention
- A2: Broken Authentication Prevention
- A3: Sensitive Data Exposure Prevention
- A5: Broken Access Control Prevention
- A7: Cross-Site Scripting Prevention

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
