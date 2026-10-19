
# Stage 1: Build the React + Vite application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the production application
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the Vite production build
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY nginx-backend.conf /etc/nginx/snippets/backend.conf

ENV BACKEND_URL=https://api.gajec.org \
    NGINX_RESOLVER=127.0.0.11

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
