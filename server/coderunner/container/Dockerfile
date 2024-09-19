# /server/coderunner/container/Dockerfile

# Use the most lightweight Node.js image based on Alpine Linux
FROM node:lts-alpine

# Create a working directory
WORKDIR /usr/src/app

# Copy the executor script into the container
COPY executor.js .

# Set the command to run the executor script
CMD ["node", "executor.js"]