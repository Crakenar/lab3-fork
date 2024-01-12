# Step 1: Use a node base image
FROM node:20 as build-stage

# Pass build-time variables
ARG VITE_API_URL_DOCKER

# Set the environment variable
ENV VITE_API_URL_DOCKER=$VITE_API_URL_DOCKER

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

# Copy nginx configuration file
COPY --from=build-stage /frontend/default.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build-stage to the default nginx directory
COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]