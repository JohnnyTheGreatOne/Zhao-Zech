// Hamburger Menu Funktionalität
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const closeMenu = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // Menü öffnen/schließen
  hamburger.addEventListener('click', function() {
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
  });
  
  closeMenu.addEventListener('click', function() {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
  });
  
  // Menü schließen bei Klick auf Link
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
      });
  });
});

// Navigation zwischen den Reitern
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('nav a');
  const contentSections = document.querySelectorAll('.content-section');

  // Standardmäßig den "Home"-Reiter aktivieren
  document.querySelector('#home').classList.add('active');
  document.querySelector('nav a[href="#home"]').classList.add('active');

  navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          if (this.getAttribute('href').startsWith('#')) {
              event.preventDefault();

              // Alle Reiter ausblenden
              contentSections.forEach(section => {
                  section.classList.remove('active');
              });

              // Angeklickten Reiter anzeigen
              const targetId = this.getAttribute('href');
              document.querySelector(targetId).classList.add('active');

              // Aktiven Link markieren
              navLinks.forEach(link => link.classList.remove('active'));
              this.classList.add('active');
          }
      });
  });
});

// Übersetzungslogik
document.addEventListener('DOMContentLoaded', function () {
  const translateButton = document.getElementById('translate-button');
  const translateButtonDesktop = document.getElementById('translate-button-desktop');
  
  const translations = {
      de: {
          headerName: "Johann Zhao",
          home: "Biografie",
          mediathek: "Mediathek",
          gallerie: "Galerie",
          news: "News & Presse",
          zhaoZech: "Zhao & Zech",
          kontakt: "Kontakt",
          homeTitle: "Johann Zhao | Pianist",
          mediathekTitle: "Mediathek",
          gallerieTitle: "Galerie",
          newsTitle: "News & Presse",
          zhaoZechTitle: "Zhao & Zech",
          kontaktTitle: "Kontakt",
          kontaktFormName: "Name:",
          kontaktFormEmail: "E-Mail:",
          kontaktFormMessage: "Nachricht:",
          kontaktFormButton: "Senden",
          confirmationMessage: "Vielen Dank für deine Nachricht!",
          buttonText: "EN"
      },
      en: {
          headerName: "Johann Zhao",
          home: "Biography",
          mediathek: "Media Library",
          gallerie: "Gallery",
          news: "News & Press",
          zhaoZech: "Zhao & Zech",
          kontakt: "Contact",
          homeTitle: "Johann Zhao | Pianist",
          mediathekTitle: "Media Library",
          gallerieTitle: "Gallery",
          newsTitle: "News & Press",
          zhaoZechTitle: "Zhao & Zech",
          kontaktTitle: "Contact",
          kontaktFormName: "Name:",
          kontaktFormEmail: "Email:",
          kontaktFormMessage: "Message:",
          kontaktFormButton: "Send",
          confirmationMessage: "Thank you for your message!",
          buttonText: "DE"
      }
  };

  let currentLanguage = 'de';

  function updateButtonText() {
      const buttonText = translations[currentLanguage].buttonText;
      if (translateButton) translateButton.textContent = buttonText;
      if (translateButtonDesktop) translateButtonDesktop.textContent = buttonText;
  }

  function translateContent() {
      // Übersetze Header-Inhalte
      document.getElementById('header-name').textContent = translations[currentLanguage].headerName;
      document.getElementById('nav-home').textContent = translations[currentLanguage].home;
      document.getElementById('nav-mediathek').textContent = translations[currentLanguage].mediathek;
      document.getElementById('nav-gallerie').textContent = translations[currentLanguage].gallerie;
      document.getElementById('nav-news').textContent = translations[currentLanguage].news;
      document.getElementById('nav-zhao-zech').textContent = translations[currentLanguage].zhaoZech;
      document.getElementById('nav-kontakt').textContent = translations[currentLanguage].kontakt;

      // Übersetze Reiter-Titel
      document.getElementById('home-title').textContent = translations[currentLanguage].homeTitle;
      document.getElementById('mediathek-title').textContent = translations[currentLanguage].mediathekTitle;
      document.getElementById('gallerie-title').textContent = translations[currentLanguage].gallerieTitle;
      document.getElementById('news-presse-title').textContent = translations[currentLanguage].newsTitle;
      document.getElementById('zhao-zech-title').textContent = translations[currentLanguage].zhaoZechTitle;
      document.getElementById('kontakt-title').textContent = translations[currentLanguage].kontaktTitle;

      // Übersetze Kontaktformular
      document.getElementById('kontakt-form-name').textContent = translations[currentLanguage].kontaktFormName;
      document.getElementById('kontakt-form-email').textContent = translations[currentLanguage].kontaktFormEmail;
      document.getElementById('kontakt-form-message').textContent = translations[currentLanguage].kontaktFormMessage;
      document.getElementById('kontakt-form-button').textContent = translations[currentLanguage].kontaktFormButton;

      // Übersetze Home-Text
      const homeTextsDE = document.querySelectorAll('#home-text-de');
      const homeTextsEN = document.querySelectorAll('#home-text-en');
      if (currentLanguage === 'de') {
          homeTextsDE.forEach(text => text.style.display = 'block');
          homeTextsEN.forEach(text => text.style.display = 'none');
      } else {
          homeTextsDE.forEach(text => text.style.display = 'none');
          homeTextsEN.forEach(text => text.style.display = 'block');
      }
  }

  function handleTranslate() {
      currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
      updateButtonText();
      translateContent();
  }

  if (translateButton) translateButton.addEventListener('click', handleTranslate);
  if (translateButtonDesktop) translateButtonDesktop.addEventListener('click', handleTranslate);

  // Initialen Button-Text setzen
  updateButtonText();
});

// Lightbox-Funktionalität
// Only update the logic ensuring images open in lightbox-img inside the new .lightbox-img-container.
// No major JS change needed, just make sure lightbox-img src is set as before.

// Here is the relevant excerpt:
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');
  const galleryImages = document.querySelectorAll('.gallery img');
  const lightboxCopyright = document.getElementById('lightbox-copyright');

  galleryImages.forEach(image => {
    image.addEventListener('click', function () {
      lightbox.style.display = 'flex';
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt || '';
      // Set copyright text from image's data attribute
      lightboxCopyright.textContent = this.dataset.copyright || '©';
    });
  });

  closeLightbox.addEventListener('click', function () {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.alt = '';
    lightboxCopyright.textContent = '';
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      lightboxImg.alt = '';
      lightboxCopyright.textContent = '';
    }
  });
});

// Kontaktformular
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const confirmationMessage = document.getElementById('confirmation');

  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
              'Accept': 'application/json',
          },
      })
      .then(response => {
          if (response.ok) {
              confirmationMessage.style.display = 'block';
              contactForm.reset();
          } else {
              throw new Error('Fehler beim Senden der Daten');
          }
      })
      .catch(error => {
          console.error('Fehler:', error);
          alert('Es gab ein Problem beim Absenden des Formulars. Bitte versuche es später erneut.');
      });
  });
});

// Footer erscheint beim Scrollen nach unten
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer');
  const main = document.querySelector('main');
  
  function checkFooterVisibility() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= pageHeight - 50) {
          footer.classList.add('visible');
      } else {
          footer.classList.remove('visible');
      }
  }
  
  checkFooterVisibility();
  
  window.addEventListener('scroll', checkFooterVisibility);
  window.addEventListener('resize', checkFooterVisibility);
  
  main.style.marginBottom = '100px';
});
