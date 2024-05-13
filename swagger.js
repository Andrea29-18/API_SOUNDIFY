const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Node.js API de SOUNDIFY',
        description: 'API en node.js'
    },
    host: 'https://soundify.azurewebsites.net/'
};

const outputfile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputfile,routes,doc);