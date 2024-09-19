#  /server/coderunner/container/Dockerfile

# Use the official Node.js image
FROM node:14

# Create a working directory
WORKDIR /usr/src/app

# Copy the executor script into the container
COPY executor.js .

# Set the command to run the executor script
CMD ["node", "executor.js"]