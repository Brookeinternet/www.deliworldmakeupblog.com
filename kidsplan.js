const functions = require('firebase-functions');

exports.createKidsPlanCheckoutSession = functions.https.onRequest((request, response) => {
  // Set CORS headers
  // You can set it to '*' for development, but for production,
  // it's best to specify the exact origins that should be allowed.
  response.set('Access-Control-Allow-Origin', 'https://brookeinternet.github.io'); // Or your specific domain
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Or the methods you allow
  response.set('Access-Control-Allow-Headers', 'Content-Type'); // Or the headers you allow

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  // Your actual Cloud Function logic goes here
  // ...
  // For example:
  // response.send('Hello from Firebase!');
});
const functions = require('firebase-functions');
const applyCors = require('../helpers/cors'); // Assuming you have a CORS helper

exports.createKidsPlanCheckoutSession = functions.https.onRequest((request, response) => {
  // Apply CORS headers
  applyCors(request, response);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  // Your actual function logic here
  console.log("Received request for createKidsPlanCheckoutSession");
  // ... (e.g., interact with Stripe, create a checkout session)
  response.status(200).send("Kids Plan checkout session created (from separate file)");
});
function applyCors(request, response) {
  response.set('Access-Control-Allow-Origin', 'https://brookeinternet.github.io');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type'); // Add any other required headers
}

module.exports = applyCors;
