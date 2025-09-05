# Dockerfile para el Frontend (Angular) - Solución Simple
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

# Eliminar archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todo y luego mover desde browser
COPY --from=build /app/dist/ /tmp/dist/
RUN cp -r /tmp/dist/*/browser/* /usr/share/nginx/html/ 2>/dev/null || \
    cp -r /tmp/dist/*/* /usr/share/nginx/html/ 2>/dev/null || \
    cp -r /tmp/dist/* /usr/share/nginx/html/

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
