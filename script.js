// Smooth Scroll für die Navigation mit Offset
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offset = 80; // Höhe der Navigation anpassen

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// Aktiven Link beim Scrollen hervorheben
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Lightbox-Funktionalität für die Gallerie (erweitert: zeigt Copyright/Credit)
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    // Erstelle Lightbox-Container nur einmal
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
    }

    // Innere Struktur: wrapper, img, meta (title & credit), close btn (optional)
    function createLightboxStructure() {
        lightbox.innerHTML = '';
        const backdrop = document.createElement('div');
        backdrop.className = 'lightbox-backdrop';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const img = document.createElement('img');
        img.className = 'lightbox-img';
        img.alt = '';

        const meta = document.createElement('div');
        meta.className = 'lightbox-meta';
        const title = document.createElement('div');
        title.className = 'lightbox-title';
        const credit = document.createElement('div');
        credit.className = 'lightbox-credit';

        meta.appendChild(title);
        meta.appendChild(credit);

        // optional Close-Button (für Nutzerfreundlichkeit)
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'Schließen');
        closeBtn.innerHTML = '&times;';

        content.appendChild(closeBtn);
        content.appendChild(img);
        content.appendChild(meta);

        lightbox.appendChild(backdrop);
        lightbox.appendChild(content);

        // Close handlers
        backdrop.addEventListener('click', () => closeLightbox());
        closeBtn.addEventListener('click', () => closeLightbox());
        return { img, title, credit, content };
    }

    function openLightbox(src, alt, creditText) {
        const { img, title, credit } = createLightboxStructure();
        img.src = src;
        img.alt = alt || '';
        title.textContent = alt || ''; // falls du Titel verwenden möchtest
        credit.textContent = creditText || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // verhindert Scroll hinter der Lightbox
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.innerHTML = '';
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        item.style.cursor = 'zoom-in';
        item.addEventListener('click', function() {
            // Preferiere ein größeres Bild, wenn du separate Fullsize-Dateien nutzt.
            // Hier verwenden wir aktuell die src des Thumbnails (falls Fullsize verfügbar, setze data-full auf das img-Element).
            const full = this.dataset.full || this.src;
            const credit = this.dataset.credit || '';
            const title = this.alt || '';
            openLightbox(full, title, credit);
        });
    });

    // Esc schließt Lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const lb = document.getElementById('lightbox');
            if (lb && lb.classList.contains('active')) {
                closeLightbox();
            }
        }
    });
});
