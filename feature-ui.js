document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  var menuButton = document.getElementById('mobile-nav-toggle');
  var navigation = document.getElementById('main-navigation');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      var isOpen = navigation.classList.toggle('mobile-nav-active');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-logout], #admin-logout-link').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = 'index.html';
    });
  });

  var successForms = {
    'contact-form': 'Your message has been submitted successfully.',
    'login-form': 'Login form submitted successfully.',
    'register-form': 'Your account details have been submitted successfully.',
    'inspection-form': 'Inspection report submitted successfully.',
    'save-search-form': 'Your search has been saved successfully.',
    'admin-car-form': 'Vehicle details submitted successfully.',
    'site-settings-form': 'Site settings submitted successfully.',
    'consignment-form': 'Your vehicle submission has been received successfully.'
  };

  Object.keys(successForms).forEach(function (formId) {
    var form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var message = form.querySelector('.submission-success');
      if (!message) {
        message = document.createElement('p');
        message.className = 'submission-success';
        message.setAttribute('role', 'status');
        message.style.marginTop = '12px';
        message.style.color = '#218838';
        message.style.fontWeight = '600';
        form.appendChild(message);
      }
      message.textContent = successForms[formId];
      form.reset();
    });
  });

  document.querySelectorAll('[data-backend-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) form.reportValidity();
    });
  });

  document.querySelectorAll('[data-backend-action]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  document.querySelectorAll('[data-tab]').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId = button.getAttribute('data-tab');
      document.querySelectorAll('.tab-pane').forEach(function (pane) { pane.classList.remove('active'); });
      document.querySelectorAll('[data-tab]').forEach(function (tab) {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      });
      var target = document.getElementById(targetId);
      if (target) target.classList.add('active');
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    });
  });

  var emptyStates = [
    ['buyer-profile', '<p>Profile information</p>'],
    ['buyer-saved', '<p>No saved searches yet.</p>'],
    ['buyer-orders', '<p>No orders yet.</p>'],
    ['seller-records', '<p>No vehicle listings yet.</p>'],
    ['inspection-queue', '<p>No vehicles assigned.</p>'],
    ['inspection-reports', '<p>No inspection reports yet.</p>']
  ];
  emptyStates.forEach(function (item) {
    var element = document.getElementById(item[0]);
    if (element && !element.innerHTML.trim()) element.innerHTML = item[1];
  });
});
