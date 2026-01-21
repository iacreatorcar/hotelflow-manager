// HotelFlow Manager - Main JavaScript
console.log('HotelFlow Manager loaded');

// Inizializza l'app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Esempio di dati mock
    const hotelData = {
        totalRooms: 50,
        occupiedRooms: 35,
        availableRooms: 15,
        todayCheckIns: 8,
        todayCheckOuts: 5,
        revenue: 12500
    };
    
    // Aggiorna contatori in homepage (se presenti)
    updateCounters(hotelData);
    
    // Gestione menu attivo
    setActiveMenu();
    
    // Aggiungi animazioni
    animateElements();
});

function updateCounters(data) {
    // Qui aggiorneremo i contatori nella dashboard
    console.log('Hotel Data:', data);
}

function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function animateElements() {
    // Aggiungi animazioni agli elementi
    const animatedElements = document.querySelectorAll('.feature-card, .btn-primary');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s, transform 0.5s';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}