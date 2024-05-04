# Version de NODEJS desde Docker
FROM node:21.6.1

# Directorio de trabajo
WORKDIR /app

# Archivos que necesita el Directorio de trabajo
COPY package*.json ./

# Depencias
RUN npm -g install nodemon

RUN npm install

# Archivos que necesito
COPY . .

#Ejecutar todo el proyecto
CMD [ "npm", "start" ]