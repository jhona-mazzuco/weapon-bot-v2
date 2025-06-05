FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

# Install dependencies
RUN npm ci

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM node:22-alpine AS runner

WORKDIR .

# Copy built app from builder
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Serve the app
CMD ["npm", "run", "start:prod"]
