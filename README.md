# School Management System

This is a backend API to manage a school system with features for managing students, teachers, and classes. It includes functionality for creating, updating, and deleting students and teachers, as well as class management. Additionally, Cloudinary is integrated for storing student and teacher profile pictures.

## Features

- **Admin Access**: JWT-based authentication for admin access.
- **CRUD Operations**: Create, Read, Update, Delete students, teachers, and classes.
- **Cloudinary Integration**: Upload and store profile images for students and teachers.
- **Soft Delete**: Ability to soft delete students and teachers (mark as deleted without removing from the database).
- **Pagination**: Pagination for listing students and teachers.
- **Validation**: Schema validation with Zod.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Image Storage**: Cloudinary for profile images
- **Validation**: Zod for schema validation

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Cloudinary](https://cloudinary.com/) - Cloud-based image management.

### Steps to Install

1. Clone the repository:

   ```bash
   git clone git@github.com:ayushchandra97/school-management-system-apis.git
   ```

2. Navigate to the project directory:

   ```bash
   cd school-management-system

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env file in the root directory and add the following variables:

   ```bash
   DATABASE_URL = 'mongodb+srv://your-url-here'
   JWT_SECRET = 'secret'
   JWT_EXPIRES_IN = '5d'
   CLOUDINARY_CLOUD_NAME = 'clientname'
   CLOUDINARY_API_KEY = 'apikey'
   CLOUDINARY_API_SECRET = 'apisecretkey'
   CLOUDINARY_API_ENV_VARIABLE = 'CLOUDINARY_URL=cloudinary://apikey:apisecretkeyo@clientname'
   ```

   The server will run on http://localhost:5000.

## API Endpoints

1. POST api/students/create-
   Creates a new student .

- **Request Body**:

```json
{
  "name": "abc",
  "email": "abc@def.com",
  "classId": "12456"
}
```

- **Request Body**:

```json
{
  "message": "Student added successfully",
  {
  "name": "abc",
  "email": "abc@def.com",
  "classId": "12456",
  "profileImageUrl": "url"
}
}
```
