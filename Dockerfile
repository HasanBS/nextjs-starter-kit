
FROM node:22.5.1-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./ 
RUN npm install

# Copy project files
COPY . .

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

RUN echo "MONGODB_URI during build is: ${MONGODB_URI}"

# Build the Next.js app
RUN npm run build

# Expose the port for the app
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]