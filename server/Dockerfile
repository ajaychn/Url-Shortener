# 1. Use a lightweight official Node.js runtime as a base image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to leverage Docker's caching mechanism
COPY package*.json ./

# 4. Install production dependencies (removes dev dependencies for a smaller image)
RUN npm ci

# 5. Copy the rest of your application code
COPY . .

# 6
RUN npm run build

# 7. Expose the port your application listens on
EXPOSE 5000

# 8. Define the command to run your app
CMD [ "npm", "start" ]
