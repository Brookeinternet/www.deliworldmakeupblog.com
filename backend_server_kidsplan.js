// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Import and initialize CORS
admin.initializeApp();

const stripe = require('stripe')(functions.config().stripe.secret);
const KIDS_PLAN_PRICE_ID = 'price_1RgCZbDUGtG6RSaQYEbgcCxR';

exports.createKidsPlanCheckoutSession = functions.https.onCall(async (data, context) => {
    // Wrap the entire function logic in the CORS middleware
    return cors(data.req, data.res, async () => { // Note: for https.onCall, data.req and data.res are not standard,
                                                  // but the cors middleware is often used this way for consistency.
                                                  // The actual CORS handling for https.onCall is usually automatic.
                                                  // If this doesn't work, we might need to adjust the function type or Firebase project settings.

        if (!context.auth) {
            throw new functions.https.HttpsError(
                'unauthenticated',
                'Authentication required to create a checkout session.'
            );
        }

        const userId = context.auth.uid;
        const userEmail = context.auth.token.email;

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [
                    {
                        price: KIDS_PLAN_PRICE_ID,
                        quantity: 1,
                    },
                ],
                customer_email: userEmail,
                success_url: `${functions.config().app.base_url}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${functions.config().app.base_url}/cancel.html`,
                metadata: {
                    firebaseUid: userId,
                },
            });

            return { sessionId: session.id, url: session.url };

        } catch (error) {
            console.error('Error creating Stripe Checkout Session:', error);
            throw new functions.https.HttpsError(
                'internal',
                'Failed to create checkout session.',
                error.message
            );
        }
    });
});

// (Optional) Stripe Webhook Endpoint for Kids Plan
app.post('/webhooks/stripe', express.raw({type: 'application/json'}), (request, response) => {
  // IMPORTANT: Replaced with your actual Stripe Webhook Secret for this specific Kids Plan webhook
  const endpointSecret = 'whsec_NdcBQSV3VAipP8csc2mhx9CpKBFsyt4O';
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
    console.log('Kids Plan payment completed for:', session.customer_details ? session.customer_details.email : 'N/A', 'Client reference ID:', session.client_reference_id);
    // --- IMPORTANT: Update your Firebase/database here to mark as Kids subscriber ---
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send('Webhook received.');
});

// Listen on the port provided by Render environment
const PORT = process.env.PORT || 3000; // Use process.env.PORT on Render
app.listen(PORT, () => console.log(`Kids Plan Server running on port ${PORT}`));
