############################################################################################
#
#  __   __   _              ____                      
#  \ \ / /__| |_ __        / ___|__ _ _ __ ___  _ __  
#   \ V / _ \ | '_ \ _____| |   / _` | '_ ` _ \| '_ \ 
#    | |  __/ | |_) |_____| |__| (_| | | | | | | |_) |
#    |_|\___|_| .__/       \____\__,_|_| |_| |_| .__/ 
#             |_|                              |_|                                
#
# YELP-CAMP
#
# https://github.com/ayfantis53/vanilla_yelp-camp/docker/Dockerfile

############################################################################################
# Node Building Layer
# This is a MINIMAL RUNTIME image to run Node project
# For building Yelp-camp
############################################################################################
# Use an official Node.js runtime as the base image for the application.
FROM node:latest

# Set the working directory inside the container to /app. All subsequent instructions
# will be executed in this directory.
WORKDIR /app

# Copy the package.json and package-lock.json files from the host to the container's
# working directory. This step is optimized for Docker caching, ensuring dependencies
# are only reinstalled if these files change.
COPY ./package*.json ./

# Run the npm install command to install the application's dependencies
# within the container.
RUN npm install

# Copy the rest of the application's source code from the host to the
# container's working directory.
COPY . .

# Define the command to run the application when the container starts.
CMD ["npm", "start"]

