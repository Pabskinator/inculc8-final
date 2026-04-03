# Stage 1: Install dependencies
FROM node:21-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# 1. Install standard dependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# 2. ADD THIS LINE: Manually force the Alpine-specific Tailwind binary
RUN npm install @tailwindcss/oxide-linux-x64-musl --save-optional --force

# Stage 2: Rebuild the source code only when needed
FROM node:21-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables needed during build time
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Stage 3: Production image, copy all the files and run next
FROM node:21-alpine AS runner
WORKDIR /app

# Crucial for performance to tell Next.js it's in production
ENV NODE_ENV production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Security: Create and use a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Standard Node.js standalone build approach
# We only copy the resulting build and necessary node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Running standard `npm start`. If you are using standalone output,
# you would change this to `CMD ["node", "server.js"]`
CMD ["npm", "start"]