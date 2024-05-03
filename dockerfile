# Version de NODEJS
FROM node:21.6.1

# Directorio de trabajo en la imagen
WORKDIR /app

# Archivo package.json
COPY package*.json ./

# Depencias
RUN npm install

COPY . .

# Puerto
EXPOSE 3500

CMD [ "node", "index.js" ]