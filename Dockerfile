
# Create base layer
FROM node:15.7.0-alpine AS base

WORKDIR /app

# Tini wrapper
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as build

COPY package*.json ./
RUN npm ci

COPY src src
COPY tsconfig.json .

RUN npm run build

# Final Image
FROM base

COPY package.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Switch to non-root user
USER node

CMD ["node", "./build"]