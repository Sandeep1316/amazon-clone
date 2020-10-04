const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HX1k2GIaoGE1DgjKdleNTvhSMmM4GDJ7wQK6d8RpOpfVbMak0AfCLimtEMGzqAtykkiBFFxPnsBsFcyn2dzX4DJ00xCEvjnFW');
//API

//- App config
const app = express();

//- Middlewares
app.use(cors({origin : true}));
app.use(express.json());

//- API routes
app.get('/',(request, response) => response.status(200).send('helloworld'))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request recieved',total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "INR",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//- Listen command
exports.api= functions.https.onRequest(app)