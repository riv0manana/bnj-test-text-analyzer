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
# Copy drizzle config and migrations
COPY server/drizzle.config.ts .
COPY server/src/core/infra/repository/db/drizzle ./src/core/infra/repository/db/drizzle
COPY server/src/core/infra/repository/db/schema.ts ./src/core/infra/repository/db/schema.ts

# Expose the port
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "npm run db:migrate && node dist/index.js"]
