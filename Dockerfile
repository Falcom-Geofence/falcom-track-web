# Use the official Node.js LTS image to build and run the Next.js app
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the source code and build the application
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

EXPOSE 3000

# When the container starts, serve the Next.js app in production mode.
CMD ["npm", "start"]
