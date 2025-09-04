# Dockerfile para el Backend (Node.js) - Corregido
FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install
RUN npm ci

# Copiar el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

# Cambiar propiedad y usuario
RUN chown -R backend:nodejs /usr/src/app
USER backend

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
