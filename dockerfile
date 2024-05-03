# Version de NODEJS
FROM node:21.6.1

# Puerto
EXPOSE 3500

# Archivos
COPY . /app

# Archivo package.json
COPY package*.json ./

# Depencias
RUN npm -g install nodemon

RUN npm install

CMD [ "node", "start" ]