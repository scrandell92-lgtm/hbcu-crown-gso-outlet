/* =============================================
   HBCU Crown GSO Outlet - EmailJS Configuration

   To enable email notifications:
   1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
   2. Add an Email Service (Gmail) and note the Service ID
   3. Create two Email Templates:
      - Newsletter template (receives subscriber_email, to_email)
      - Contact template (receives from_name, from_email, phone, message, to_email)
   4. Copy your Public Key from Account > General
   5. Fill in the values below
   ============================================= */

var EMAILJS_CONFIG = {
  publicKey: '',              // Your EmailJS public key
  serviceId: '',              // Your EmailJS service ID (e.g., 'service_xxxxxxx')
  newsletterTemplateId: '',   // Template ID for VIP/newsletter subscriptions
  contactTemplateId: ''       // Template ID for contact form messages
};

// Initialize EmailJS when config is set
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey) {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
