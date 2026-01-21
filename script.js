document.addEventListener('DOMContentLoaded', function() {
    
    // --- KONZERT-LOGIK (Automatisierte Trennung) ---
    const concertData = [
        // Kommende / Gerade vergangene
        { date: "2025-12-20T19:00:00", title: "Auftritt in Siegsdorf", location: "Restaurant Papillon", program: "Klassik, Jazz, Pop und Filmmusik" },
        { date: "2025-12-21T17:00:00", title: "Konzert in Salzburg", location: "Musikum Salzburg Stadt, Steinway Saal", program: "Best of Hollywood (Filmmusik)" },
        { date: "2026-01-24T15:00:00", title: "Konzert bei der Mozartwoche 2026", location: "DomQuartier Salzburg, Rittersaal der Residenz", program: "Zech: Konzert für Klavier zu vier Händen und Ensemble" },
        { date: "2026-01-29T20:00:00", title: "Konzert im Schloss Goldegg", location: "Schloss Goldegg", program: "Mozart, Zeitgenossen und zeitgenössische Musik" },
        { date: "2026-03-14T18:00:00", title: "Konzert in Inzell", location: "Musikschule Inzell", program: "Wiener Klassik bis zeitgenössische Musik" },
        { date: "2026-08-09", title: "Auftritt bei den Salzburger Hochschulwochen", location: "Universitätsaula Salzburg", program: "Wiener Klassik und Romantik" },
        // Vergangene
        { date: "2025-11-14T19:30:00", title: "Konzert in Salzburg", location: "Musikum Salzburg Stadt, Steinway Saal", program: "Werke von Mozart, Hindemith, Reger und Strawinsky" },
        { date: "2025-09-18", title: "Konzert in Istanbul", location: "Renaissance Polat Istanbul Hotel", program: "Klassik und Romantik" },
        { date: "2025-08-29", title: "Konzert in Ruhpolding", location: "Pfarrzentrum, Evangelische Kirchengemeinde", program: "Werke von Mozart, Orff, Bizet, Dukas, Beethoven, Schostakowitsch, Rihm und Lutosławski" },
        { date: "2025-06-07T21:00:00", title: "Auftritt in Siegsdorf", location: "Restaurant Papillon", program: "Klassik, Jazz und Pop" },
        { date: "2025-05-10T19:30:00", title: "Konzert in Salzburg", location: "Kleiner Saal, Musikum Salzburg Stadt", program: "Werke von Mozart, Orff, Bizet, Dukas, Beethoven, Schostakowitsch, Rihm und Lutosławski" },
        { date: "2024-12-14T19:30:00", title: "Konzert in Hallein", location: "Salinenbühne, Pernerinsel", program: "Werke von Mozart, Woelfl und Eigenkompositionen" },
        { date: "2024-11-02T18:00:00", title: "Auftritt beim Fauré Festival 2024", location: "Solitär, Universität Mozarteum", program: "Werke von Fauré" },
        { date: "2024-02-12T19:00:00", title: "Konzert in Wien", location: "Gesellschaft für Musiktheater", program: "Werke von Woelfl, Schubert, Schostakowitsch, Zech und Gershwin" }
    ];

    const upcomingList = document.querySelector('.concerts-list.upcoming');
    const pastList = document.querySelector('.concerts-list.past');
    const now = new Date();

    upcomingList.innerHTML = '';
    pastList.innerHTML = '';

    // Sortieren (Zukunft aufsteigend)
    concertData.sort((a, b) => new Date(a.date) - new Date(b.date));

    concertData.forEach(concert => {
        const cDate = new Date(concert.date);
        const dateString = cDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
        const timeString = concert.date.includes('T') ? `, ${cDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr` : '';

        const html = `
            <div class="concert-item">
                <h3>${concert.title}</h3>
                <p><strong>Datum:</strong> ${dateString}${timeString}</p>
                <p><strong>Ort:</strong> ${concert.location}</p>
                <p><strong>Programm:</strong> ${concert.program}</p>
            </div>`;

        if (cDate >= now) {
            upcomingList.innerHTML += html;
        } else {
            pastList.insertAdjacentHTML('afterbegin', html);
        }
    });

    if (upcomingList.innerHTML === '') upcomingList.innerHTML = '<p>Aktuell sind keine Konzerte geplant.</p>';

    // --- NAVIGATION (Hamburger & Smooth Scroll) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');

            // Smooth Scroll Logic
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // --- LIGHTBOX (Galerie) ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
    }

    function openLightbox(src, creditText) {
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${src}" class="lightbox-img">
                <div class="lightbox-meta"><div class="lightbox-credit">${creditText}</div></div>
            </div>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        lightbox.querySelector('.lightbox-backdrop').onclick = closeLightbox;
        lightbox.querySelector('.lightbox-close').onclick = closeLightbox;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItems.forEach(img => {
        img.onclick = () => openLightbox(img.src, img.dataset.credit || '');
    });

    window.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
});



