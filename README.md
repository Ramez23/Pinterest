Pinterest Clone API
This is a backend API for a Pinterest-style application, developed using Node.js, Express, and MongoDB. The API supports user registration, login, board management, pin creation, and uploading profile and pin images. It also includes middleware for authentication and authorization.

Features
User Authentication: Register, login, and manage user profiles.
Board Management: Create, update, delete, and view boards.
Pin Management: Create, update, delete, and view pins with image upload functionality.
Authorization: Protect routes to ensure only authorized users can access specific endpoints.
File Upload: Supports uploading images for pins and user profiles.


Dependencies
Express: Fast, unopinionated, minimalist web framework for Node.js.
Mongoose: MongoDB object modeling for Node.js.
jsonwebtoken: For secure user authentication.
multer: Middleware for handling multipart/form-data for file uploads.
