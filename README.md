## Author: Caique Xavier

# Dependencies
* Rabbitmq
* Mongodb
* NodeJs v9.11.1
* Yarn (npm install -g --save yarn)
* Maven
* JDK

# Install guide
* Clone this repository
* Open Command Line on project folder (/flight-app)
* cd flight-service/
* mvn package
* cd ../webapp/
* yarn install
* cd ../

# Execution guide
* sudo mongod (MongoDb Service should be responding on localhost port 27017, be sure that you have a fresh instance of mongodb test database if you already using it in other applications)
* /usr/local/sbin/rabbitmq-server (RabbitMq Server service should be responding on localhost port 5672)
* cd flight-service/
* mvn spring-boot:run (flights API should be responding on http://localhost:8081/v1/flights)
* cd ../webapp/
* npm start (web application should be responding on http://localhost:3000/)

# Data load and Api testing script
* cd api-data-load/
* node index.js
* At this moment you cloud do some validations
  - First: you will see response for objects pushed to API
  - Second: on flight-service/ command line (spring-boot instance), you will see messages dispached to rabbit-mq, with Object creation payload.
* refresh http://localhost:3000/
* DONE!

# Info
* The Web app was developed with a PWA (Progressive Web App) concept
* Recommended resolution: 400x649 (for Mobile)
* Full resolution works responsively

## Stack FrontEnd
* ReactJs: https://reactjs.org/.
* Starter: https://github.com/facebook/create-react-app.
* Redux: https://redux.js.org/.
* Material-ui: http://www.material-ui.com/#/.
* Axios http: https://github.com/axios/axios.
* momentjs: https://momentjs.com/.
* numeraljs: http://numeraljs.com/.


## Stack Backend
* Spring Boot (Spring Data/ Rest)
* MongoDb
* RabbitMq: https://www.rabbitmq.com/.
