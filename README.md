# API REST for a online store that offers a CRUD for products and carts

# Purpose
This project was developed as a final project for the Backend Programming course at e-learning platform Coderhouse https://www.coderhouse.com/. 
The course was oriented to the development of a REST API using Node.js, Express and MongoDB featuring CRUD operations for products and carts.

# Technologies used in this project
- Node.js
- Express
- MongoDB
- Mongoose
- Typescript
- Socket.io
- Swagger
- JWT
- Twilio
- Nodemailer
- Bcrypt
- Dotenv
- Nodemon
- Log4JS
- EJS
- Mocha
- Chai
- Supertest

# Building
npm run build

# Running in prod

npm start

# Running in dev mode

npm run dev

# Swagger Docs
http://localhost:8080/docs/#/
![swagger](/swagger_api.JPG "Swagger")

# Authentication

### Login and copy JWT token
![auth_1](/auth_1.JPG "auth_1")
### Click on Authorize Button
![auth_2](/auth_2.JPG "auth_2")
### Paste the token and click on Authorize
![auth_3](/auth_3.JPG "auth_3")


# Set up mail configuration
Go to https://ethereal.email/create and create an account
![etheral](/ethereal.JPG "Mail Configuration")

Then, set the following environment variables on .env file:
```dotenv
ETHEREAL_EMAIL=tyshawn.buckridge@ethereal.email
ETHEREAL_PASSWORD=sqUutuUyWFFkeX6S7k
```

# Set up Twilio configuration
Go to https://www.twilio.com/try-twilio and create an account
![twilio](/twilio.JPG "Twilio Configuration")
![twilio](/twilio2.JPG "Twilio Configuration Whatsapp")

Then, set the following environment variables on .env file:
```dotenv
TWILIO_SMS_FROM=+13...
TWILIO_SID=AC...
TWILIO_TOKEN=c7...
TWILIO_WHATSAPP_FROM=whatsapp:+14...
```

# Chat Messages
Go to http://localhost:8080/ and you will find a chat module that was implemented using socket.io
![chat](/chat.JPG "Chat Messages")

# Configuration
Go to http://localhost:8080/api/info and you will find an html implemented using EJS that shows the current configuration of the server

![configuration](/configuration.JPG "configuration")
