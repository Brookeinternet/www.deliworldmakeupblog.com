const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_pk_live_51RXVHEDUGtG6RSaQSRA3mNRjmKDpm3uaS5yqLGQaioQAF4h46xtK8iZAicPPSazyONwHec6nYXpc7QsXRM4KEedu00taF9cnOX'); // Replace with your Stripe secret key

const app = express();
app.use(cors());
app.use(express.json());

// Create a Stripe Checkout Session for the VIP plan
app.post('/create-basic-checkout-session', async (req, res) => {
  // Optionally, get user info from req.body (email, uid) if you want to track users
  // const { email, uid } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: 'price_prod_ST0JYBPCoJ6np4', // Replace with your actual Stripe Price ID for VIP plan
          quantity: 1
        }
      ],
      // customer_email: email, // Uncomment if you wish to pass user's email
      // metadata: { firebaseUID: uid }, // Uncomment if you use Firebase UID
      success_url: 'https://www.deliworldmakeupandbeautyblog.com/success.html',
      cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// (Optional) Stripe Webhook endpoint for marking users VIP after payment
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const endpointSecret = 'whsec__pKuu7CbQfHmhA5KIDZHUNP6e43NT5jzV'; // Replace with your Stripe webhook secret
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Here, mark the user as VIP in your database using session.customer_email or session.metadata.firebaseUID
    // Example: updateUserToVIP(session.customer_email);
    console.log('VIP payment completed for:', session.customer_email || session.metadata);
  }

  response.json({received: true});
});

app.listen(4242, () => console.log('VIP backend running on port 4242'));
