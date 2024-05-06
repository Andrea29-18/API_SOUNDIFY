# Usa la imagen de Node.js 19 en Alpine Linux como base
FROM  node:21.6.1

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios para la construcción de la imagen
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000

# Ejecuta la aplicación
CMD ["node", "index.js"]
