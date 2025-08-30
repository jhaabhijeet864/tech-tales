# TechTales - MERN Stack Blogging Platform

## Project Structure

```
tech-tales/
├── client/             # Frontend React Application
│   ├── public/        # Public assets
│   └── src/           # React source code
│
├── server/            # Backend Node.js/Express Application
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/      # Database models
│   └── routes/      # API routes
│
├── .gitignore       # Git ignore file
├── package.json    # Root package.json (for running both client & server)
└── README.md      # Project documentation
```

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT

## API Contract

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Blog Routes
- GET /api/blogs - Get all blogs
- GET /api/blogs/:id - Get single blog
- POST /api/blogs - Create blog
- PUT /api/blogs/:id - Update blog
- DELETE /api/blogs/:id - Delete blog

### Admin Routes
- GET /api/admin/users - Get all users
- POST /api/admin/users - Create user
- DELETE /api/admin/users/:id - Delete user
