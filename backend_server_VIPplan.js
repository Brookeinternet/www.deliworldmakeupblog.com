// This code should be deployed to your SECOND Render.com service: https://backend-server-vipplan-js.onrender.com

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('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'); // Replaced with your Stripe secret key

const app = express();
app.use(cors()); // Enable CORS for your frontend
app.use(express.json());

// VIP Plan Checkout Session Endpoint
// This endpoint corresponds to the base URL of this Render service.
app.post('/', async (req, res) => {
  const { uid, email } = req.body; // Get user ID and email from frontend

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          // Updated with the provided Stripe Price ID for the VIP plan
          price: 'price_prod_ST0JYBPCoJ6np4',
          quantity: 1
        }
      ],
      success_url: 'https://www.deliworldmakeupandbeautyblog.com/success.html',
      cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
      customer_email: email,
      client_reference_id: uid,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session (VIP Plan):", error);
    res.status(500).json({ error: error.message });
  }
});

// (Optional) Stripe Webhook Endpoint for VIP Plan
app.post('/webhooks/stripe', express.raw({type: 'application/json'}), (request, response) => {
  // IMPORTANT: Replaced with your actual Stripe Webhook Secret for this specific VIP webhook
  const endpointSecret = 'whsec_gB02pzHE0L1erLRDOs6g5XIUg3tTqoTT';
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if ( event.type === 'checkout.session.completed' ) {
    const session = event.data.object;
    console.log('VIP payment completed for:', session.customer_details ? session.customer_details.email : 'N/A', 'Client reference ID:', session.client_reference_id);
    // --- IMPORTANT: Update your Firebase/database here to mark as VIP subscriber ---
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send('Webhook received.');
});

// Listen on the port provided by Render environment
const PORT = process.env.PORT || 3000; // Use process.env.PORT on Render
app.listen(PORT, () => console.log(`VIP Plan Server running on port ${PORT}`));
