# Backend

This project was made using nodejs with express and mongodb

## Enviroment variables

Create a .env file to use enviroment variables, example can be found in .env.example or set the mongodb URI and PORT manually in app.ts and server.ts respectively

## Development server

Run npm install to install dependencies, and npm run dev to run the development server

## APIs routes

API routes are:
  - '/users' GET return all users
  - '/users/:id' GET return user with ID
  - '/users' POST create user
  - '/users/:id' PUT update user with ID
  - '/users/:id' DELETE delete user with ID
