# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy client and server package files
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies
RUN npm run install:all

# Copy source code
COPY client ./client
COPY server ./server

# Build frontend and backend
RUN npm run build

# Run Drizzle migrations
WORKDIR /app/server
# Migrate db
RUN npm run db:migrate

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy server package.json for dependency installation
COPY server/package.json ./server/

# Install dependencies for the server
WORKDIR /app/server
RUN npm install --include=dev

# Copy built artifacts from builder
COPY --from=builder /app/client/dist ../client/dist
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/drizzle ./drizzle

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
