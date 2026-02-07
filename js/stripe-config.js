/* =============================================
   HBCU Crown GSO Outlet - Stripe Configuration

   HOW TO SET UP:
   1. Create a Stripe account at https://stripe.com
   2. Go to Stripe Dashboard > Developers > API Keys
   3. Copy your Publishable Key and paste it below
   4. In Stripe Dashboard, create Products matching each item below
   5. Copy each product's Price ID and paste it next to the matching SKU
   ============================================= */

const STRIPE_CONFIG = {
  // Replace with your Stripe Publishable Key
  publishableKey: 'pk_test_YOUR_KEY_HERE',

  // Map each product SKU to its Stripe Price ID
  // Create these products in your Stripe Dashboard first
  priceIds: {
    'NCAT-JACKET-001': 'price_XXXXX',   // NC A&T Aggies Varsity Jacket - $149.99
    'NCAT-TEE-001':    'price_XXXXX',   // NC A&T Aggies Classic Tee - $34.99
    'NCAT-CREW-001':   'price_XXXXX',   // NC A&T Aggies Crewneck - $64.99
    'NCAT-HOOD-001':   'price_XXXXX',   // NC A&T Aggies Hoodie - $79.99
    'NCAT-HAT-001':    'price_XXXXX',   // NC A&T Aggies Dad Hat - $29.99
    'NCAT-JOG-001':    'price_XXXXX',   // NC A&T Aggies Joggers - $69.99
  }
};
