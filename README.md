# Task Management System

A full-stack Task Management application built with **Node.js**, **Express**, **MongoDB Atlas**, **React (Vite)**, and **JWT Authentication**.

This project was developed as part of the Lead Web Praxis Technical Assessment.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### Task Management

- Create Task
- View Tasks
- Update Task
- Delete Task
- Filter by Status
- Filter by Priority

### Security

- Password hashing using bcrypt
- JWT token authentication
- Protected API endpoints
- User-specific task ownership

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

### Frontend

- React
- Vite
- Axios
- React Router DOM

---

---

# Installation

## Clone Repository

```bash
git clone https://github.com/justPoly/task-manager.git
```

```
cd task-manager
```

---

# Backend Setup

```
cd backend
```

Install packages

```bash
npm install
```

Create

```
.env
```

from

```
.env.example
```

Run server

```bash
npm run dev
```

Backend runs on

```
http://localhost:3000
```

---

# Frontend Setup

Open another terminal

```
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Backend

```
PORT=

MONGO_URI=

JWT_SECRET=
```

Frontend

```
VITE_API_URL=http://localhost:3000/api
```

---

# API Documentation

## Authentication

### Register

POST

```
/api/auth/register
```

Body

```json
{
    "name":"Poly Atal",
    "email":"poly@example.com",
    "password":"Password123"
}
```

---

### Login

POST

```
/api/auth/login
```

Returns

```json
{
    "token":"JWT_TOKEN"
}
```

---

### Logout

POST

```
/api/auth/logout
```

---

## Tasks

Requires

```
Authorization

Bearer JWT_TOKEN
```

---

### Create Task

POST

```
/api/tasks
```

---

### Get Tasks

GET

```
/api/tasks
```

Optional query parameters

```
status

priority
```

Example

```
/api/tasks?status=done
```

```
/api/tasks?priority=high
```

---

### Get Single Task

GET

```
/api/tasks/:id
```

---

### Update Task

PUT

```
/api/tasks/:id
```

---

### Delete Task

DELETE

```
/api/tasks/:id
```

---

# Author

Polycarp Atalor