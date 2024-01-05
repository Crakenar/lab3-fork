# Step 1: Use a node base image
FROM node:20 as build-stage

# Set the working directory in the Docker container
WORKDIR /frontend

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Vue app's source code
COPY . .

# Build the app
RUN npm run build

# Step 2: Setup the server
FROM nginx:stable as production-stage

# Copy the built app from the build-stage to the default nginx directory
COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]