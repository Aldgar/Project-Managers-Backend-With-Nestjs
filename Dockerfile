# Development Stage
FROM node:lts-alpine3.19 AS development

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:lts-alpine3.19 AS production

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production-only dependencies
RUN npm install --only=production

# Copy the build output from the development stage
COPY --from=development /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]