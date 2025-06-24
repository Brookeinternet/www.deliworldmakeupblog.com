const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_yourSecretKey'); // Replace with your Stripe secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-basic-checkout-session', async (req, res) => {
  // You could get email or uid from req.body if using Firebase
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: 'price_12345', // Replace with your Stripe Price ID for Basic plan
        quantity: 1
      }
    ],
    success_url: 'https://www.deliworldmakeupandbeautyblog.com/success.html',
    cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Server running on port 4242'));