
# BookBox API

A RESTful backend service for managing user accounts and their personal libraries. Built with TypeScript, Node.js, and MongoDB, and includes role-based authentication, book tracking, and user management features.


## Features

- User registration and login with JWT authentication
- Role-based access (`user`, `admin`)
- Book CRUD with user ownership
- Admin access to manage all users
- Pagination support
- Swagger documentation


## Technologies

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment configuration
- Swagger for API documentation


## Folder Structure

```
├── config/              # Configuration files
├── controllers/         # Route handlers
├── middleware/          # Auth and role check
├── models/              # Mongoose models
├── routes/              # Route definitions
├── types/               # Custom TypeScript types
├── .env                 # Environment variables
├── index.ts             # App entry point

```
## Run Locally

Clone the project

```bash
  git clone git@github.com:DreamTeamPAW/BookBox-API.git
```

Go to the project directory

```bash
  cd BookBox-API
```

Install dependencies

```bash
  npm install ci
```

Create a `.env` file

```env
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  ADMIN_COOKIE_SECRET=your_admin_cookie_secret
  JWT_SECRET=your_super_secure_secret
  PORT=your_app_port

```

Start the server (swagger created automatically) 

```bash
  npm run dev
```
Server will run at `http://localhost:<PORT>`.

Swagger documentation url at `http://localhost:<PORT>/api-docs`


## Deployment on Azure

Dockerfile

```Dockerfile
    ARG NODE_VERSION=23.10.0

    # ----------- Building stage
    FROM node:${NODE_VERSION}-alpine as builder
    WORKDIR /app
    # Copy package and package-lock
    COPY package*.json ./
    # Install all libraries to build the project 
    RUN npm ci
    # Copy rest of the files
    COPY . .
    # Build the project
    RUN npm run build 

    # ----------- Runtime stage
    FROM node:${NODE_VERSION}-alpine
    WORKDIR /app
    # Copy built files
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package*.json ./
    # Install only production libraries
    RUN npm ci --omit=dev
    # Expose the port that the application listens on.
    EXPOSE 3001
    ENV PORT=3001
    WORKDIR /app/dist
    # Run the application.
    CMD ["node", "index.js"]
```

 Environment Variables (in Azure Web App)

 - `DB_USER`
 - `DB_PASSWORD`
 - `JWT_SECRET`
 - `ADMIN_COOKIE_SECRET`

 GitHub Actions workflow - `main.yml`

 ```yaml
    name: Publish Docker image

    on:
    push:
        branches:
        - 'prod-backend'

    jobs:
    push_to_registry:
        name: Push Docker image to Docker Hub
        runs-on: ubuntu-latest
        steps:
        - name: Check out the repo
            uses: actions/checkout@v4
            with:
            ref: 'prod-backend'

        - name: Log in to Docker Hub
            uses: docker/login-action@v2
            with:
            username: ${{ secrets.DOCKER_USERNAME }}
            password: ${{ secrets.DOCKER_PASSWORD }}

        - name: Build and push Docker image
            uses: docker/build-push-action@v4
            with:
            context: .
            file: ./Dockerfile
            push: true
            tags: yourdockerhub/bookbox-api:latest

 ```

 Deployment via Azure Portal

 1. Create resource → Web App for Containers
 2. Choose pricing plan
 3. Configure container:
    - Image Source: `Docker Hub`
    - Private repo
    - Provide Docker credentials
4. Go to Settings > Configuration > Environment Variables
5. Add `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_COOKIE_SECRET`
