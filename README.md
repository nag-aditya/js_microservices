# JavaScript Microservice: Car Junk Yard Application

This repository contains few microservices which interact with each other using Axios library.
These services are created as a sample to understand how a micro services can be built and how they can communicate with each other.
These services conatin few basic HTTP endpoints respresenting a sample Car Junk Car Application.
These services have been developed using Node js, Express js, Nodemon server.
These services are categorized into user-service, car-service, order-service and api-getway service.
These services use basic JTW web token for authorization.
These services use Mongodb as their document  database.

Instructions to run the application:
Install Nodejs and Nodemon.
Install Mongodb community version.
Clone the repository into local directory.
Run the command 'mongod' from the local directory to start Mongodb.
Change directory to each of the micorservices root folder.
Next use command "npm i" from command line to install all the node libraries required.
Next use command "npm start" from command line to start each service.

Access the following API endpoints using Postman 
'http://localhost:3000/register' --> This a POST request
'http://localhost:3000/login' -->  This a POST request
'http://localhost:3000/cars' -->  This a POST request
'http://localhost:3000/car' -->  This a GET request
'http://localhost:3000/order'  -->  This a POST request
'http://localhost:3000/about' -->  This a GET request
