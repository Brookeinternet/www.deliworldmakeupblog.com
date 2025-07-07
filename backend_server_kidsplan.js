// functions/index.js (or a separate file imported into index.js)

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(); // Initialize Firebase Admin SDK

// Load Stripe secret key from Firebase Functions environment configuration
// Make sure you run: firebase functions:config:set stripe.secret="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'"
const stripe = require('stripe')(functions.config().stripe.secret);

// Define the Stripe Price ID for the Kids Plan (Premium Tier)
// This should match the Price ID you created in your Stripe Dashboard for this plan.
const KIDS_PLAN_PRICE_ID = 'price_1RgCZbDUGtG6RSaQYEbgcCxR'; // Replace with your actual Price ID

/**
 * Callable Cloud Function to create a Stripe Checkout Session for the Kids Plan.
 * This function is called from the client-side.
 *
 * @param {Object} data - Data passed from the client (e.g., plan details, quantity).
 * @param {Object} context - Firebase Cloud Functions context, including auth info.
 * @returns {Object} A JSON object containing the Stripe Checkout Session URL.
 */
exports.createKidsPlanCheckoutSession = functions.https.onCall(async (data, context) => {
    // 1. Authenticate the user
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Authentication required to create a checkout session.'
        );
    }

    const userId = context.auth.uid; // Get the authenticated user's ID
    const userEmail = context.auth.token.email; // Get the user's email from the auth token

    try {
        // 2. Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription', // Use 'subscription' mode for recurring payments
            line_items: [
                {
                    price: KIDS_PLAN_PRICE_ID, // The Price ID for your Kids Plan
                    quantity: 1,
                },
            ],
            // Customer creation or lookup:
            // If you're using the Firebase Stripe Extension, it often handles customer creation/linking.
            // If not, you might need to manually create or retrieve a Stripe customer here
            // and link it to the Firebase userId.
            // For simplicity, Stripe will create a new customer if one isn't provided,
            // and the webhook will link it back.
            customer_email: userEmail, // Pre-fill customer email for convenience

            // URLs to redirect to after successful payment or cancellation
            success_url:'https://www.deliworldmakeupandbeautyblog.com/success.html',
     cancel_url: 'https://www.deliworldmakeupandbeautyblog.com/cancel.html',
            // Optional: Add metadata to link the Stripe session back to your Firebase user
            metadata: {
                firebaseUid: userId,
            },
        });

        // 3. Return the session URL to the client
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
    // --- IMPORTANT: Update your Firebase/database here to mark as VIP subscriber ---
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send('Webhook received.');
});

// Listen on the port provided by Render environment
const PORT = process.env.PORT || 3000; // Use process.env.PORT on Render
app.listen(PORT, () => console.log(`Kids Plan Server running on port ${PORT}`));
