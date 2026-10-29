/* KEITA Sales & Installation — WhatsApp enquiry
   One job: turn the form into a pre-filled WhatsApp message and open the chat. */

(function () {
  'use strict';

  // Business WhatsApp number in international format, digits only.
  // 079 169 2899  ->  +27 79 169 2899
  var WHATSAPP_NUMBER = '27791692899';
  var BUSINESS_NAME = 'KEITA Sales & Installation';

  var form = document.getElementById('waForm');
  var nameInput = document.getElementById('name');
  var serviceInput = document.getElementById('service');
  var areaInput = document.getElementById('area');
  var detailsInput = document.getElementById('details');
  var previewText = document.getElementById('previewText');
  var serviceGrid = document.getElementById('serviceGrid');
  var yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Build the message ---- */
  function buildMessage() {
    var name = nameInput.value.trim();
    var service = serviceInput.value.trim();
    var area = areaInput.value.trim();
    var details = detailsInput.value.trim();

    var lines = [];
    lines.push(
      'Hi ' + BUSINESS_NAME + ', I am interested in your services.'
    );
    lines.push('');
    if (name) lines.push('Name: ' + name);
    if (service) lines.push('Service needed: ' + service);
    if (area) lines.push('Area: ' + area);
    if (details) lines.push('Details: ' + details);
    lines.push('');
    lines.push('Please send me a quote. Thank you.');

    return lines.join('\n');
  }

  function updatePreview() {
    previewText.textContent = buildMessage();
  }

  /* ---- Validation ---- */
  function setError(input, message) {
    var field = input.closest('.field');
    var slot = field.querySelector('[data-error-for="' + input.id + '"]');
    if (message) {
      field.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (slot) slot.textContent = message;
    } else {
      field.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (slot) slot.textContent = '';
    }
  }

  function validate() {
    var ok = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please tell us your name.');
      ok = false;
    } else {
      setError(nameInput, '');
    }

    if (!serviceInput.value.trim()) {
      setError(serviceInput, 'Please choose a service.');
      ok = false;
    } else {
      setError(serviceInput, '');
    }

    return ok;
  }

  /* ---- Open WhatsApp ---- */
  function openWhatsApp() {
    var url =
      'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage());
    window.open(url, '_blank', 'noopener');
  }

  /* ---- Wire it up ---- */
  [nameInput, serviceInput, areaInput, detailsInput].forEach(function (el) {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) {
      var firstInvalid = form.querySelector('.is-invalid input, .is-invalid select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    openWhatsApp();
  });

  // Clicking a service card pre-selects it and jumps to the form.
  if (serviceGrid) {
    serviceGrid.addEventListener('click', function (event) {
      var card = event.target.closest('.card');
      if (!card) return;

      var wanted = card.dataset.service;
      var matched = Array.prototype.some.call(serviceInput.options, function (opt) {
        if (opt.text === wanted) {
          serviceInput.value = opt.value;
          return true;
        }
        return false;
      });
      if (!matched) serviceInput.value = 'Something else';

      setError(serviceInput, '');
      updatePreview();

      document.getElementById('enquire').scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(function () {
        if (!nameInput.value.trim()) nameInput.focus({ preventScroll: true });
      }, 500);
    });
  }

  updatePreview();
})();
