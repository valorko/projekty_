// js/app.js - spracovanie JS logiky (validácia formulára, lightbox, oznámenia)
// Tento súbor NEobsahuje žiadnu cookie logiku ani referencie na cookies.

// Komentáre sú pridané pre prehľadnosť.

// Celé spustenie po načítaní DOM
document.addEventListener('DOMContentLoaded', function () {
  // Rok v pätičkách
  try {
    const year = new Date().getFullYear();
    ['year','year2','year3','year4','year5'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = year;
    });
  } catch (err) {
    console.warn('Year injection failed:', err);
  }

  // -------- Lightbox gallery logic (kreatívny bod) --------
  (function initLightbox() {
    try {
      const galleryItems = document.querySelectorAll('.gallery-item');
      const lightboxEl = document.getElementById('lightboxModal');
      const lightboxImage = document.getElementById('lightboxImage');
      let lightboxModal = null;
      if (lightboxEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        lightboxModal = new bootstrap.Modal(lightboxEl, {});
      }
      if (!galleryItems || !galleryItems.length || !lightboxModal || !lightboxImage) return;

      galleryItems.forEach(img => {
        img.addEventListener('click', () => {
          const src = img.dataset.src || img.src || img.getAttribute('src');
          if (src) {
            lightboxImage.src = src;
            lightboxModal.show();
          }
        });
      });
    } catch (err) {
      console.warn('Lightbox initialization failed:', err);
    }
  })();

  // -------- FORM VALIDATION (kontakt.html) --------
  (function initFormValidation() {
    try {
      const contactForm = document.getElementById('contactForm');
      if (!contactForm) return;

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.classList.add('was-validated');
          return;
        }

        const emailEl = document.getElementById('email');
        const email = emailEl ? emailEl.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (emailEl) emailEl.classList.add('is-invalid');
          return;
        } else {
          if (emailEl) emailEl.classList.remove('is-invalid');
        }

        // Simulate submission -> redirect to thankyou.html
        window.location.href = 'thankyou.html';
      });
    } catch (err) {
      console.warn('Form validation setup failed:', err);
    }
  })();

  // -------- Alerts placeholder (no-op) --------
  try {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(a => {
      // reserved for interactive behavior
    });
  } catch (err) {
    // ignore
  }
});