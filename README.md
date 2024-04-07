# API REST de Soundify

Esta es una API REST diseñada para el proyecto Soundify, una plataforma de streaming de música. La API proporciona endpoints para gestionar usuarios, álbumes, artistas, canciones y más.
## Estructura de carpetas

### Implementados

- **config**: Contiene archivos de configuración para la aplicación, como variables de entorno y configuraciones de base de datos.
  
- **controllers**: Aquí se encuentran los controladores de la lógica de negocio de la aplicación. Cada controlador maneja las solicitudes HTTP y realiza las operaciones correspondientes en la base de datos.

- **models**: Contiene los modelos de datos de la aplicación definidos con Mongoose. Cada modelo representa una colección en la base de datos MongoDB y define la estructura y el comportamiento de los datos.

- **routes**: Aquí se encuentran los archivos de enrutamiento de Express que definen los endpoints de la API y vinculan las solicitudes HTTP a los controladores correspondientes.

### Proceso

- **services**: Contiene módulos de servicios que encapsulan la lógica de negocio compleja y se utilizan en los controladores para realizar operaciones específicas. _en proceso_

- **middlewar**: Contiene middleware personalizado que se utiliza para interceptar y modificar las solicitudes HTTP antes de que lleguen a los controladores. Esto puede incluir la autenticación, validación de datos, registro de solicitudes, etc.


## Ejecutar el programa
