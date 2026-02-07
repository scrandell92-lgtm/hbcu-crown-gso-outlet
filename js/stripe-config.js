/* =============================================
   HBCU Crown GSO Outlet - Stripe Configuration

   HOW TO SET UP:
   1. Go to your Stripe Dashboard > Payment Links
   2. Create a payment link for each product + size
   3. Copy each payment link URL and paste it below
   4. Replace 'YOUR_PUBLISHABLE_KEY' with your actual key
      from Stripe Dashboard > Developers > API Keys

   FORMAT: 'PRODUCT-ID__SIZE': 'https://buy.stripe.com/xxxxx'
   ============================================= */

const STRIPE_CONFIG = {
  // Replace with your Stripe Publishable Key
  publishableKey: 'pk_test_YOUR_KEY_HERE',

  // Payment links for each product + size combination
  // Create these in Stripe Dashboard > Payment Links
  paymentLinks: {
    // ---- Blue Jacket ($125) ----
    'NCAT-JACKET-BLUE__XS':  '',
    'NCAT-JACKET-BLUE__S':   '',
    'NCAT-JACKET-BLUE__M':   '',
    'NCAT-JACKET-BLUE__L':   '',
    'NCAT-JACKET-BLUE__XL':  '',
    'NCAT-JACKET-BLUE__2XL': '',

    // ---- Black Jacket ($125) ----
    'NCAT-JACKET-BLACK__XS':  '',
    'NCAT-JACKET-BLACK__S':   '',
    'NCAT-JACKET-BLACK__M':   '',
    'NCAT-JACKET-BLACK__L':   '',
    'NCAT-JACKET-BLACK__XL':  '',
    'NCAT-JACKET-BLACK__2XL': '',

    // ---- Grey Jacket ($125) ----
    'NCAT-JACKET-GREY__XS':  '',
    'NCAT-JACKET-GREY__S':   '',
    'NCAT-JACKET-GREY__M':   '',
    'NCAT-JACKET-GREY__L':   '',
    'NCAT-JACKET-GREY__XL':  '',
    'NCAT-JACKET-GREY__2XL': '',

    // ---- Camouflage Jacket ($125) ----
    'NCAT-JACKET-CAMO__XS':  '',
    'NCAT-JACKET-CAMO__S':   '',
    'NCAT-JACKET-CAMO__M':   '',
    'NCAT-JACKET-CAMO__L':   '',
    'NCAT-JACKET-CAMO__XL':  '',
    'NCAT-JACKET-CAMO__2XL': '',

    // ---- Light Lemon Jacket ($125) ----
    'NCAT-JACKET-LEMON__XS':  '',
    'NCAT-JACKET-LEMON__S':   '',
    'NCAT-JACKET-LEMON__M':   '',
    'NCAT-JACKET-LEMON__L':   '',
    'NCAT-JACKET-LEMON__XL':  '',
    'NCAT-JACKET-LEMON__2XL': '',

    // ---- Black Sweatpants ($80) ----
    'NCAT-SWEATS-001__XS':  '',
    'NCAT-SWEATS-001__S':   '',
    'NCAT-SWEATS-001__M':   '',
    'NCAT-SWEATS-001__L':   '',
    'NCAT-SWEATS-001__XL':  '',
    'NCAT-SWEATS-001__2XL': '',

    // ---- Cropped Shorts ($30) ----
    'NCAT-SHORTS-001__XS':  '',
    'NCAT-SHORTS-001__S':   '',
    'NCAT-SHORTS-001__M':   '',
    'NCAT-SHORTS-001__L':   '',
    'NCAT-SHORTS-001__XL':  '',
    'NCAT-SHORTS-001__2XL': '',

    // ---- Rugby Polo ($80) ----
    'NCAT-POLO-001__XS':  '',
    'NCAT-POLO-001__S':   '',
    'NCAT-POLO-001__M':   '',
    'NCAT-POLO-001__L':   '',
    'NCAT-POLO-001__XL':  '',
    'NCAT-POLO-001__2XL': '',

    // ---- Blue Shorts ($80) ----
    'NCAT-SHORTS-BLUE__XS':  '',
    'NCAT-SHORTS-BLUE__S':   '',
    'NCAT-SHORTS-BLUE__M':   '',
    'NCAT-SHORTS-BLUE__L':   '',
    'NCAT-SHORTS-BLUE__XL':  '',
    'NCAT-SHORTS-BLUE__2XL': '',

    // ---- White Shorts ($80) ----
    'NCAT-SHORTS-WHITE__XS':  '',
    'NCAT-SHORTS-WHITE__S':   '',
    'NCAT-SHORTS-WHITE__M':   '',
    'NCAT-SHORTS-WHITE__L':   '',
    'NCAT-SHORTS-WHITE__XL':  '',
    'NCAT-SHORTS-WHITE__2XL': '',
  }
};
