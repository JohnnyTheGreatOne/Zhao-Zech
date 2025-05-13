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

// Lightbox-Funktionalität für die Gallerie
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = this.src;
            img.alt = this.alt;
            
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            lightbox.appendChild(img);
        });
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });

    // Automatische Sortierung von Konzerten in vergangen und bevorstehend
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Uhrzeit auf Mitternacht setzen für genauen Vergleich
    
    const concertItems = document.querySelectorAll('.concerts-list.upcoming .concert-item');
    const pastConcertsList = document.querySelector('.concerts-list.past');
    
    concertItems.forEach(item => {
        const dateText = item.querySelector('p:first-of-type').textContent;
        // Erweiterter RegEx, der verschiedene Datumsformate handhabt
        const dateMatch = dateText.match(/(\d{1,2})\.\s(\w+)\s(\d{4})(?:,\s(\d{1,2}):(\d{2}))?/);
        
        if (dateMatch) {
            const day = parseInt(dateMatch[1]);
            const monthName = dateMatch[2];
            const year = parseInt(dateMatch[3]);
            const hour = dateMatch[4] ? parseInt(dateMatch[4]) : 0;
            const minute = dateMatch[5] ? parseInt(dateMatch[5]) : 0;
            
            // Monatsnamen in Zahlen umwandeln
            const months = {
                'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
                'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
            };
            
            const month = months[monthName];
            const concertDate = new Date(year, month, day, hour, minute);
            
            if (concertDate < today) {
                item.classList.add('past');
                pastConcertsList.appendChild(item);
            }
        }
    });
    
    // Verstecke den "Vergangene Konzerte"-Abschnitt wenn keine vorhanden sind
    if (pastConcertsList.children.length === 0) {
        document.querySelector('.past-concerts-title').style.display = 'none';
    } else {
        // Sortiere vergangene Konzerte nach Datum (neueste zuerst)
        const pastItems = Array.from(pastConcertsList.children);
        pastItems.sort((a, b) => {
            const dateA = getDateFromItem(a);
            const dateB = getDateFromItem(b);
            return dateB - dateA; // Absteigende Sortierung
        });
        
        // Leere die Liste und füge sortierte Elemente wieder ein
        pastConcertsList.innerHTML = '';
        pastItems.forEach(item => pastConcertsList.appendChild(item));
    }
});

// Hilfsfunktion zum Extrahieren des Datums aus einem Konzert-Item
function getDateFromItem(item) {
    const dateText = item.querySelector('p:first-of-type').textContent;
    const dateMatch = dateText.match(/(\d{1,2})\.\s(\w+)\s(\d{4})(?:,\s(\d{1,2}):(\d{2}))?/);
    
    if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthName = dateMatch[2];
        const year = parseInt(dateMatch[3]);
        const hour = dateMatch[4] ? parseInt(dateMatch[4]) : 0;
        const minute = dateMatch[5] ? parseInt(dateMatch[5]) : 0;
        
        const months = {
            'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
            'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
        };
        
        const month = months[monthName];
        return new Date(year, month, day, hour, minute);
    }
    return new Date(0); // Falls kein Datum gefunden, sehr altes Datum zurückgeben
}
