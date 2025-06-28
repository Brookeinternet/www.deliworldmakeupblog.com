// This code should be deployed to your Render.com service: https://www-deliworldmakeupandbeautyblog-com.onrender.com

const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const stripe = require('stripe')('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'); // IMPORTANT: Replace with your actual sk_test_ or sk_live_ key

const app = express();

// 1. Enable CORS: This is crucial for cross-origin requests from your frontend.
// For development/testing, you can allow all origins:
app.use(cors());
// For production, you should restrict it to your specific frontend domain(s) for security:
/*
app.use(cors({
    origin: 'https://YOUR_CANVAS_FRONTEND_DOMAIN', // Replace with the actual domain of your Canvas app
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
}));
*/

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic Plan Checkout Session Endpoint
// This endpoint corresponds to the base URL of your Render service.
app.post('/', async (req, res) => {
  // The frontend sends uid and email in the request body
  const { uid, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          // Updated with the provided Stripe Price ID for Basic plan
          price: 'price_prod_ST0DRJeaBnXYct',
          quantity: 1
        }
      ],
      // URLs for success and cancellation after Stripe Checkout
      success_url: 'https://www.deliworldmakeupandbeautyblog.com/success.html',
      cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
      
      // Pass customer email and client reference ID (user ID) to Stripe
      customer_email: email, // Stripe will pre-fill this on the checkout page
      client_reference_id: uid, // Link Stripe session to your internal user ID
    });
    
    // Send the Stripe Session ID back to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session (Basic Plan):", error);
    // Send a 500 status with an error message in JSON format
    res.status(500).json({ error: error.message });
  }
});

// (Optional) Stripe Webhook Endpoint
// This endpoint receives notifications from Stripe about payment events.
app.post('/webhooks/stripe', express.raw({type: 'application/json'}), (request, response) => {
  // Updated with the provided Stripe Webhook Secret
  const endpointSecret = 'whsec_cSMxzKisOufbbLKtAewYE0CCg8pkqZ1b'; 
  const sig = request.headers['stripe-signature'];

  let event;
  try {
    // Construct the Stripe event for verification
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific Stripe events
  if ( event.type === 'checkout.session.completed' ) {
    const session = event.data.object;
    // Log details of the completed basic payment
    console.log('Basic payment completed for:', session.customer_details ? session.customer_details.email : 'N/A', 'Client reference ID:', session.client_reference_id);
    
    // --- IMPORTANT: Update your Firebase/database here ---
    // You would typically use session.client_reference_id (your Firebase UID)
    // to update the user's subscription status in your database.
    // Example (conceptual, requires Firebase Admin SDK):
    // admin.firestore().collection('users').doc(session.client_reference_id).update({ isBasicSubscriber: true, subscriptionId: session.subscription });
    // ---
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Acknowledge receipt of the webhook event
  response.status(200).send('Webhook received.');
});

// Listen on the port provided by Render (process.env.PORT) or default to 3000 for local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Basic Plan Server running on port ${PORT}`));

