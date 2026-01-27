FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source
COPY tsconfig.docker.json ./tsconfig.json
COPY src/ ./src/

# Build
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy built files
COPY --from=builder /app/dist ./dist

# Environment
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/index.js"]
