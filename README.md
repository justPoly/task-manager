# Task Management System

A full-stack Task Management application built with **React**, **Node.js**, **Express**, **MongoDB Atlas**, and **JWT Authentication**.

This project was developed as part of the **Lead Web Praxis Technical Assessment**. It enables authenticated users to securely manage their personal tasks through a RESTful API and an intuitive React frontend.

---

## Features

### Authentication

- User registration
- Secure user login
- JWT-based authentication
- Protected API routes
- Logout functionality

### Task Management

- Create tasks
- View all personal tasks
- View a single task
- Update existing tasks
- Delete tasks
- Filter tasks by status
- Filter tasks by priority

### Security

- Password hashing with bcrypt
- JWT signing and verification
- Route protection using authentication middleware
- User-specific task isolation (users can only access their own tasks)
- Input validation and error handling

---

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt

### Frontend

- React
- Vite
- React Router DOM
- Axios

### Development Tools

- Git & GitHub
- Postman


---

# Prerequisites

Before running the application, ensure the following are installed:

- Node.js (v18 or later recommended)
- npm
- A free MongoDB Atlas account

---

# Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/justPoly/task-manager.git
cd task-manager
```

---

## 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using the provided template:

```bash
cp .env.example .env
```

Update the environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

The backend is available at:

```
http://localhost:3000
```

---

## 3. Frontend Setup

Open a new terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

Run the development server:

```bash
npm run dev
```

The frontend is available at:

```
http://localhost:5173
```

---

# MongoDB Setup

This project used **MongoDB Atlas**.

1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Add your current IP address under **Network Access**.
4. Copy the Atlas connection string.
5. Replace the value of `MONGO_URI` inside the backend `.env` file.

---

# API Documentation

## Authentication

### Register

**POST**

```
/api/auth/register
```

Example Request

```json
{
    "name": "poly atal",
    "email": "poly@example.com",
    "password": "Password123"
}
```

---

### Login

**POST**

```
/api/auth/login
```

Returns

```json
{
    "success": true,
    "token": "JWT_TOKEN"
}
```

---

### Logout

**POST**

```
/api/auth/logout
```

---

## Task Endpoints

All task endpoints require the following header:

```
Authorization: Bearer JWT_TOKEN
```

### Create Task

**POST**

```
/api/tasks
```

---

### Retrieve All Tasks

**GET**

```
/api/tasks
```

Optional query parameters:

```
status
priority
```

Examples:

```
/api/tasks?status=done
```

```
/api/tasks?priority=high
```

```
/api/tasks?status=todo&priority=medium
```

---

### Retrieve a Single Task

**GET**

```
/api/tasks/:id
```

---

### Update a Task

**PUT**

```
/api/tasks/:id
```

---

### Delete a Task

**DELETE**

```
/api/tasks/:id
```

# API Testing

The REST API was tested using **Postman**.

## Authentication Flow

1. Register a new user

```
POST /api/auth/register
```

2. Login

```
POST /api/auth/login
```

3. Copy the JWT token returned by the login endpoint.

4. For all protected endpoints, include the token in the request headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Example Protected Endpoints

```
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Future Improvements

- Pagination
- Task search
- Sorting by due date
- Dark mode
- Profile management
- Token refresh mechanism

---

# Author

**Polycarp Atalor**

GitHub: https://github.com/justPoly