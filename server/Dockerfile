# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container to /server
WORKDIR /server

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose port 3001 for the application
EXPOSE 3001

# Define the command to run the application
CMD [ "npm", "start" ]