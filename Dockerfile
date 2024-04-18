# Use the official Nodejs image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json .

# Install dependencies
RUN npm i

# Copy all project files
COPY . .

# Build ts
RUN npm run build

# Specify the port the container will listen on
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "run", "runbuild"]