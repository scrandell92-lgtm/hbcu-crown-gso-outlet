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
  announcementBar.innerHTML = '<p>Silk Infused HBCU Apparel &bull; Protect Your Crown &bull; Local Pickup in Greensboro, NC</p>';

  // Nav
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  nav.innerHTML = `
    <div class="nav-inner container">
      <a href="index.html" class="nav-logo">
        <img src="public/images/products/crown_gso.webp" alt="HBCU Crown" class="nav-logo-img">
        <span class="nav-logo-text">HBCU Crown GSO Outlet</span>
      </a>
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
              <li><a href="#" class="pickup-trigger">Pickup Policy</a></li>
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
        <p class="cart-tax-note">Taxes calculated at checkout &bull; Local pickup only</p>
        <div class="checkout-agreement">
          <label class="checkout-agreement-label">
            <input type="checkbox" id="checkout-agree" class="checkout-agree-checkbox">
            <span>I agree to the <a href="#" class="terms-trigger">Terms &amp; Conditions</a>, <a href="#" class="pickup-trigger">Pickup Policy</a>, <a href="#" class="return-trigger">Return Policy</a>, and <a href="#" class="chargeback-trigger">Chargeback Policy</a>. I confirm this purchase is authorized, I understand all orders are <strong>local pickup only</strong> in Greensboro, NC, and that filing a fraudulent chargeback may result in account suspension and collection action.</span>
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
      body: '<h3>1. General</h3><p>Welcome to HBCU Crown GSO Outlet. By accessing or using our website and purchasing our products, you agree to be bound by these Terms & Conditions. All purchases are <strong>final sale</strong> and fulfilled via <strong>local pickup only</strong> in Greensboro, North Carolina.</p>' +
        '<h3>2. Products & Orders</h3><p>All products are subject to availability. We reserve the right to limit quantities, refuse orders, or cancel orders at our discretion. Prices are in USD and subject to change. Product images are for illustration purposes; actual colors may vary slightly.</p>' +
        '<h3>3. Payment</h3><p>We accept major credit cards and other payment methods as displayed at checkout. Payment is processed securely through Stripe. All transactions are in US Dollars. Payment is collected at the time of purchase.</p>' +
        '<h3>4. Local Pickup Only</h3><p><strong>We do not ship orders.</strong> All orders are fulfilled via local pickup in Greensboro, NC. By completing a purchase, you acknowledge and agree that you are responsible for picking up your order at the designated pickup location. Pickup details and scheduling will be communicated via email after your order is confirmed. Unclaimed orders after 14 days may be forfeited without refund.</p>' +
        '<h3>5. All Sales Final</h3><p>All purchases are considered final at the time of pickup. By completing checkout and picking up your order, you confirm that you have inspected the item(s) and accept them in their current condition. Returns, exchanges, and refunds are only offered at the sole discretion of HBCU Crown GSO Outlet for defective items reported at the time of pickup.</p>' +
        '<h3>6. Intellectual Property</h3><p>All content on this website is the property of HBCU Crown GSO Outlet and is protected by copyright and trademark laws.</p>' +
        '<h3>7. Fraud Prevention & Chargebacks</h3><p>Filing a chargeback for a legitimate, authorized purchase that was picked up constitutes fraud and may result in account suspension, referral to collections, and legal action. We maintain comprehensive transaction records including payment verification, order confirmation, and pickup acknowledgment.</p>' +
        '<h3>8. Limitation of Liability</h3><p>HBCU Crown GSO Outlet shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the product in question.</p>' +
        '<h3>9. Contact</h3><p>Questions? Contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'pickup-modal',
      trigger: 'pickup-trigger',
      title: 'Pickup Policy',
      body: '<h3>Local Pickup Only</h3><p>HBCU Crown GSO Outlet operates as a <strong>local pickup only</strong> outlet in <strong>Greensboro, North Carolina</strong>. We do not offer shipping or delivery services. By placing an order on our website, you acknowledge and agree that you will pick up your purchased item(s) in person.</p>' +
        '<h3>How Pickup Works</h3><ol><li>Place your order and complete payment online through our secure Stripe checkout</li><li>You will receive an order confirmation email with your order number</li><li>Within 1&ndash;2 business days, you will receive a second email with <strong>pickup location details</strong> and available <strong>pickup times</strong></li><li>Bring your <strong>order confirmation</strong> (email or screenshot) and a <strong>valid photo ID</strong> matching the name on the order to pick up your item(s)</li></ol>' +
        '<h3>Pickup Window</h3><p>Orders must be picked up within <strong>14 calendar days</strong> of the pickup-ready notification. If you need to reschedule, please contact us at least 24 hours before your scheduled pickup time.</p>' +
        '<p><strong>Unclaimed orders:</strong> Orders not picked up within 14 days of the pickup-ready notification will be considered forfeited. No refund will be issued for unclaimed orders. HBCU Crown GSO Outlet reserves the right to resell unclaimed merchandise.</p>' +
        '<h3>Pickup Identification Requirements</h3><p>To prevent fraud and protect our customers, the following are required at pickup:</p><ul><li>Order confirmation email or screenshot showing your order number</li><li>Government-issued photo ID matching the name on the order</li><li>If someone else is picking up on your behalf, you must notify us in advance via email with the authorized person\'s full name. The authorized person must present their own valid photo ID.</li></ul>' +
        '<h3>Inspect Before You Leave</h3><p>Please <strong>inspect all items at the time of pickup</strong> before leaving. Once you leave the pickup location with your item(s), the sale is considered complete and final. Any defects or issues must be reported at the time of pickup.</p>' +
        '<h3>No Shipping Available</h3><p>We are a local outlet serving the Greensboro, NC community. We do not ship orders under any circumstances. Please do not place an order if you are unable to pick up in the Greensboro, NC area.</p>' +
        '<h3>Contact Us</h3><p>For pickup scheduling or questions, email us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or call <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'return-modal',
      trigger: 'return-trigger',
      title: 'Return Policy',
      body: '<h3>All Sales Final</h3><p>All purchases made through HBCU Crown GSO Outlet are <strong>final sale</strong>. Because all orders are fulfilled via local pickup, customers have the opportunity to <strong>inspect all items at the time of pickup</strong> before accepting them. Once you leave the pickup location with your item(s), the transaction is considered complete.</p>' +
        '<h3>Defective Items</h3><p>If you discover a manufacturing defect or quality issue <strong>at the time of pickup</strong>, please notify our staff immediately before leaving. We will inspect the item and, at our sole discretion, offer one of the following resolutions:</p><ul><li>Exchange for the same item (subject to availability)</li><li>Store credit for the purchase amount</li><li>Refund to the original payment method</li></ul>' +
        '<h3>No Returns After Pickup</h3><p>Once you have picked up and left with your item(s), we do not accept returns or offer refunds for any reason, including but not limited to:</p><ul><li>Change of mind or buyer\'s remorse</li><li>Incorrect size selection (size charts are provided on our website)</li><li>Color variations due to screen differences</li><li>Items that have been worn, washed, or altered</li></ul>' +
        '<h3>Exchanges</h3><p>Exchanges are only available at the time of pickup for defective items or if the wrong item was provided. We do not offer exchanges after the customer has left the pickup location.</p>' +
        '<h3>Order Cancellations</h3><p>If you need to cancel an order <strong>before pickup</strong>, please contact us as soon as possible at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a>. Cancellations requested within 24 hours of placing the order may be eligible for a full refund at our discretion. Cancellation requests made after 24 hours are not guaranteed.</p>' +
        '<h3>Contact Us</h3><p>For any questions about our return policy, email us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or call <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'privacy-modal',
      trigger: 'privacy-trigger',
      title: 'Privacy Policy',
      body: '<h3>Information We Collect</h3><p>We collect information you provide directly, including your name, email address, phone number, and payment information when you make a purchase or subscribe to our newsletter.</p><h3>How We Use Your Information</h3><p>We use your information to:</p><ul><li>Process and fulfill your orders</li><li>Send order confirmations and pickup notifications</li><li>Verify your identity at the time of pickup</li><li>Send promotional emails and newsletters (with your consent)</li><li>Improve our website and customer experience</li><li>Respond to your inquiries and support requests</li></ul><h3>Information Sharing</h3><p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and processing payments (Stripe).</p><h3>Email Communications</h3><p>If you subscribe to our VIP list or newsletter, you will receive promotional emails. You can unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us.</p><h3>Data Security</h3><p>We implement industry-standard security measures to protect your personal information. Payment processing is handled securely by Stripe and we do not store your credit card information on our servers.</p><h3>Cookies</h3><p>Our website may use cookies to enhance your browsing experience and remember your cart contents. You can disable cookies in your browser settings.</p><h3>Contact</h3><p>If you have questions about this Privacy Policy, contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'fraud-modal',
      trigger: 'fraud-trigger',
      title: 'Fraud Prevention Policy',
      body: '<h3>Our Commitment to Security</h3><p>HBCU Crown GSO Outlet is committed to providing a safe and secure shopping experience for every customer. We take fraud seriously and have implemented comprehensive measures to protect both our customers and our business from unauthorized or fraudulent transactions.</p>' +
        '<h3>Payment Verification</h3><p>All payments are processed securely through <strong>Stripe</strong>, a PCI-DSS Level 1 certified payment processor. We do not store, process, or have access to your full credit card numbers on our servers. To protect against unauthorized use, we may verify orders using the following methods:</p><ul><li>Billing address verification (AVS &mdash; Address Verification System)</li><li>Card verification value (CVV/CVC) matching</li><li>3D Secure authentication when supported by your bank</li><li>IP address and geolocation analysis</li><li>Order pattern analysis for unusual purchasing behavior</li></ul>' +
        '<h3>Order Review &amp; Verification</h3><p>HBCU Crown GSO Outlet reserves the right to review, delay, or cancel any order that triggers our fraud detection criteria. Orders may be flagged for review if:</p><ul><li>The billing address does not match the address on file with the card issuer</li><li>The shipping address differs significantly from the billing address</li><li>Multiple orders are placed in quick succession using different payment methods</li><li>Unusually large or high-volume orders are placed</li><li>The order is placed from a high-risk IP address or using a VPN/proxy</li><li>The provided email address or phone number cannot be verified</li></ul>' +
        '<p>If your order is flagged, we may contact you at the email address or phone number provided to verify your identity before processing. Orders that cannot be verified will be cancelled and refunded.</p>' +
        '<h3>Customer Identity Verification</h3><p>All orders require identity verification at pickup. Customers must present:</p><ul><li>Order confirmation email or screenshot</li><li>A government-issued photo ID matching the name on the order</li></ul><p>Orders that cannot be verified at pickup will not be released. Additionally, we may request verification before processing an order, including phone verification via the number on file. Failure to provide requested verification within 48 hours may result in order cancellation.</p>' +
        '<h3>Unauthorized Transactions</h3><p>If you believe a purchase was made on your card without your authorization, please:</p><ol><li>Contact your card issuer or bank immediately to report the unauthorized charge</li><li>Contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a> so we can investigate and cancel the order before it is picked up</li></ol>' +
        '<h3>Fraudulent Chargebacks</h3><p>Filing a chargeback or payment dispute for a legitimate purchase that was authorized, received, and not returned through our official return process constitutes <strong>friendly fraud</strong> and may result in:</p><ul><li>Permanent account suspension from HBCU Crown GSO Outlet</li><li>Submission of transaction evidence to the payment processor and card network</li><li>Referral to collections for recovery of the disputed amount plus administrative fees</li><li>Reporting to fraud prevention databases</li></ul>' +
        '<h3>Record Keeping</h3><p>For fraud prevention purposes, we maintain records of all transactions including:</p><ul><li>Order confirmations and receipts</li><li>Pickup confirmation and ID verification records</li><li>Customer communications and correspondence</li><li>IP addresses and device information at time of purchase</li><li>AVS and CVV verification results</li></ul><p>These records are retained for a minimum of 2 years and may be used as evidence in the event of a disputed charge.</p>' +
        '<h3>Refund Policy for Suspected Fraud</h3><p>If we determine that an order was placed fraudulently, we will cancel the order and issue a full refund to the original payment method. If the order has already been picked up, we will pursue all available remedies including reporting to law enforcement.</p>' +
        '<h3>Contact Us</h3><p>If you have questions about our fraud prevention practices or need to report suspicious activity, contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a>.</p>'
    },
    {
      id: 'chargeback-modal',
      trigger: 'chargeback-trigger',
      title: 'Chargeback &amp; Dispute Policy',
      body: '<h3>Dispute Resolution &mdash; Contact Us First</h3><p>At HBCU Crown GSO Outlet, we believe most issues can be resolved quickly and fairly through direct communication. <strong>Before filing a chargeback or dispute with your bank or card issuer, we strongly encourage you to contact us first.</strong> We are committed to resolving any concern&mdash;whether it involves product quality, sizing, or billing.</p>' +
        '<p>Contact us at <a href="mailto:hbcucrowngsooutlet@gmail.com">hbcucrowngsooutlet@gmail.com</a> or <a href="tel:8135090780">(813) 509-0780</a> and we will respond within 1&ndash;2 business days.</p>' +
        '<h3>What Is a Chargeback?</h3><p>A chargeback occurs when a cardholder contacts their bank or card issuer to dispute a charge. While chargebacks are designed to protect consumers from unauthorized transactions, they are sometimes filed in error or for issues that could have been resolved directly with the merchant.</p>' +
        '<h3>Our Chargeback Response Process</h3><p>When a chargeback is filed against HBCU Crown GSO Outlet, we will respond with comprehensive evidence, which may include:</p><ul><li><strong>Transaction records:</strong> Order confirmation, payment authorization, AVS/CVV verification results</li><li><strong>Proof of pickup:</strong> Pickup confirmation, ID verification records, and pickup acknowledgment</li><li><strong>Customer communication:</strong> Email correspondence, pickup scheduling, order notifications, and any prior contact regarding the order</li><li><strong>Product description accuracy:</strong> Product listing details, images, and size charts provided at time of purchase</li><li><strong>Policy acceptance:</strong> Record that the customer agreed to our Terms &amp; Conditions, Pickup Policy, and Return Policy at checkout</li><li><strong>Device and session data:</strong> IP address, browser information, and geolocation data from the time of purchase</li></ul>' +
        '<h3>Friendly Fraud</h3><p>"Friendly fraud" occurs when a customer files a chargeback for a legitimate order they authorized and picked up rather than following our return policy. Examples include:</p><ul><li>Claiming a charge is unauthorized when the cardholder made the purchase</li><li>Stating an item was not received when pickup records confirm collection</li><li>Disputing a charge for buyer\'s remorse after picking up the item</li><li>Filing a chargeback after wearing or using the product</li></ul>' +
        '<p>HBCU Crown GSO Outlet vigorously contests all cases of friendly fraud. We maintain detailed records of every transaction and will submit all available evidence to the card issuer.</p>' +
        '<h3>Consequences of Fraudulent Chargebacks</h3><p>Customers who file fraudulent or unwarranted chargebacks may be subject to:</p><ul><li>Permanent ban from purchasing on our website</li><li>Recovery of the disputed amount plus all associated chargeback fees (typically $15&ndash;$25 per dispute)</li><li>Referral to a third-party collections agency</li><li>Reporting to fraud prevention networks and databases</li><li>Legal action in cases involving repeated or high-value fraudulent disputes</li></ul>' +
        '<h3>Valid Reasons to Dispute a Charge</h3><p>We acknowledge that there are legitimate reasons to file a dispute, including:</p><ul><li>A charge you truly did not authorize (stolen card)</li><li>Being charged an incorrect amount</li><li>Being charged multiple times for a single order</li></ul><p>In these cases, we will work with you and your bank to resolve the matter promptly.</p>' +
        '<h3>Checkout Agreement</h3><p>By completing a purchase on HBCU Crown GSO Outlet, customers acknowledge and agree to our Terms &amp; Conditions, Pickup Policy, Return Policy, and this Chargeback &amp; Dispute Policy. Customers further acknowledge that all sales are local pickup only and that this agreement is recorded at the time of checkout and serves as evidence in the event of a dispute.</p>' +
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

/* ---- Checkout (Stripe Payment Links) ---- */
function handleCheckout() {
  const items = CartStore.getItems();
  if (items.length === 0) return;

  // Verify checkout agreement
  var agreeCheckbox = document.getElementById('checkout-agree');
  if (!agreeCheckbox || !agreeCheckbox.checked) {
    showToast('Please agree to our Terms & Conditions and policies before checking out.');
    return;
  }

  // Check if Stripe payment links are configured
  if (typeof STRIPE_CONFIG === 'undefined' || !STRIPE_CONFIG.paymentLinks) {
    showToast('Checkout is being set up. Please contact us directly to place your order!');
    return;
  }

  // For single-item carts, redirect directly to the payment link
  // For multi-item carts, open payment links for each unique product
  var missingLinks = [];
  var linksToOpen = [];

  items.forEach(function (item) {
    var linkKey = item.productId + '__' + item.size;
    var paymentLink = STRIPE_CONFIG.paymentLinks[linkKey];

    if (paymentLink && paymentLink.length > 0) {
      linksToOpen.push({ link: paymentLink, name: item.name, size: item.size, qty: item.quantity });
    } else {
      missingLinks.push(item.name + ' (' + item.size + ')');
    }
  });

  if (missingLinks.length > 0 && linksToOpen.length === 0) {
    showToast('Checkout is not yet configured for these products. Please contact us to place your order.');
    return;
  }

  if (missingLinks.length > 0) {
    showToast('Some items are not yet available for online checkout: ' + missingLinks.join(', ') + '. Please contact us for those items.');
  }

  if (linksToOpen.length === 1) {
    // Single product - redirect directly
    var url = linksToOpen[0].link;
    // Append quantity if more than 1
    if (linksToOpen[0].qty > 1) {
      url += (url.includes('?') ? '&' : '?') + 'quantity=' + linksToOpen[0].qty;
    }
    window.location.href = url;
  } else if (linksToOpen.length > 1) {
    // Multiple products - open first in current tab, rest in new tabs
    for (var i = 1; i < linksToOpen.length; i++) {
      var multiUrl = linksToOpen[i].link;
      if (linksToOpen[i].qty > 1) {
        multiUrl += (multiUrl.includes('?') ? '&' : '?') + 'quantity=' + linksToOpen[i].qty;
      }
      window.open(multiUrl, '_blank');
    }
    var firstUrl = linksToOpen[0].link;
    if (linksToOpen[0].qty > 1) {
      firstUrl += (firstUrl.includes('?') ? '&' : '?') + 'quantity=' + linksToOpen[0].qty;
    }
    window.location.href = firstUrl;
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
