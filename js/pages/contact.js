/* =============================================
   HBCU Crown GSO Outlet - Contact Page
   Form validation and submission
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    let isValid = true;

    // Validate name
    const name = document.getElementById('contact-name');
    if (!name.value.trim()) {
      document.getElementById('group-name').classList.add('has-error');
      isValid = false;
    }

    // Validate email
    const email = document.getElementById('contact-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      document.getElementById('group-email').classList.add('has-error');
      isValid = false;
    }

    // Validate message
    const message = document.getElementById('contact-message');
    if (!message.value.trim()) {
      document.getElementById('group-message').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Build mailto link as fallback submission
    const phone = document.getElementById('contact-phone').value.trim();
    const subject = encodeURIComponent('Contact Form - HBCU Crown GSO Outlet');
    const body = encodeURIComponent(
      'Name: ' + name.value.trim() + '\n' +
      'Email: ' + email.value.trim() + '\n' +
      'Phone: ' + (phone || 'N/A') + '\n\n' +
      'Message:\n' + message.value.trim()
    );

    // Send via EmailJS if configured
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.serviceId) {
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.contactTemplateId, {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        phone: phone || 'N/A',
        message: message.value.trim(),
        to_email: 'hbcucrowngsooutlet@gmail.com'
      }).then(function () {
        form.style.display = 'none';
        document.getElementById('contact-success').classList.add('show');
        showToast('Message sent successfully!');
      }, function () {
        // Fallback to mailto
        window.location.href = 'mailto:hbcucrowngsooutlet@gmail.com?subject=' + subject + '&body=' + body;
        showToast('Opening your email client...');
        if (submitBtn) submitBtn.disabled = false;
      });
    } else {
      // Fallback to mailto
      window.location.href = 'mailto:hbcucrowngsooutlet@gmail.com?subject=' + subject + '&body=' + body;
      form.style.display = 'none';
      document.getElementById('contact-success').classList.add('show');
      showToast('Opening your email client...');
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      var group = field.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
});
