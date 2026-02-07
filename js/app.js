/* =============================================
   HBCU Crown GSO Outlet - App Bootstrap
   Shared initialization for all pages
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  initHeader();
  initFooter();
  initCartDrawer();
  initTermsModal();
  updateCartBadge();

  // Listen for cart changes to update badge
  CartStore.onChange(function () {
    updateCartBadge();
  });

  // Check for Stripe checkout success
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('checkout') === 'success') {
    CartStore.clear();
    showToast('Order placed successfully! Thank you for your purchase.');
    window.history.replaceState({}, '', window.location.pathname);
  }
});

/* ---- Header ---- */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Announcement bar
  const announcementBar = document.createElement('div');
  announcementBar.className = 'announcement-bar';
  announcementBar.innerHTML = '<p>Silk Infused HBCU Apparel &bull; Protect Your Crown &bull; Free Shipping on Orders $150+</p>';

  // Nav
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  nav.innerHTML = `
    <div class="nav-inner container">
      <a href="index.html" class="nav-logo">HBCU Crown GSO Outlet</a>
      <ul class="nav-links" id="nav-links">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="catalog.html" class="nav-link">Catalog</a></li>
        <li><a href="gallery.html" class="nav-link">Gallery</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button class="cart-toggle" id="cart-toggle" aria-label="Open cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-badge" id="cart-badge">0</span>
        </button>
        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `;

  header.appendChild(announcementBar);
  header.appendChild(nav);

  // Mark active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = nav.querySelectorAll('.nav-link');
  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Cart toggle
  document.getElementById('cart-toggle').addEventListener('click', function () {
    openCartDrawer();
  });
}

/* ---- Footer ---- */
function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>Contact</h4>
            <div class="footer-contact-info">
              <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> hbcucrowngsooutlet@gmail.com</p>
              <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> (813) 509-0780</p>
            </div>
          </div>
          <div class="footer-col">
            <h4>Policies</h4>
            <ul class="footer-links">
              <li><a href="#" class="terms-trigger">Terms & Conditions</a></li>
              <li><a href="#" class="shipping-trigger">Shipping Policy</a></li>
              <li><a href="#" class="return-trigger">Return Policy</a></li>
              <li><a href="#" class="privacy-trigger">Privacy Policy</a></li>
              <li><a href="#" class="fraud-trigger">Fraud Prevention</a></li>
              <li><a href="#" class="chargeback-trigger">Chargeback &amp; Dispute Policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Follow Us</h4>
            <ul class="footer-links">
              <li><a href="#" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Join the Family</h4>
            <p>SUBSCRIBE FOR EXCLUSIVE DROPS & VIP ACCESS</p>
            <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
              <div class="newsletter-input-wrap">
                <input type="email" placeholder="Your email" required aria-label="Email address">
                <button type="submit" aria-label="Subscribe">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <div class="footer-logo">
          <img src="public/images/products/crown_gso.webp" alt="GSO Outlet" class="footer-logo-img">
        </div>
        <p>&copy; ${new Date().getFullYear()} HBCU Crown GSO Outlet. All rights reserved.</p>
        <div class="payment-icons">
          <span class="payment-icon">Visa</span>
          <span class="payment-icon">MC</span>
          <span class="payment-icon">Amex</span>
          <span class="payment-icon">Apple Pay</span>
        </div>
      </div>
    </div>
  `;
}

/* ---- Cart Drawer ---- */
function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  drawer.innerHTML = `
    <div class="cart-drawer-backdrop" id="cart-backdrop"></div>
    <div class="cart-drawer-panel">
      <div class="cart-drawer-header">
        <h3>Your Cart</h3>
        <button class="cart-drawer-close" id="cart-drawer-close" aria-label="Close cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="cart-drawer-items" id="cart-drawer-items"></div>
      <div class="cart-drawer-footer" id="cart-drawer-footer">
        <div class="cart-subtotal">
          <span>Subtotal</span>
          <span id="cart-subtotal-amount">$0.00</span>
        </div>
        <p class="cart-tax-note">Taxes and shipping calculated at checkout</p>
        <div class="checkout-agreement">
          <label class="checkout-agreement-label">
            <input type="checkbox" id="checkout-agree" class="checkout-agree-checkbox">
            <span>I agree to the <a href="#" class="terms-trigger">Terms &amp; Conditions</a>, <a href="#" class="shipping-trigger">Shipping Policy</a>, <a href="#" class="return-trigger">Return Policy</a>, and <a href="#" class="chargeback-trigger">Chargeback Policy</a>. I confirm this purchase is authorized and understand that filing a fraudulent chargeback may result in account suspension and collection action.</span>
          </label>
        </div>
        <button class="btn btn-primary btn-lg cart-checkout-btn" id="cart-checkout-btn" onclick="handleCheckout()" disabled>
          Checkout
        </button>
      </div>
    </div>
  `;

  document.getElementById('cart-backdrop').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);

  // Checkout agreement checkbox
  var agreeCheckbox = document.getElementById('checkout-agree');
  var checkoutBtn = document.getElementById('cart-checkout-btn');
  if (agreeCheckbox && checkoutBtn) {
    agreeCheckbox.addEventListener('change', function () {
      checkoutBtn.disabled = !agreeCheckbox.checked;
    });
  }

  // Update drawer when cart changes
  CartStore.onChange(renderCartDrawer);
  renderCartDrawer();
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('open');
    document.body.classList.add('no-scroll');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const footer = document.getElementById('cart-drawer-footer');
  if (!container) return;

  const items = CartStore.getItems();

  if (items.length === 0) {
    container.innerHTML = '<div class="cart-empty"><p>Your cart is empty</p><a href="catalog.html" class="btn btn-outline">Continue Shopping</a></div>';
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = items.map(function (item) {
    return `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item-image">
          <div class="cart-item-placeholder">${item.name.charAt(0)}</div>
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-variant">${item.size} / ${item.color}</p>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQty('${item.key}', ${item.quantity - 1})">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.key}', ${item.quantity + 1})">+</button>
            </div>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem('${item.key}')" aria-label="Remove item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;
  }).join('');

  document.getElementById('cart-subtotal-amount').textContent = '$' + CartStore.getTotal().toFixed(2);
}

function updateCartQty(key, qty) {
  CartStore.updateQuantity(key, qty);
}

function removeCartItem(key) {
  CartStore.removeItem(key);
}

/* ---- Cart Badge ---- */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = CartStore.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

/* ---- Policy Modals ---- */
function initTermsModal() {
  var policies = [
    {
      id: 'terms-modal',
      trigger: 'terms-trigger',
      title: 'Terms & Conditions',
      body: '<h3>1. General</h3><p>Welcome to HBCU Crown GSO Outlet. By accessing or using our website and purchasing our products, you agree to be bound by these Terms & Conditions.</p><h3>2. Products & Orders</h3><p>All products are subject to availability. We reserve the right to limit quantities, refuse orders, or cancel orders at our discretion. Prices are in USD and subject to change. Product images are for illustration purposes; actual colors may vary slightly.</p><h3>3. Payment</h3><p>We accept major credit cards and other payment methods as displayed at checkout. Payment is processed securely through Stripe. All transactions are in US Dollars.</p><h3>4. Shipping & Delivery</h3><p>All inventory is on hand and will ship in 3-5 business days unless otherwise noted. Shipping costs are calculated at checkout based on your location.</p><h3>5. Returns & Exchanges</h3><p>If you are not satisfied, please contact us within 14 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Return shipping is the customer\'s responsibility unless the item is defective.</p><h3>6. Intellectual Property</h3><p>All content on this website is the property of HBCU Crown GSO Outlet and is protected by copyright and trademark laws.</p><h3>7. Limitation of Liability</h3><p>HBCU Crown GSO Outlet shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the product in question.</p><h3>8. Contact</h3><p>Questions? Contact us at hbcucrowngsooutlet@gmail.com or (813) 509-0780.</p>'
    },
    {
      id: 'shipping-modal',
      trigger: 'shipping-trigger',
      title: 'Shipping Policy',
      body: '<h3>Order Processing</h3><p>All orders placed through HBCU Crown GSO Outlet are processed within <strong>1&ndash;3 business days</strong> (Monday&ndash;Friday, excluding holidays) after payment is confirmed. During high-demand periods such as homecoming season, product launches, or holidays, processing may take up to 5 business days. You will receive a confirmation email once your order is placed and a second email containing your tracking number once your package ships.</p>' +
        '<h3>Shipping Rates &amp; Methods</h3>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><tr style="border-bottom:1px solid #ddd;"><th style="text-align:left;padding:8px;">Method</th><th style="text-align:left;padding:8px;">Estimated Delivery</th><th style="text-align:left;padding:8px;">Cost</th></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:8px;">Standard Shipping</td><td style="padding:8px;">5&ndash;7 business days</td><td style="padding:8px;">$5.99</td></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:8px;">Expedited Shipping</td><td style="padding:8px;">2&ndash;3 business days</td><td style="padding:8px;">$12.99</td></tr>' +
        '<tr><td style="padding:8px;"><strong>Free Shipping</strong></td><td style="padding:8px;">5&ndash;7 business days</td><td style="padding:8px;">Orders over $150</td></tr></table>' +
        '<p>All delivery estimates begin <em>after</em> your order has been processed and shipped. Delivery dates are estimates and not guarantees.</p>' +
        '<h3>Shipping Carriers</h3><p>We ship through USPS, UPS, and FedEx depending on your location and selected shipping method. The carrier is determined at the time of fulfillment to ensure the fastest and most reliable delivery.</p>' +
        '<h3>Order Tracking</h3><p>Once your order ships, a tracking number will be emailed to the address provided at checkout. Please allow up to 24 hours for tracking information to update in the carrier\'s system. It is the customer\'s responsibility to monitor their tracking and ensure someone is available to receive the package.</p>' +
        '<h3>Shipping Destinations</h3><p>We currently ship to all 50 U.S. states and U.S. territories. International shipping is not available at this time. Orders can only be shipped to the address provided at checkout. Please double-check your shipping address before completing your purchase&mdash;we are not responsible for packages delivered to incorrect addresses provided by the customer.</p>' +
        '<h3>Delivery Issues</h3><p><strong>Lost Packages:</strong> If your tracking shows "delivered" but you have not received your package, please check with neighbors, your building manager, or contact the carrier directly. If the package cannot be located, contact us within <strong>7 days</strong> of the delivery date at hbcucrowngsooutlet@gmail.com. We will open an investigation with the carrier. HBCU Crown GSO Outlet is not responsible for packages marked as delivered by the carrier.</p>' +
        '<p><strong>Damaged Items:</strong> If your order arrives damaged, please email us at hbcucrowngsooutlet@gmail.com within <strong>48 hours</strong> of delivery with photos of the damaged item(s) and packaging. We will arrange a replacement or refund at our discretion.</p>' +
        '<p><strong>Incorrect Address:</strong> If a package is returned to us due to an incorrect or incomplete address provided by the customer, the customer is responsible for re-shipping costs.</p>' +
        '<h3>Shipping Delays</h3><p>HBCU Crown GSO Outlet is not responsible for delays caused by shipping carriers, severe weather, natural disasters, or other circumstances beyond our control. During peak seasons, carrier delays are common and are outside of our control.</p>' +
        '<h3>Signature Confirmation</h3><p>Orders over $200 may require signature confirmation upon delivery for added security. The carrier will make multiple delivery attempts before the package is returned.</p>' +
        '<h3>P.O. Boxes &amp; APO/FPO</h3><p>We ship to P.O. Boxes and military APO/FPO addresses via USPS. Expedited shipping is not available for these addresses.</p>' +
        '<h3>Contact Us</h3><p>For any shipping-related questions, email us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or call <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'return-modal',
      trigger: 'return-trigger',
      title: 'Return Policy',
      body: '<h3>Return Eligibility</h3><p>We accept returns within 14 days of delivery. To be eligible for a return, items must be:</p><ul><li>Unworn, unwashed, and unaltered</li><li>In original condition with all tags attached</li><li>In original packaging (if applicable)</li></ul><h3>Non-Returnable Items</h3><p>The following items are final sale and cannot be returned:</p><ul><li>Items marked as "Final Sale" or "Clearance"</li><li>Gift cards</li><li>Items that have been worn, washed, or altered</li></ul><h3>How to Initiate a Return</h3><p>To start a return, email us at hbcucrowngsooutlet@gmail.com with your order number and reason for return. We will provide you with return instructions and a return authorization number.</p><h3>Return Shipping</h3><p>Return shipping costs are the responsibility of the customer unless the item is defective or we made an error. We recommend using a trackable shipping method.</p><h3>Refunds</h3><p>Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds are issued to the original payment method. Please allow additional time for your bank to process the refund.</p><h3>Exchanges</h3><p>We currently do not offer direct exchanges. To get a different size or color, please return the original item and place a new order.</p>'
    },
    {
      id: 'privacy-modal',
      trigger: 'privacy-trigger',
      title: 'Privacy Policy',
      body: '<h3>Information We Collect</h3><p>We collect information you provide directly, including your name, email address, shipping address, and payment information when you make a purchase or subscribe to our newsletter.</p><h3>How We Use Your Information</h3><p>We use your information to:</p><ul><li>Process and fulfill your orders</li><li>Send order confirmations and shipping updates</li><li>Send promotional emails and newsletters (with your consent)</li><li>Improve our website and customer experience</li><li>Respond to your inquiries and support requests</li></ul><h3>Information Sharing</h3><p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments (Stripe), and delivering orders.</p><h3>Email Communications</h3><p>If you subscribe to our VIP list or newsletter, you will receive promotional emails. You can unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us.</p><h3>Data Security</h3><p>We implement industry-standard security measures to protect your personal information. Payment processing is handled securely by Stripe and we do not store your credit card information on our servers.</p><h3>Cookies</h3><p>Our website may use cookies to enhance your browsing experience and remember your cart contents. You can disable cookies in your browser settings.</p><h3>Contact</h3><p>If you have questions about this Privacy Policy, contact us at hbcucrowngsooutlet@gmail.com or (813) 509-0780.</p>'
    },
    {
      id: 'fraud-modal',
      trigger: 'fraud-trigger',
      title: 'Fraud Prevention Policy',
      body: '<h3>Our Commitment to Security</h3><p>HBCU Crown GSO Outlet is committed to providing a safe and secure shopping experience for every customer. We take fraud seriously and have implemented comprehensive measures to protect both our customers and our business from unauthorized or fraudulent transactions.</p>' +
        '<h3>Payment Verification</h3><p>All payments are processed securely through <strong>Stripe</strong>, a PCI-DSS Level 1 certified payment processor. We do not store, process, or have access to your full credit card numbers on our servers. To protect against unauthorized use, we may verify orders using the following methods:</p><ul><li>Billing address verification (AVS &mdash; Address Verification System)</li><li>Card verification value (CVV/CVC) matching</li><li>3D Secure authentication when supported by your bank</li><li>IP address and geolocation analysis</li><li>Order pattern analysis for unusual purchasing behavior</li></ul>' +
        '<h3>Order Review &amp; Verification</h3><p>HBCU Crown GSO Outlet reserves the right to review, delay, or cancel any order that triggers our fraud detection criteria. Orders may be flagged for review if:</p><ul><li>The billing address does not match the address on file with the card issuer</li><li>The shipping address differs significantly from the billing address</li><li>Multiple orders are placed in quick succession using different payment methods</li><li>Unusually large or high-volume orders are placed</li><li>The order is placed from a high-risk IP address or using a VPN/proxy</li><li>The provided email address or phone number cannot be verified</li></ul>' +
        '<p>If your order is flagged, we may contact you at the email address or phone number provided to verify your identity before processing. Orders that cannot be verified will be cancelled and refunded.</p>' +
        '<h3>Customer Identity Verification</h3><p>In some cases, we may request additional verification before shipping an order, including but not limited to:</p><ul><li>A photo of the front of the credit or debit card used (last 4 digits visible only)</li><li>A government-issued photo ID matching the billing name</li><li>Phone verification via the number on file</li></ul><p>Failure to provide requested verification within 48 hours may result in order cancellation.</p>' +
        '<h3>Unauthorized Transactions</h3><p>If you believe a purchase was made on your card without your authorization, please:</p><ol><li>Contact your card issuer or bank immediately to report the unauthorized charge</li><li>Contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a> so we can investigate and cancel the order if it has not yet shipped</li></ol>' +
        '<h3>Fraudulent Chargebacks</h3><p>Filing a chargeback or payment dispute for a legitimate purchase that was authorized, received, and not returned through our official return process constitutes <strong>friendly fraud</strong> and may result in:</p><ul><li>Permanent account suspension from HBCU Crown GSO Outlet</li><li>Submission of transaction evidence to the payment processor and card network</li><li>Referral to collections for recovery of the disputed amount plus administrative fees</li><li>Reporting to fraud prevention databases</li></ul>' +
        '<h3>Record Keeping</h3><p>For fraud prevention purposes, we maintain records of all transactions including:</p><ul><li>Order confirmations and receipts</li><li>Shipping confirmations with tracking numbers and delivery proof</li><li>Customer communications and correspondence</li><li>IP addresses and device information at time of purchase</li><li>AVS and CVV verification results</li></ul><p>These records are retained for a minimum of 2 years and may be used as evidence in the event of a disputed charge.</p>' +
        '<h3>Refund Policy for Suspected Fraud</h3><p>If we determine that an order was placed fraudulently, we will cancel the order and issue a full refund to the original payment method. If the order has already shipped, we will work with the carrier to intercept the package.</p>' +
        '<h3>Contact Us</h3><p>If you have questions about our fraud prevention practices or need to report suspicious activity, contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'chargeback-modal',
      trigger: 'chargeback-trigger',
      title: 'Chargeback &amp; Dispute Policy',
      body: '<h3>Dispute Resolution &mdash; Contact Us First</h3><p>At HBCU Crown GSO Outlet, we believe most issues can be resolved quickly and fairly through direct communication. <strong>Before filing a chargeback or dispute with your bank or card issuer, we strongly encourage you to contact us first.</strong> We are committed to resolving any concern&mdash;whether it involves product quality, shipping, sizing, or billing.</p>' +
        '<p>Contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a> and we will respond within 1&ndash;2 business days.</p>' +
        '<h3>What Is a Chargeback?</h3><p>A chargeback occurs when a cardholder contacts their bank or card issuer to dispute a charge. While chargebacks are designed to protect consumers from unauthorized transactions, they are sometimes filed in error or for issues that could have been resolved directly with the merchant.</p>' +
        '<h3>Our Chargeback Response Process</h3><p>When a chargeback is filed against HBCU Crown GSO Outlet, we will respond with comprehensive evidence, which may include:</p><ul><li><strong>Transaction records:</strong> Order confirmation, payment authorization, AVS/CVV verification results</li><li><strong>Proof of delivery:</strong> Carrier tracking information, delivery confirmation, and signature confirmation (if applicable)</li><li><strong>Shipping documentation:</strong> Shipping label details, carrier scans, and estimated vs. actual delivery dates</li><li><strong>Customer communication:</strong> Email correspondence, order notifications, and any prior contact regarding the order</li><li><strong>Product description accuracy:</strong> Product listing details, images, and size charts provided at time of purchase</li><li><strong>Policy acceptance:</strong> Record that the customer agreed to our Terms &amp; Conditions, Shipping Policy, and Return Policy at checkout</li><li><strong>Device and session data:</strong> IP address, browser information, and geolocation data from the time of purchase</li></ul>' +
        '<h3>Friendly Fraud</h3><p>"Friendly fraud" occurs when a customer files a chargeback for a legitimate order they authorized and received rather than following the merchant\'s return policy. Examples include:</p><ul><li>Claiming a charge is unauthorized when the cardholder made the purchase</li><li>Stating an item was not received when tracking confirms delivery</li><li>Disputing a charge for buyer\'s remorse without attempting a return</li><li>Filing a chargeback after wearing or using the product</li></ul>' +
        '<p>HBCU Crown GSO Outlet vigorously contests all cases of friendly fraud. We maintain detailed records of every transaction and will submit all available evidence to the card issuer.</p>' +
        '<h3>Consequences of Fraudulent Chargebacks</h3><p>Customers who file fraudulent or unwarranted chargebacks may be subject to:</p><ul><li>Permanent ban from purchasing on our website</li><li>Recovery of the disputed amount plus all associated chargeback fees (typically $15&ndash;$25 per dispute)</li><li>Referral to a third-party collections agency</li><li>Reporting to fraud prevention networks and databases</li><li>Legal action in cases involving repeated or high-value fraudulent disputes</li></ul>' +
        '<h3>Valid Reasons to Dispute a Charge</h3><p>We acknowledge that there are legitimate reasons to file a dispute, including:</p><ul><li>A charge you truly did not authorize (stolen card)</li><li>Being charged an incorrect amount</li><li>Being charged multiple times for a single order</li></ul><p>In these cases, we will work with you and your bank to resolve the matter promptly.</p>' +
        '<h3>Checkout Agreement</h3><p>By completing a purchase on HBCU Crown GSO Outlet, customers acknowledge and agree to our Terms &amp; Conditions, Shipping Policy, Return Policy, and this Chargeback &amp; Dispute Policy. This agreement is recorded at the time of checkout and serves as evidence in the event of a dispute.</p>' +
        '<h3>Contact Us</h3><p>We want to resolve your concerns directly. Please reach out before filing a dispute:</p><ul><li>Email: <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a></li><li>Phone: <a href="tel:8135090780">(813) 509-0780</a></li><li>Response time: 1&ndash;2 business days</li></ul>'
    }
  ];

  policies.forEach(function (policy) {
    var modal = document.createElement('div');
    modal.id = policy.id;
    modal.className = 'modal-overlay';
    modal.innerHTML = '<div class="modal-content modal-lg"><div class="modal-header"><h2>' + policy.title + '</h2><button class="modal-close" aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="modal-body">' + policy.body + '</div></div>';
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', function () {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Delegate clicks for all policy triggers
  document.addEventListener('click', function (e) {
    policies.forEach(function (policy) {
      if (e.target.classList.contains(policy.trigger)) {
        e.preventDefault();
        var modal = document.getElementById(policy.id);
        if (modal) {
          modal.classList.add('open');
          document.body.classList.add('no-scroll');
        }
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
        m.classList.remove('open');
      });
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ---- Checkout (Stripe) ---- */
function handleCheckout() {
  const items = CartStore.getItems();
  if (items.length === 0) return;

  // Verify checkout agreement
  var agreeCheckbox = document.getElementById('checkout-agree');
  if (!agreeCheckbox || !agreeCheckbox.checked) {
    showToast('Please agree to our Terms & Conditions and policies before checking out.');
    return;
  }

  // Check if Stripe is configured
  if (typeof STRIPE_CONFIG !== 'undefined' && STRIPE_CONFIG.publishableKey && !STRIPE_CONFIG.publishableKey.includes('YOUR_KEY')) {
    // Stripe is configured - redirect to checkout
    const stripe = Stripe(STRIPE_CONFIG.publishableKey);
    const lineItems = items.map(function (item) {
      const priceId = STRIPE_CONFIG.priceIds[item.productId];
      return { price: priceId, quantity: item.quantity };
    }).filter(function (item) { return item.price; });

    if (lineItems.length > 0) {
      stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'index.html?checkout=success',
        cancelUrl: window.location.href,
      });
    } else {
      showToast('Some products are not yet configured for checkout. Please contact us to complete your order.');
    }
  } else {
    showToast('Checkout is being set up. Please contact us directly to place your order!');
  }
}

/* ---- Newsletter / VIP Subscribe ---- */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (!email) return;

  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;

  // Send via EmailJS if configured
  if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.serviceId) {
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.newsletterTemplateId, {
      subscriber_email: email,
      to_email: 'hbcucrowngsooutlet@gmail.com'
    }).then(function () {
      showToast('Thank you for subscribing! Welcome to the family.');
      e.target.reset();
      if (btn) btn.disabled = false;
    }, function () {
      // Fallback to mailto
      sendNewsletterFallback(email);
      if (btn) btn.disabled = false;
    });
  } else {
    sendNewsletterFallback(email);
    if (btn) btn.disabled = false;
  }
}

function sendNewsletterFallback(email) {
  // Send notification via mailto as fallback
  var subject = encodeURIComponent('New VIP Subscriber - HBCU Crown GSO Outlet');
  var body = encodeURIComponent('New VIP subscriber email: ' + email);
  window.open('mailto:hbcucrowngsooutlet@gmail.com?subject=' + subject + '&body=' + body, '_blank');
  showToast('Thank you for subscribing! Welcome to the family.');
}

/* ---- Toast Notifications ---- */
function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('show');
  });

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 3500);
}
