# Backend Microservices App

## Introduction
This project demonstrates robust microservice architecture for managing discussions, comments, and user interactions with user authentication and authorization.

## Overview

This microservice-based backend application provides a comprehensive set of functionalities for user management and discussion handling. It includes APIs for user authentication, user interactions such as following other users, posting discussions with optional images and hashtags, managing comments, likes, and more.

## Microservices

### Auth-Service
- **URL**: [https://social-media-backend-application.onrender.com](https://social-media-backend-application.onrender.com)
- **Description**: Handles user authentication, signup, login, user management, and authorization using JWT tokens.

### Discussion-Service
- **URL**: [https://social-media-backend-application-f4un.onrender.com](https://social-media-backend-application-f4un.onrender.com)
- **Description**: Manages discussions, posts, comments, likes, and search functionalities based on tags and text content.

##Low-Level Design (LLD) of the Flow
## Services Overview
### User Service
- Create, update, delete users.
- List users and search users by name.
- Follow/unfollow users.

### Discussion Service
- Create, update, delete discussions.
- List discussions by tags or text.

### Comment Service
- Add, update, delete comments.
- Like comments, reply to comments.

## API Endpoints
### User Service
- `POST /register`: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "mobile": "string",
      "password": "string",
    }
    ```
- `POST /login`: Authenticate a user and return a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "JWT_token_here"
    }
    ```
- `GET /user/{id}`: Retrieve user information.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
- `GET /users`: List all users.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
- `GET /users/search?name={name}`: Search users by name.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```

### Discussion Service
- `POST /discussions`: Create a new discussion.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
  - **Request Body**:
    ```json
    {
      "text": "string",
      "image": "string",
      "hashtags": ["string"]
    }
    ```
- `PUT /discussions/{id}`: Update a discussion.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
  - **Request Body**:
    ```json
    {
      "text": "string",
      "image": "string",
      "hashtags": ["string"]
    }
    ```
- `DELETE /discussions/{id}`: Delete a discussion.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
- `GET /discussions`: Retrieve a list of discussions.
- `GET /discussions/{id}`: Retrieve a specific discussion by ID.
- `GET /discussions/tags/{tags}`: Retrieve discussions by tags.
- `GET /discussions/search?text={text}`: Search discussions by text.

### Comment Service
- `POST /discussions/{id}/comments`: Add a comment to a discussion.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
  - **Request Body**:
    ```json
    {
      "text": "string"
    }
    ```
- `PUT /comments/{id}`: Update a comment.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
  - **Request Body**:
    ```json
    {
      "text": "string"
    }
    ```
- `DELETE /comments/{id}`: Delete a comment.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
- `GET /discussions/{id}/comments`: Retrieve comments for a specific discussion.
- `POST /comments/{id}/like`: Like a comment.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
- `POST /comments/{id}/reply`: Reply to a comment.
  - **Authorization Header**:
    ```
    Authorization: Bearer JWT_token_here
    ```
  - **Request Body**:
    ```json
    {
      "text": "string"
    }
    ```

## Postman Collection
The Postman collection file Discussion-Backend-app.postman_collection.json has been added to the repository. It includes sample requests for various endpoints with necessary headers and body payloads for testing.


