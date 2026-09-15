(function () {
  'use strict';

  // GA4 → Admin → Data streams → Web → Measurement ID
  var GA_MEASUREMENT_ID = 'G-XVVX12ZP0H';

  if (!GA_MEASUREMENT_ID) {
    return;
  }

  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') {
    return;
  }

  if (localStorage.getItem('ga_opt_out') === '1') {
    window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
})();
