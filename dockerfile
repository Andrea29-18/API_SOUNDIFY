# Version de NODEJS desde Docker
FROM node:19-alpine3.18

# Archivos que necesita el Directorio de trabajo
WORKDIR /app

COPY package*.json ./

COPY . .

# Puerto
EXPOSE 3000

# Depencias
RUN npm install 


CMD [ "node", "index.js" ]