const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_sk_live_51RXVHEDUGtG6RSaQrm3VYfCxZdzeZXN7lHNC1R8bSIjnkxJ6MCot8mMEGJrbaHWxYsKQRgAmCR2NCwtumzdSlPaL00LjI85bDA'); // Replace with your Stripe secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post('fetch('https://www-deliworldmakeupandbeautyblog-com.onrender.com/create-basic-checkout-session')', async (req, res) => {
  // You could get email or uid from req.body if using Firebase
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: 'price_prod_ST0DRJeaBnXYct', // Replace with your Stripe Price ID for Basic plan
        quantity: 1
      }
    ],
    success_url: 'https://www.deliworldmakeupandbeautyblog.com/success.html',
    cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Server running on port 4242'));

// (Optional) Stripe Webhook endpoint for marking users  Basic after payment
app.post('/webhooks/stripe', express.raw({type: 'application/json'}), (request, response) => {
  const endpointSecret = 'whsec_cSMxzKisOufbbLKtAewYE0CCg8pkqZ1b'; // Replace with your Stripe webhook secret
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
 if ( event . type === 'checkout.session.completed' ) {
  const session = event . data . object ;
  console .log ( 'Basic payment completed for:' , session . customer_email || session . metadata ) ;
}

response . status ( 200 ) . send ( 'Webhook received.' ) ;
} ) ;

