# ========================================
# Dependencies Stage: Install Dependencies
# ========================================
FROM oven/bun:alpine AS deps
WORKDIR /app

# Copy only package files needed for migrations
COPY package.json bun.lock turbo.json ./
COPY apps/sim/package.json ./apps/sim/db/

# Install minimal dependencies in one layer
RUN bun install --omit dev --ignore-scripts && \
    bun install --omit dev --ignore-scripts drizzle-kit drizzle-orm postgres next-runtime-env

# ========================================
# Runner Stage: Production Environment
# ========================================
FROM oven/bun:alpine AS runner
WORKDIR /app

# Copy only the necessary files from deps
COPY --from=deps /app/node_modules ./node_modules
COPY apps/sim/drizzle.config.ts ./apps/sim/drizzle.config.ts
COPY apps/sim/db ./apps/sim/db
COPY apps/sim/package.json ./apps/sim/package.json
COPY apps/sim/lib/env.ts ./apps/sim/lib/env.ts

WORKDIR /app/apps/sim

# This image is used by docker-compose to run migrations.
# Provide a default command so it can be executed standalone.
CMD ["bun", "run", "db:push"]
