# ── Build ──────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Serve ──────────────────────────────────────────────
FROM nginx:alpine

# Copia el build al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de nginx para SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
