# Usa la imagen de Node.js 21.6.1 en Alpine Linux como base
FROM node:21.6.1-alpine

# Establece la variable de entorno NODE_ENV a "production"
ENV NODE_ENV=production

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios para la construcción de la imagen
COPY package*.json ./

# Instala las dependencias, usando npm ci para instalar dependencias de manera más confiable en entornos de CI/CD
RUN npm ci --only=production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000

# Ejecuta la aplicación
CMD ["node", "index.js"]
