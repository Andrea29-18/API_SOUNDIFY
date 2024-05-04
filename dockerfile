# Version de NODEJS desde Docker
FROM node:21.6.1

# Directorio de trabajo
WORKDIR /app

# Archivos que necesita el Directorio de trabajo
COPY package*.json ./

# Depencias
RUN npm install 

RUN npm i express

RUN npm -g install nodemon

RUN npm i dotenv mongodb mongoose

# Archivos que necesito
COPY . .

# Puerto
EXPOSE 3500

#Ejecutar todo el proyecto
CMD [ "npm", "start" ]