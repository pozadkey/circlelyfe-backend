# Circlelyfe Social Media App Backend API Documentation

Welcome to the Circlelyfe Social Media App Backend API Documentation. This repository contains the API documentation for the backend services of Circlelyfe, a social media application. This documentation is designed to help developers understand and use the available endpoints to build applications or interact with the Circlelyfe platform.

## Table of Contents

1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
   - [Post](#post)
     - [Create Post](#create-post)
     - [Get Post](#get-post)
     - [Get Post By Id](#get-post-by-id)
     - [Delete Post](#delete-post)
   - [User](#user)
     - [Login](#login)
     - [Verify User](#verify-user)
     - [Logout User](#logout-user)
     - [Delete User](#delete-user)
     - [Get User By Id](#get-user-by-id)
     - [Get User](#get-user)
3. [Getting Started](#getting-started)
4. [Authentication](#authentication)
## Introduction

Circlelyfe is a social media platform, and this API serves as the backend infrastructure supporting its core features. This documentation provides detailed information on various API endpoints for posts and user-related actions.

## Endpoints

### Post

#### Create Post

- **HTTP Method:** POST
- **Endpoint:** `http://localhost:5000/post/create-post`
- **Description:** Create a new post in the Circlelyfe app.
- **Authorization:** Bearer Token
- **Request Body:**
  ```json
  {
      "content": "Something nice",
      "image": "image-example"
  }
  
#### Get Post

- **HTTP Method:** GET
- **Endpoint:** `http://localhost:5000/post/`
- **Description:** Retrieve a list of all posts available in the Circlelyfe app.

#### Get Post By Id

- **HTTP Method:** GET
- **Endpoint:** `http://localhost:5000/post/view/:id`
- **Description:** Retrieve a specific post by its unique ID.

#### Delete Post

- **HTTP Method:** DELETE
- **Endpoint:** `http://localhost:5000/post/delete/:id`
- **Description:** Delete a specific post by its unique ID.
- **Authorization:** Bearer Token

### User

#### Login

- **HTTP Method:** POST
- **Endpoint:** `http://localhost:5000/account/login`
- **Description:** Authenticate and log in as a user in the Circlelyfe app.
- **Request Body:**
  ```json
  {
      "email": "example@gmail.com"
  }
  
#### Verify User

- **HTTP Method:** POST
- **Endpoint:** `http://localhost:5000/account/verify`
- **Description:** Verify the user's email to complete the registration process.
- **Request Body:**
  ```json
  {
      "email": "example@gmail.com",
      "emailToken": "Your_Email_Token"
  }
  
#### Logout User

- **HTTP Method:** POST
- **Endpoint:** `http://localhost:5000/account/logout`
- **Description:** Log out the currently authenticated user from the Circlelyfe app.
- **Request Body:**
  ```json
  {
      "authToken": "Your_Bearer_Token_Here"
  }
  
#### Delete User

- **HTTP Method:** DELETE
- **Endpoint:** `http://localhost:5000/user/:id`
- **Description:** Delete a specific user by their unique ID.
- **Authorization:** Bearer Token

#### Get User By Id

- **HTTP Method:** GET
- **Endpoint:** `http://localhost:5000/user/:id`
- **Description:** Retrieve a specific user's details by their unique ID.
- **Authorization:** Bearer Token

#### Get User

- **HTTP Method:** GET
- **Endpoint:** `http://localhost:5000/user`
- **Description:** Retrieve a list of all users registered in the Circlelyfe app.
- **Authorization:** Bearer Token

## Getting Started

To get started with the Circlelyfe API, you'll need to have a running instance of the Circlelyfe backend. Follow these steps:

1. Clone this repository to your local machine.
2. Ensure you have Node.js and npm installed.
3. Install project dependencies using `npm install`.
4. Start the backend server with `npm start`.

## Authentication

Most endpoints in the Circlelyfe API require authentication using a Bearer Token. To obtain a valid token, you should follow the login process described in the documentation.

Happy coding! 🚀
