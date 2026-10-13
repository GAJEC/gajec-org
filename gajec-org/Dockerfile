
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

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
