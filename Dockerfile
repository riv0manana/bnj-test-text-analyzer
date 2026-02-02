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
# This will also generate the prisma/drizzle artifacts if configured in the build script
RUN npm run build

# Generate Drizzle migrations
WORKDIR /app/server
RUN npm run db:generate

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy server package.json for dependency installation
COPY server/package.json ./server/

# Install only production dependencies for the server
WORKDIR /app/server
RUN npm install --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/client/dist ../client/dist
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/drizzle ./drizzle

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
