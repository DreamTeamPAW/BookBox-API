
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
  npm ci
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
   permissions:
     packages: write
     contents: read
     attestations: write
     id-token: write
   steps:
     - name: Check out the repo
       uses: actions/checkout@v4
       with:
         ref: 'prod-backend'

     - name: Log in to Docker Hub
       uses: docker/login-action@f4ef78c080cd8ba55a85445d5b36e214a81df20a
       with:
         username: ${{ secrets.DOCKER_USERNAME }}
         password: ${{ secrets.DOCKER_PASSWORD }}

     - name: Extract metadata (tags, labels) for Docker
       id: meta
       uses: docker/metadata-action@9ec57ed1fcdbf14dcef7dfbe97b2010124a938b7
       with:
         images: pawprojekt2025/pawprojekt2025

     - name: Build and push Docker image
       id: push
       uses: docker/build-push-action@3b5e8027fcad23fda98b2e3ac259d8d67585f671
       with:
         context: .
         file: ./Dockerfile
         push: true
         tags: ${{ steps.meta.outputs.tags }}
         labels: ${{ steps.meta.outputs.labels }}

     - name: Generate artifact attestation
       uses: actions/attest-build-provenance@v2
       with:
         subject-name: index.docker.io/pawprojekt2025/pawprojekt2025
         subject-digest: ${{ steps.push.outputs.digest }}
         push-to-registry: true
     
     - name: Azure login
       uses: azure/login@v1
       with:
         client-id: ${{ secrets.AZURE_CLIENT_ID }}
         tenant-id: ${{ secrets.AZURE_TENANT_ID }}
         subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

     - name: Azure Docker login
       uses: azure/docker-login@v1
       with:
         login-server: index.docker.io
         username: ${{ secrets.DOCKER_USERNAME }}
         password: ${{ secrets.DOCKER_PASSWORD }}

     - name: Create and configure Azure Web App (if not exists)
       run: |
         APP_NAME="api-projektpaw"
         APP_EXISTS=$(az webapp list --query "[?name=='$APP_NAME'].name" -o tsv)
         if [ -z "$APP_EXISTS" ]; then
           echo "Creating Azure Web App..."
           az webapp create --resource-group ProjektPAW \
             --plan ProjektPAW-MainResourcePlan \
             --name $APP_NAME \
             --container-registry-url index.docker.io \
             -c pawprojekt2025/pawprojekt2025:prod-backend \
             -s ${{ secrets.DOCKER_USERNAME }} \
             -w ${{ secrets.DOCKER_PASSWORD }}
         else
           echo "App already exists, skipping creation."
         fi
         echo "Setting environment variables..."
         az webapp config appsettings set \
           --name $APP_NAME \
           --resource-group ProjektPAW \
           --settings DB_USER=${{ secrets.DB_USER }} \
           DB_PASSWORD=${{ secrets.DB_PASSWORD }} \
           JWT_SECRET=${{ secrets.JWT_SECRET }}


     - name: Deploy to Azure Container Instances
       uses: azure/webapps-deploy@v2
       with:
         images: pawprojekt2025/pawprojekt2025:prod-backend
         app-name: api-projektpaw

 ```

 Azure setup for automatic deployment

 1. Create resource group
 2. Create resource plan "App service plan"
    - Select a Free (F1) plan
 3. Create managed identity
    - Add a federated credential
    - Organization: DreamTeamPAW
    - Repository: BookBox-API
    - Entity: Branch
    - Branch: prod-backend
 4. Set permissions
    - Go to resource group settings
    - Select access control
    - Set privileges to "Contributor"
    - Assign to created managed identity
5. Read necessary IDs for GitHub Actions
    - Open settings for managed identity
    - Select JSON view
    - Copy subscription id, tenant id, client id, and set it in GitHub Secrets