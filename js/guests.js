// HotelFlow Manager - Guests Management & Loyalty System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Guests management system loaded');
    
    // Inizializza i datepicker
    initDatepickers();
    
    // Carica gli ospiti
    loadGuests();
    
    // Inizializza i filtri
    initFilters();
    
    // Setup event listeners
    setupEventListeners();
    
    // Carica le camere disponibili per check-in
    loadAvailableRooms();
});

// DATI DI ESEMPIO - OSPITI CON SISTEMA FEDELTÀ
const sampleGuests = [
    {
        id: 'guest-001',
        guestId: 'HOTEL-00123',
        firstName: 'Mario',
        lastName: 'Rossi',
        fullName: 'Mario Rossi',
        email: 'mario.rossi@email.com',
        phone: '+39 333 1234567',
        birthDate: '1985-06-15',
        gender: 'male',
        nationality: 'IT',
        language: 'it',
        address: 'Via Roma 123, 00100 Roma, Italia',
        registrationDate: '2023-01-15',
        
        // Sistema Fedeltà
        loyalty: {
            level: 'platinum',
            points: 12500,
            joinDate: '2023-01-15',
            benefits: ['welcome-drink', 'late-checkout', 'room-upgrade', 'free-breakfast', 'spa-discount', 'birthday-gift'],
            nextReward: 15000,
            cardNumber: 'HFL-00123-PLT'
        },
        
        // Preferenze
        preferences: {
            room: ['high-floor', 'quiet', 'sea-view'],
            dietary: [],
            allergies: 'Nessuna allergia conosciuta',
            specialNotes: 'Preferisce camera silenziosa, lontano dall\'ascensore'
        },
        
        // Documenti
        documents: {
            type: 'id-card',
            number: 'RM1234567',
            issueDate: '2020-05-20',
            expiryDate: '2030-05-20',
            authority: 'Comune di Roma'
        },
        
        // Statistiche
        stats: {
            totalBookings: 12,
            totalNights: 45,
            totalSpent: 8500,
            averageRating: 4.8,
            lastStay: '2024-01-20'
        },
        
        // Stato attuale
        status: 'in-hotel',
        currentRoom: '101',
        currentBooking: 'RES-2024-001',
        checkInDate: '2024-01-20',
        checkOutDate: '2024-01-23',
        
        // Storia soggiorni
        stayHistory: [
            { date: '2024-01-20', room: '101', nights: 3, amount: 360 },
            { date: '2023-12-10', room: '205', nights: 5, amount: 600 },
            { date: '2023-10-05', room: '102', nights: 2, amount: 240 }
        ],
        
        // Blacklist status
        blacklisted: false,
        notes: 'Cliente fedele, sempre soddisfatto'
    },
    {
        id: 'guest-002',
        guestId: 'HOTEL-00124',
        firstName: 'Laura',
        lastName: 'Bianchi',
        fullName: 'Laura Bianchi',
        email: 'laura.bianchi@email.com',
        phone: '+39 334 2345678',
        birthDate: '1990-03-22',
        gender: 'female',
        nationality: 'IT',
        language: 'it',
        address: 'Via Milano 45, 20100 Milano, Italia',
        registrationDate: '2023-03-10',
        
        loyalty: {
            level: 'gold',
            points: 6500,
            joinDate: '2023-03-10',
            benefits: ['welcome-drink', 'late-checkout', 'room-upgrade'],
            nextReward: 10000,
            cardNumber: 'HFL-00124-GLD'
        },
        
        preferences: {
            room: ['sea-view', 'quiet'],
            dietary: ['vegetarian'],
            allergies: 'Intollerante al lattosio',
            specialNotes: 'Celebrazione anniversario, gradirebbe fiori in camera'
        },
        
        documents: {
            type: 'passport',
            number: 'YA123456',
            issueDate: '2019-08-15',
            expiryDate: '2029-08-15',
            authority: 'Polizia di Stato'
        },
        
        stats: {
            totalBookings: 8,
            totalNights: 25,
            totalSpent: 4500,
            averageRating: 4.5,
            lastStay: '2024-01-21'
        },
        
        status: 'in-hotel',
        currentRoom: '205',
        currentBooking: 'RES-2024-002',
        checkInDate: '2024-01-21',
        checkOutDate: '2024-01-25',
        
        stayHistory: [
            { date: '2024-01-21', room: '205', nights: 4, amount: 480 },
            { date: '2023-11-15', room: '104', nights: 3, amount: 450 }
        ],
        
        blacklisted: false,
        notes: 'Cliente VIP, vegetariana'
    },
    {
        id: 'guest-003',
        guestId: 'HOTEL-00125',
        firstName: 'Giuseppe',
        lastName: 'Verdi',
        fullName: 'Giuseppe Verdi',
        email: 'g.verdi@email.com',
        phone: '+39 335 3456789',
        birthDate: '1978-11-30',
        gender: 'male',
        nationality: 'IT',
        language: 'it',
        address: 'Via Verdi 78, 10100 Torino, Italia',
        registrationDate: '2023-05-20',
        
        loyalty: {
            level: 'silver',
            points: 2500,
            joinDate: '2023-05-20',
            benefits: ['welcome-drink', 'late-checkout'],
            nextReward: 5000,
            cardNumber: 'HFL-00125-SLV'
        },
        
        preferences: {
            room: ['away-elevator'],
            dietary: [],
            allergies: 'Nessuna',
            specialNotes: 'Viaggia per lavoro, arriva spesso tardi la sera'
        },
        
        documents: {
            type: 'id-card',
            number: 'TO9876543',
            issueDate: '2021-02-10',
            expiryDate: '2031-02-10',
            authority: 'Comune di Torino'
        },
        
        stats: {
            totalBookings: 5,
            totalNights: 12,
            totalSpent: 1800,
            averageRating: 4.2,
            lastStay: '2024-01-22'
        },
        
        status: 'in-hotel',
        currentRoom: '312',
        currentBooking: 'RES-2024-003',
        checkInDate: '2024-01-22',
        checkOutDate: '2024-01-24',
        
        stayHistory: [
            { date: '2024-01-22', room: '312', nights: 2, amount: 160 }
        ],
        
        blacklisted: false,
        notes: 'Viaggiatore business'
    },
    {
        id: 'guest-004',
        guestId: 'HOTEL-00126',
        firstName: 'Anna',
        lastName: 'Neri',
        fullName: 'Anna Neri',
        email: 'anna.neri@email.com',
        phone: '+39 336 4567890',
        birthDate: '1982-08-08',
        gender: 'female',
        nationality: 'DE',
        language: 'de',
        address: 'Hauptstrasse 12, 10115 Berlin, Deutschland',
        registrationDate: '2023-07-12',
        
        loyalty: {
            level: 'bronze',
            points: 800,
            joinDate: '2023-07-12',
            benefits: ['welcome-drink'],
            nextReward: 1000,
            cardNumber: 'HFL-00126-BRZ'
        },
        
        preferences: {
            room: ['non-smoking', 'quiet'],
            dietary: ['gluten-free'],
            allergies: 'Celiachia',
            specialNotes: 'Famiglia con 2 bambini piccoli'
        },
        
        documents: {
            type: 'passport',
            number: 'C12345678',
            issueDate: '2022-01-10',
            expiryDate: '2032-01-10',
            authority: 'Bundesdruckerei'
        },
        
        stats: {
            totalBookings: 3,
            totalNights: 14,
            totalSpent: 2100,
            averageRating: 4.7,
            lastStay: '2024-01-19'
        },
        
        status: 'checked-out',
        currentRoom: null,
        currentBooking: null,
        checkInDate: null,
        checkOutDate: null,
        
        stayHistory: [
            { date: '2024-01-19', room: '408', nights: 7, amount: 1050 },
            { date: '2023-09-05', room: '105', nights: 4, amount: 300 },
            { date: '2023-07-12', room: '201', nights: 3, amount: 330 }
        ],
        
        blacklisted: false,
        notes: 'Cliente tedesco, celiaca'
    }
];

// DATI LIVELLI FEDELTÀ
const loyaltyLevels = {
    'bronze': {
        name: 'Bronzo',
        color: '#92400e',
        bgColor: '#fef3c7',
        minPoints: 0,
        maxPoints: 999,
        benefits: ['Drink di benvenuto'],
        discount: 5
    },
    'silver': {
        name: 'Argento',
        color: '#6b7280',
        bgColor: '#f3f4f6',
        minPoints: 1000,
        maxPoints: 4999,
        benefits: ['Drink di benvenuto', 'Late check-out (14:00)'],
        discount: 10
    },
    'gold': {
        name: 'Oro',
        color: '#b45309',
        bgColor: '#fef3c7',
        minPoints: 5000,
        maxPoints: 9999,
        benefits: ['Drink di benvenuto', 'Late check-out (16:00)', 'Upgrade camera (se disponibile)'],
        discount: 15
    },
    'platinum': {
        name: 'Platino',
        color: '#1e40af',
        bgColor: '#dbeafe',
        minPoints: 10000,
        maxPoints: 99999,
        benefits: ['Drink di benvenuto', 'Late check-out (18:00)', 'Upgrade camera', 'Colazione gratuita', 'Sconto SPA 20%', 'Regalo compleanno'],
        discount: 20
    }
};

// INIZIALIZZA I DATEPICKER
function initDatepickers() {
    flatpickr.localize(flatpickr.l10ns.it);
    
    const datepickerOptions = {
        dateFormat: 'd/m/Y',
        locale: 'it'
    };
    
    // Inizializza tutti i datepicker
    document.querySelectorAll('.datepicker').forEach(input => {
        flatpickr(input, datepickerOptions);
    });
}

// CARICA GLI OSPITI
function loadGuests(filteredGuests = null) {
    const guests = filteredGuests || sampleGuests;
    
    // Aggiorna le statistiche
    updateGuestStats(guests);
    
    // Carica la vista grid
    loadGuestGrid(guests);
    
    // Carica la vista tabella
    loadGuestTable(guests);
}

// AGGIORNA LE STATISTICHE
function updateGuestStats(guests) {
    const stats = {
        total: guests.length,
        'current': guests.filter(g => g.status === 'in-hotel').length,
        'vip': guests.filter(g => g.loyalty.level === 'platinum' || g.loyalty.level === 'gold').length,
        'loyalty': guests.filter(g => g.loyalty.points > 0).length,
        'birthday': guests.filter(g => isBirthdayToday(g.birthDate)).length
    };
    
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.getElementById(`${key}-guests`);
        if (element) {
            animateCounter(element, value);
        }
    });
    
    // Aggiorna i badge nel menu
    const vipCount = document.getElementById('vip-count');
    if (vipCount) vipCount.textContent = stats.vip;
}

// ANIMAZIONE CONTATORI
function animateCounter(element, target) {
    const current = parseInt(element.textContent) || 0;
    
    if (current === target) {
        element.textContent = target;
        return;
    }
    
    const duration = 500;
    const steps = 30;
    const increment = (target - current) / steps;
    const stepTime = duration / steps;
    
    let currentValue = current;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        currentValue += increment;
        
        if (step >= steps) {
            currentValue = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(currentValue);
    }, stepTime);
}

// CONTROLLA SE È COMPLEANNO OGGI
function isBirthdayToday(birthDate) {
    if (!birthDate) return false;
    
    const today = new Date();
    const birth = new Date(birthDate);
    
    return today.getDate() === birth.getDate() && 
           today.getMonth() === birth.getMonth();
}

// CARICA LA VISTA GRID
function loadGuestGrid(guests) {
    const grid = document.getElementById('guests-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    guests.forEach(guest => {
        const guestCard = createGuestCard(guest);
        grid.appendChild(guestCard);
    });
}

// CREA UNA CARD PER L'OSPITE
function createGuestCard(guest) {
    const card = document.createElement('div');
    
    // Determina le classi CSS
    let cardClass = 'guest-card';
    let badgeClass = '';
    let badgeText = '';
    
    if (guest.loyalty.level === 'platinum' || guest.loyalty.level === 'gold') {
        cardClass += ' vip';
        badgeClass = 'badge-vip';
        badgeText = 'VIP';
    } else if (guest.loyalty.points > 0) {
        cardClass += ' loyalty';
        badgeClass = 'badge-loyalty';
        badgeText = 'Fedeltà';
    }
    
    if (guest.status === 'in-hotel') {
        cardClass += ' checkin';
        if (!badgeClass) {
            badgeClass = 'badge-checkin';
            badgeText = 'In Hotel';
        }
    }
    
    card.className = cardClass;
    card.dataset.id = guest.id;
    
    const loyaltyLevel = loyaltyLevels[guest.loyalty.level];
    const progress = ((guest.loyalty.points - loyaltyLevel.minPoints) / 
                     (loyaltyLevel.maxPoints - loyaltyLevel.minPoints)) * 100;
    
    card.innerHTML = `
        ${badgeClass ? `<div class="guest-badge ${badgeClass}">${badgeText}</div>` : ''}
        
        <div class="guest-header">
            <div class="guest-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="guest-name">${guest.fullName}</div>
            <div class="guest-email">${guest.email}</div>
            <div class="guest-id">${guest.guestId}</div>
        </div>
        
        <div class="guest-content">
            <div class="guest-info">
                <div class="guest-detail">
                    <span class="detail-label">
                        <i class="fas fa-phone"></i> Telefono
                    </span>
                    <span class="detail-value">${guest.phone}</span>
                </div>
                <div class="guest-detail">
                    <span class="detail-label">
                        <i class="fas fa-flag"></i> Nazionalità
                    </span>
                    <span class="detail-value">${getCountryName(guest.nationality)}</span>
                </div>
                <div class="guest-detail">
                    <span class="detail-label">
                        <i class="fas fa-calendar"></i> Registrazione
                    </span>
                    <span class="detail-value">${formatDate(guest.registrationDate)}</span>
                </div>
                ${guest.status === 'in-hotel' ? `
                    <div class="guest-detail">
                        <span class="detail-label">
                            <i class="fas fa-bed"></i> Camera
                        </span>
                        <span class="detail-value">${guest.currentRoom}</span>
                    </div>
                    <div class="guest-detail">
                        <span class="detail-label">
                            <i class="fas fa-calendar"></i> Check-out
                        </span>
                        <span class="detail-value">${formatDate(guest.checkOutDate)}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="loyalty-info">
                <div class="loyalty-level">
                    <span class="level-badge ${guest.loyalty.level}">${loyaltyLevel.name}</span>
                    <span class="points">${guest.loyalty.points} punti</span>
                </div>
                <div class="points-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                    <div class="progress-labels">
                        <span>${loyaltyLevel.minPoints}</span>
                        <span>${loyaltyLevel.maxPoints}</span>
                    </div>
                </div>
            </div>
            
            <div class="guest-actions">
                <button class="guest-action-btn action-view" onclick="viewGuest('${guest.id}')">
                    <i class="fas fa-eye"></i> Dettagli
                </button>
                ${guest.status === 'in-hotel' ? `
                    <button class="guest-action-btn action-checkin" onclick="quickCheckout('${guest.id}')">
                        <i class="fas fa-door-closed"></i> Check-out
                    </button>
                ` : `
                    <button class="guest-action-btn action-checkin" onclick="quickCheckin('${guest.id}')">
                        <i class="fas fa-door-open"></i> Check-in
                    </button>
                `}
            </div>
        </div>
    `;
    
    return card;
}

// CARICA LA VISTA TABELLA
function loadGuestTable(guests) {
    const tableBody = document.getElementById('guests-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    guests.forEach(guest => {
        const row = createGuestTableRow(guest);
        tableBody.appendChild(row);
    });
}

// CREA UNA RIGA PER LA TABELLA
function createGuestTableRow(guest) {
    const row = document.createElement('tr');
    const loyaltyLevel = loyaltyLevels[guest.loyalty.level];
    
    row.innerHTML = `
        <td><input type="checkbox" class="guest-checkbox" data-id="${guest.id}"></td>
        <td><strong>${guest.guestId}</strong></td>
        <td>${guest.fullName}</td>
        <td><span class="level-badge ${guest.loyalty.level}">${loyaltyLevel.name}</span></td>
        <td><strong>${guest.loyalty.points}</strong></td>
        <td>${guest.stats.totalBookings}</td>
        <td>${guest.stats.totalNights}</td>
        <td>€${guest.stats.totalSpent}</td>
        <td>
            <span class="status-badge ${guest.status === 'in-hotel' ? 'status-checked-in' : 'status-available'}">
                ${guest.status === 'in-hotel' ? 'In Hotel' : 'Disponibile'}
            </span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" title="Visualizza" onclick="viewGuest('${guest.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Modifica" onclick="editGuest('${guest.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn checkin" title="Check-in/out" onclick="toggleGuestStatus('${guest.id}')">
                    <i class="fas fa-door-open"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// INIZIALIZZA I FILTRI
function initFilters() {
    // Filtri per categoria
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterGuests(filter);
        });
    });
    
    // Filtro per livello fedeltà
    document.getElementById('filter-loyalty').addEventListener('change', function() {
        filterGuests();
    });
    
    // Filtro per nazionalità
    document.getElementById('filter-nationality').addEventListener('change', function() {
        filterGuests();
    });
    
    // Filtro per compleanno
    document.getElementById('filter-birthday').addEventListener('change', function() {
        filterGuests();
    });
    
    // Ricerca
    const searchInput = document.getElementById('guest-search');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterGuests();
        }, 300);
    });
}

// FILTRA GLI OSPITI
function filterGuests(categoryFilter = null) {
    const activeFilter = categoryFilter || document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const loyaltyFilter = document.getElementById('filter-loyalty').value;
    const nationalityFilter = document.getElementById('filter-nationality').value;
    const birthdayFilter = document.getElementById('filter-birthday').value;
    const searchQuery = document.getElementById('guest-search').value.toLowerCase();
    
    const filtered = sampleGuests.filter(guest => {
        let match = true;
        
        // Filtro per categoria
        if (activeFilter !== 'all') {
            switch (activeFilter) {
                case 'vip':
                    match = guest.loyalty.level === 'platinum' || guest.loyalty.level === 'gold';
                    break;
                case 'checkin':
                    match = guest.status === 'in-hotel';
                    break;
                case 'loyalty':
                    match = guest.loyalty.points > 0;
                    break;
                case 'blacklist':
                    match = guest.blacklisted === true;
                    break;
            }
        }
        
        // Filtro per livello fedeltà
        if (loyaltyFilter !== '' && guest.loyalty.level !== loyaltyFilter) {
            match = false;
        }
        
        // Filtro per nazionalità
        if (nationalityFilter !== '' && guest.nationality !== nationalityFilter) {
            match = false;
        }
        
        // Filtro per compleanno
        if (birthdayFilter !== '') {
            const birthDate = new Date(guest.birthDate);
            const today = new Date();
            
            switch (birthdayFilter) {
                case 'this-month':
                    match = birthDate.getMonth() === today.getMonth();
                    break;
                case 'next-month':
                    let nextMonth = today.getMonth() + 1;
                    if (nextMonth > 11) nextMonth = 0;
                    match = birthDate.getMonth() === nextMonth;
                    break;
                case 'today':
                    match = isBirthdayToday(guest.birthDate);
                    break;
            }
        }
        
        // Filtro per ricerca
        if (searchQuery) {
            const searchText = `${guest.fullName} ${guest.email} ${guest.phone} ${guest.guestId}`.toLowerCase();
            if (!searchText.includes(searchQuery)) {
                match = false;
            }
        }
        
        return match;
    });
    
    loadGuests(filtered);
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Pulsante nuovo ospite
    document.getElementById('add-guest-btn').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Nuovo Ospite';
        document.getElementById('guest-modal').classList.add('show');
        resetGuestForm();
        updateLoyaltyCardPreview();
    });
    
    // Pulsante check-in rapido
    document.getElementById('quick-checkin-btn').addEventListener('click', () => {
        document.getElementById('quick-checkin-modal').classList.add('show');
        resetQuickForms();
    });
    
    // Tabs nel form ospite
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Tabs nel modal check-in rapido
    document.querySelectorAll('.quick-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            switchQuickTab(action);
        });
    });
    
    // Aggiorna la card fedeltà in tempo reale
    document.getElementById('guest-loyalty-level').addEventListener('change', updateLoyaltyCardPreview);
    document.getElementById('guest-points').addEventListener('input', updateLoyaltyCardPreview);
    
    // Calcola il prezzo per day use
    document.getElementById('dayuse-duration').addEventListener('change', calculateDayUsePrice);
    
    // Submit form ospite
    document.getElementById('guest-form').addEventListener('submit', submitGuestForm);
    
    // Select all checkbox
    document.getElementById('select-all-guests').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.guest-checkbox');
        checkboxes.forEach(cb => cb.checked = this.checked);
    });
    
    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
    
    // Click fuori dal modal
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

// SWITCH TAB NEL FORM
function switchTab(tabName) {
    // Nascondi tutti i tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Rimuovi active da tutti i tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostra il tab selezionato
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Attiva il tab button
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
}

// SWITCH TAB NEL MODAL CHECK-IN RAPIDO
function switchQuickTab(action) {
    // Nascondi tutti i form
    document.querySelectorAll('.quick-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Rimuovi active da tutti i tab
    document.querySelectorAll('.quick-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostra il form selezionato
    document.getElementById(`${action}-form`).classList.add('active');
    
    // Attiva il tab
    document.querySelector(`.quick-tab[data-action="${action}"]`).classList.add('active');
}

// AGGIORNA L'ANTEPRIMA DELLA CARD FEDELTÀ
function updateLoyaltyCardPreview() {
    const level = document.getElementById('guest-loyalty-level').value;
    const points = document.getElementById('guest-points').value || 0;
    const firstName = document.getElementById('guest-firstname').value || 'Nome';
    const lastName = document.getElementById('guest-lastname').value || 'Ospite';
    
    const card = document.querySelector('.loyalty-card');
    const levelBadge = document.querySelector('.level-badge');
    const previewId = document.getElementById('preview-id');
    const previewPoints = document.getElementById('preview-points');
    const previewExpiry = document.getElementById('preview-expiry');
    
    // Aggiorna i colori della card
    card.className = 'loyalty-card';
    card.classList.add(level);
    
    // Aggiorna il livello
    if (levelBadge) {
        levelBadge.textContent = level.toUpperCase();
        levelBadge.className = 'level-badge';
        levelBadge.classList.add(level);
    }
    
    // Aggiorna i dati
    if (previewId) previewId.textContent = `HFL-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}-${level.substring(0, 3).toUpperCase()}`;
    if (previewPoints) previewPoints.textContent = `${points} Punti`;
    
    // Data di scadenza (un anno da oggi)
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    if (previewExpiry) previewExpiry.textContent = formatDate(expiry);
    
    // Aggiorna il nome nell'anteprima (se disponibile)
    const guestName = document.querySelector('.guest-name');
    if (guestName && firstName && lastName) {
        guestName.textContent = `${firstName} ${lastName}`;
    }
}

// CARICA LE CAMERE DISPONIBILI
function loadAvailableRooms() {
    // In un'app reale, qui faresti una chiamata API per le camere disponibili
    const availableRooms = ['101', '102', '103', '104', '105', '201', '202', '203'];
    
    const checkinSelect = document.getElementById('checkin-room');
    const dayuseSelect = document.getElementById('dayuse-room');
    
    if (checkinSelect) {
        checkinSelect.innerHTML = '<option value="">Seleziona camera disponibile</option>';
        availableRooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = `Camera ${room}`;
            checkinSelect.appendChild(option);
        });
    }
    
    if (dayuseSelect) {
        dayuseSelect.innerHTML = '<option value="">Seleziona camera per day use</option>';
        availableRooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = `Camera ${room} (Day Use)`;
            dayuseSelect.appendChild(option);
        });
    }
}

// CALCOLA PREZZO DAY USE
function calculateDayUsePrice() {
    const duration = document.getElementById('dayuse-duration').value;
    let basePrice = 50;
    let extra = 0;
    
    switch (duration) {
        case '4':
            basePrice = 50;
            break;
        case '6':
            basePrice = 70;
            extra = 20;
            break;
        case '8':
            basePrice = 90;
            extra = 40;
            break;
        case '12':
            basePrice = 120;
            extra = 70;
            break;
        case 'full':
            basePrice = 150;
            extra = 100;
            break;
    }
    
    document.getElementById('dayuse-base').textContent = `€${basePrice}.00`;
    document.getElementById('dayuse-extra').textContent = extra > 0 ? `€${extra}.00` : '€0.00';
    document.getElementById('dayuse-total').textContent = `€${basePrice}.00`;
}

// RESETTA IL FORM OSPITE
function resetGuestForm() {
    document.getElementById('guest-form').reset();
    document.getElementById('guest-loyalty-level').value = 'bronze';
    document.getElementById('guest-points').value = 0;
    document.getElementById('guest-gender').value = '';
    document.getElementById('guest-nationality').value = '';
    document.getElementById('guest-language').value = 'it';
    document.getElementById('guest-birthdate').value = '';
    
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.name === 'benefits' && cb.value === 'welcome-drink') {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });
}

// RESETTA I FORM RAPIDI
function resetQuickForms() {
    document.querySelectorAll('.quick-form input, .quick-form select, .quick-form textarea').forEach(element => {
        if (element.type !== 'checkbox') {
            element.value = '';
        }
    });
    
    // Reset valori di default
    document.getElementById('checkin-time').value = '14:00';
    document.getElementById('checkout-time').value = '10:00';
    document.getElementById('checkin-payment').value = 'card';
    document.getElementById('generate-invoice').checked = true;
    document.getElementById('send-email').checked = false;
    document.getElementById('dayuse-date').value = new Date().toLocaleDateString('it-IT');
    document.getElementById('dayuse-duration').value = '4';
    document.getElementById('dayuse-guests').value = 1;
    
    // Pulisci risultati ricerca
    document.getElementById('checkin-results').innerHTML = '';
    document.getElementById('checkout-results').innerHTML = '';
    
    // Reset summary
    document.getElementById('stay-amount').textContent = '€0.00';
    document.getElementById('extra-amount').textContent = '€0.00';
    document.getElementById('tax-amount').textContent = '€0.00';
    document.getElementById('checkout-total').textContent = '€0.00';
    
    calculateDayUsePrice();
}

// CERCA OSPITE PER CHECK-IN
function searchGuestForCheckin() {
    const query = document.getElementById('checkin-search').value.toLowerCase();
    const results = document.getElementById('checkin-results');
    
    if (!query) {
        results.style.display = 'none';
        return;
    }
    
    const filtered = sampleGuests.filter(guest => 
        guest.fullName.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.includes(query)
    );
    
    results.innerHTML = '';
    
    if (filtered.length === 0) {
        results.innerHTML = '<div class="guest-result-item">Nessun ospite trovato</div>';
    } else {
        filtered.forEach(guest => {
            const item = document.createElement('div');
            item.className = 'guest-result-item';
            item.innerHTML = `
                <strong>${guest.fullName}</strong><br>
                <small>${guest.email} | ${guest.phone}</small>
            `;
            item.onclick = () => selectGuestForCheckin(guest);
            results.appendChild(item);
        });
    }
    
    results.style.display = 'block';
}

// SELEZIONA OSPITE PER CHECK-IN
function selectGuestForCheckin(guest) {
    document.getElementById('checkin-search').value = guest.fullName;
    document.getElementById('checkin-results').innerHTML = '';
    document.getElementById('checkin-results').style.display = 'none';
    
    // Mostra informazioni aggiuntive (in un'app reale)
    showNotification(`Ospite selezionato: ${guest.fullName}`);
}

// CERCA OSPITE PER CHECK-OUT
function searchGuestForCheckout() {
    const query = document.getElementById('checkout-search').value.toLowerCase();
    const results = document.getElementById('checkout-results');
    
    if (!query) {
        results.style.display = 'none';
        return;
    }
    
    // Filtra solo gli ospiti in hotel
    const filtered = sampleGuests.filter(guest => 
        guest.status === 'in-hotel' &&
        (guest.fullName.toLowerCase().includes(query) ||
         guest.currentRoom?.includes(query))
    );
    
    results.innerHTML = '';
    
    if (filtered.length === 0) {
        results.innerHTML = '<div class="guest-result-item">Nessun ospite in hotel trovato</div>';
    } else {
        filtered.forEach(guest => {
            const item = document.createElement('div');
            item.className = 'guest-result-item';
            item.innerHTML = `
                <strong>${guest.fullName}</strong><br>
                <small>Camera ${guest.currentRoom} | Check-out: ${formatDate(guest.checkOutDate)}</small>
            `;
            item.onclick = () => selectGuestForCheckout(guest);
            results.appendChild(item);
        });
    }
    
    results.style.display = 'block';
}

// SELEZIONA OSPITE PER CHECK-OUT
function selectGuestForCheckout(guest) {
    document.getElementById('checkout-search').value = guest.fullName;
    document.getElementById('checkout-results').innerHTML = '';
    document.getElementById('checkout-results').style.display = 'none';
    
    // Calcola il totale
    calculateCheckoutTotal(guest);
}

// CALCOLA TOTALE CHECK-OUT
function calculateCheckoutTotal(guest) {
    // In un'app reale, qui prenderesti i dati dalla prenotazione
    const stayAmount = 360; // Esempio
    const extraAmount = 50; // Esempio (servizi extra)
    const tax = (stayAmount + extraAmount) * 0.10;
    const total = stayAmount + extraAmount + tax;
    
    document.getElementById('stay-amount').textContent = `€${stayAmount.toFixed(2)}`;
    document.getElementById('extra-amount').textContent = `€${extraAmount.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `€${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `€${total.toFixed(2)}`;
}

// PROCESSO CHECK-IN RAPIDO
function processQuickCheckin() {
    const guestName = document.getElementById('checkin-search').value;
    const room = document.getElementById('checkin-room').value;
    const time = document.getElementById('checkin-time').value;
    const payment = document.getElementById('checkin-payment').value;
    const notes = document.getElementById('checkin-notes').value;
    
    if (!guestName || !room) {
        showNotification('Per favore, seleziona un ospite e una camera', 'warning');
        return;
    }
    
    // In un'app reale, qui faresti una chiamata API
    showNotification(`Check-in rapido eseguito per ${guestName} in camera ${room}`);
    
    // Chiudi il modal
    document.getElementById('quick-checkin-modal').classList.remove('show');
    
    // Aggiorna la lista ospiti
    loadGuests();
}

// PROCESSO CHECK-OUT RAPIDO
function processQuickCheckout() {
    const guestName = document.getElementById('checkout-search').value;
    const time = document.getElementById('checkout-time').value;
    const generateInvoice = document.getElementById('generate-invoice').checked;
    const sendEmail = document.getElementById('send-email').checked;
    
    if (!guestName) {
        showNotification('Per favore, seleziona un ospite', 'warning');
        return;
    }
    
    // In un'app reale, qui faresti una chiamata API
    let message = `Check-out eseguito per ${guestName}`;
    if (generateInvoice) message += ' con fattura generata';
    if (sendEmail) message += ' e inviata via email';
    
    showNotification(message);
    
    // Chiudi il modal
    document.getElementById('quick-checkin-modal').classList.remove('show');
    
    // Aggiorna la lista ospiti
    loadGuests();
}

// PROCESSO DAY USE
function processDayUse() {
    const name = document.getElementById('dayuse-name').value;
    const date = document.getElementById('dayuse-date').value;
    const duration = document.getElementById('dayuse-duration').value;
    const room = document.getElementById('dayuse-room').value;
    const guests = document.getElementById('dayuse-guests').value;
    
    if (!name || !room) {
        showNotification('Per favore, compila tutti i campi obbligatori', 'warning');
        return;
    }
    
    // In un'app reale, qui faresti una chiamata API
    showNotification(`Day Use creato per ${name} in camera ${room} (${duration} ore)`);
    
    // Chiudi il modal
    document.getElementById('quick-checkin-modal').classList.remove('show');
}

// SUBMIT FORM OSPITE
function submitGuestForm(e) {
    e.preventDefault();
    
    // Raccogli i dati dal form
    const firstName = document.getElementById('guest-firstname').value;
    const lastName = document.getElementById('guest-lastname').value;
    const email = document.getElementById('guest-email').value;
    const phone = document.getElementById('guest-phone').value;
    const birthDate = document.getElementById('guest-birthdate').value;
    const gender = document.getElementById('guest-gender').value;
    const nationality = document.getElementById('guest-nationality').value;
    const language = document.getElementById('guest-language').value;
    const address = document.getElementById('guest-address').value;
    
    const loyaltyLevel = document.getElementById('guest-loyalty-level').value;
    const points = parseInt(document.getElementById('guest-points').value) || 0;
    
    // Benefici selezionati
    const benefits = [];
    document.querySelectorAll('input[name="benefits"]:checked').forEach(cb => {
        benefits.push(cb.value);
    });
    
    // Preferenze camera
    const roomPrefs = [];
    document.querySelectorAll('input[name="room-pref"]:checked').forEach(cb => {
        roomPrefs.push(cb.value);
    });
    
    // Preferenze alimentari
    const dietPrefs = [];
    document.querySelectorAll('input[name="diet-pref"]:checked').forEach(cb => {
        dietPrefs.push(cb.value);
    });
    
    const allergies = document.getElementById('guest-allergies').value;
    const specialNotes = document.getElementById('guest-special-notes').value;
    
    // Documenti
    const idType = document.getElementById('guest-id-type').value;
    const idNumber = document.getElementById('guest-id-number').value;
    const idIssue = document.getElementById('guest-id-issue').value;
    const idExpiry = document.getElementById('guest-id-expiry').value;
    const idAuthority = document.getElementById('guest-id-authority').value;
    
    // Crea il nuovo ID
    const newId = `guest-${Date.now()}`;
    const guestId = `HOTEL-${String(sampleGuests.length + 1).padStart(5, '0')}`;
    
    const newGuest = {
        id: newId,
        guestId: guestId,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        birthDate: birthDate,
        gender: gender,
        nationality: nationality,
        language: language,
        address: address,
        registrationDate: new Date().toISOString().split('T')[0],
        
        loyalty: {
            level: loyaltyLevel,
            points: points,
            joinDate: new Date().toISOString().split('T')[0],
            benefits: benefits,
            nextReward: loyaltyLevels[loyaltyLevel].maxPoints,
            cardNumber: `HFL-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}-${loyaltyLevel.substring(0, 3).toUpperCase()}`
        },
        
        preferences: {
            room: roomPrefs,
            dietary: dietPrefs,
            allergies: allergies,
            specialNotes: specialNotes
        },
        
        documents: {
            type: idType,
            number: idNumber,
            issueDate: idIssue,
            expiryDate: idExpiry,
            authority: idAuthority
        },
        
        stats: {
            totalBookings: 0,
            totalNights: 0,
            totalSpent: 0,
            averageRating: 0,
            lastStay: null
        },
        
        status: 'available',
        currentRoom: null,
        currentBooking: null,
        checkInDate: null,
        checkOutDate: null,
        
        stayHistory: [],
        blacklisted: false,
        notes: specialNotes
    };
    
    // Aggiungi alla lista (in un'app reale, chiamata API)
    sampleGuests.push(newGuest);
    
    // Aggiorna la vista
    loadGuests();
    
    // Chiudi il modal
    document.getElementById('guest-modal').classList.remove('show');
    
    // Mostra notifica
    showNotification(`Ospite ${firstName} ${lastName} aggiunto con successo!`);
    
    console.log('New guest:', newGuest);
}

// FUNZIONI PER LE AZIONI
function viewGuest(id) {
    const guest = sampleGuests.find(g => g.id === id);
    if (!guest) return;
    
    const modal = document.getElementById('guest-detail-modal');
    const content = document.getElementById('guest-detail-content');
    
    const loyaltyLevel = loyaltyLevels[guest.loyalty.level];
    const progress = ((guest.loyalty.points - loyaltyLevel.minPoints) / 
                     (loyaltyLevel.maxPoints - loyaltyLevel.minPoints)) * 100;
    
    content.innerHTML = `
        <div class="guest-detail-sidebar">
            <div class="guest-detail-avatar">
                <i class="fas fa-user"></i>
            </div>
            <h2>${guest.fullName}</h2>
            <p>${guest.guestId}</p>
            
            <div class="loyalty-card ${guest.loyalty.level}" style="margin-top: 20px;">
                <div class="card-header">
                    <i class="fas fa-crown"></i>
                    <h4>HotelFlow Rewards</h4>
                </div>
                <div class="card-body">
                    <div class="guest-name">${guest.fullName}</div>
                    <div class="member-id">ID: ${guest.loyalty.cardNumber}</div>
                    <div class="member-level">
                        <span class="level-badge ${guest.loyalty.level}">${loyaltyLevel.name}</span>
                        <span class="points">${guest.loyalty.points} Punti</span>
                    </div>
                    <div class="expiry-date">Valida fino: 31/12/2024</div>
                </div>
            </div>
            
            <div class="loyalty-info" style="background: rgba(255,255,255,0.1); margin-top: 20px;">
                <div class="points-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                    <div class="progress-labels" style="color: white;">
                        <span>${loyaltyLevel.minPoints}</span>
                        <span>${loyaltyLevel.maxPoints}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="guest-detail-main">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Informazioni Personali</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${guest.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Telefono:</span>
                        <span class="detail-value">${guest.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data di Nascita:</span>
                        <span class="detail-value">${formatDate(guest.birthDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Genere:</span>
                        <span class="detail-value">${getGenderLabel(guest.gender)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nazionalità:</span>
                        <span class="detail-value">${getCountryName(guest.nationality)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Lingua:</span>
                        <span class="detail-value">${getLanguageName(guest.language)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Indirizzo:</span>
                        <span class="detail-value">${guest.address}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data Registrazione:</span>
                        <span class="detail-value">${formatDate(guest.registrationDate)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-medal"></i> Statistiche Fedeltà</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Livello:</span>
                        <span class="detail-value level-badge ${guest.loyalty.level}">${loyaltyLevel.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Punti Attuali:</span>
                        <span class="detail-value">${guest.loyalty.points}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prossimo Livello:</span>
                        <span class="detail-value">${loyaltyLevel.maxPoints} punti</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Sconto Applicato:</span>
                        <span class="detail-value">${loyaltyLevel.discount}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Benefici Attivi:</span>
                        <span class="detail-value">${guest.loyalty.benefits.map(b => getBenefitLabel(b)).join(', ')}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Statistiche Soggiorni</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Prenotazioni Totali:</span>
                        <span class="detail-value">${guest.stats.totalBookings}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Notti Totali:</span>
                        <span class="detail-value">${guest.stats.totalNights}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Spesa Totale:</span>
                        <span class="detail-value">€${guest.stats.totalSpent}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Valutazione Media:</span>
                        <span class="detail-value">${guest.stats.averageRating}/5</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ultimo Soggiorno:</span>
                        <span class="detail-value">${guest.stats.lastStay ? formatDate(guest.stats.lastStay) : 'Mai'}</span>
                    </div>
                </div>
            </div>
            
            ${guest.stayHistory.length > 0 ? `
                <div class="detail-section">
                    <h4><i class="fas fa-history"></i> Storia Soggiorni</h4>
                    <div class="stay-history">
                        ${guest.stayHistory.map(stay => `
                            <div class="stay-item">
                                <strong>${formatDate(stay.date)}</strong> - Camera ${stay.room}<br>
                                ${stay.nights} notti - €${stay.amount}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h4><i class="fas fa-sticky-note"></i> Note</h4>
                <p>${guest.notes || 'Nessuna nota'}</p>
            </div>
            
            <div class="detail-actions">
                <button class="btn-secondary modal-close">Chiudi</button>
                <button class="btn-primary" onclick="editGuest('${guest.id}')">
                    <i class="fas fa-edit"></i> Modifica
                </button>
                ${guest.status === 'in-hotel' ? `
                    <button class="btn-primary" onclick="quickCheckout('${guest.id}')">
                        <i class="fas fa-door-closed"></i> Check-out
                    </button>
                ` : `
                    <button class="btn-primary" onclick="quickCheckin('${guest.id}')">
                        <i class="fas fa-door-open"></i> Check-in
                    </button>
                `}
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function editGuest(id) {
    const guest = sampleGuests.find(g => g.id === id);
    if (!guest) return;
    
    // Popola il form con i dati dell'ospite
    document.getElementById('modal-title').textContent = `Modifica Ospite ${guest.fullName}`;
    
    document.getElementById('guest-firstname').value = guest.firstName;
    document.getElementById('guest-lastname').value = guest.lastName;
    document.getElementById('guest-email').value = guest.email;
    document.getElementById('guest-phone').value = guest.phone;
    document.getElementById('guest-birthdate').value = guest.birthDate;
    document.getElementById('guest-gender').value = guest.gender;
    document.getElementById('guest-nationality').value = guest.nationality;
    document.getElementById('guest-language').value = guest.language;
    document.getElementById('guest-address').value = guest.address;
    
    document.getElementById('guest-loyalty-level').value = guest.loyalty.level;
    document.getElementById('guest-points').value = guest.loyalty.points;
    
    // Benefici
    document.querySelectorAll('input[name="benefits"]').forEach(cb => {
        cb.checked = guest.loyalty.benefits.includes(cb.value);
    });
    
    // Preferenze camera
    document.querySelectorAll('input[name="room-pref"]').forEach(cb => {
        cb.checked = guest.preferences.room.includes(cb.value);
    });
    
    // Preferenze alimentari
    document.querySelectorAll('input[name="diet-pref"]').forEach(cb => {
        cb.checked = guest.preferences.dietary.includes(cb.value);
    });
    
    document.getElementById('guest-allergies').value = guest.preferences.allergies;
    document.getElementById('guest-special-notes').value = guest.preferences.specialNotes;
    
    // Documenti
    document.getElementById('guest-id-type').value = guest.documents.type;
    document.getElementById('guest-id-number').value = guest.documents.number;
    document.getElementById('guest-id-issue').value = guest.documents.issueDate;
    document.getElementById('guest-id-expiry').value = guest.documents.expiryDate;
    document.getElementById('guest-id-authority').value = guest.documents.authority;
    
    // Aggiungi l'ID dell'ospite al form
    const form = document.getElementById('guest-form');
    form.dataset.editingId = id;
    
    // Aggiorna l'anteprima della card
    updateLoyaltyCardPreview();
    
    // Mostra il modal
    document.getElementById('guest-modal').classList.add('show');
}

function quickCheckin(id) {
    const guest = sampleGuests.find(g => g.id === id);
    if (!guest) return;
    
    // Apri il modal check-in rapido
    document.getElementById('quick-checkin-modal').classList.add('show');
    switchQuickTab('checkin');
    
    // Pre-compila la ricerca
    document.getElementById('checkin-search').value = guest.fullName;
    
    // In un'app reale, qui potresti selezionare automaticamente l'ospite
    showNotification(`Pronto per check-in di ${guest.fullName}`);
}

function quickCheckout(id) {
    const guest = sampleGuests.find(g => g.id === id);
    if (!guest) return;
    
    // Apri il modal check-out rapido
    document.getElementById('quick-checkin-modal').classList.add('show');
    switchQuickTab('checkout');
    
    // Pre-compila la ricerca
    document.getElementById('checkout-search').value = guest.fullName;
    
    // Calcola il totale
    calculateCheckoutTotal(guest);
}

function toggleGuestStatus(id) {
    const guest = sampleGuests.find(g => g.id === id);
    if (!guest) return;
    
    if (guest.status === 'in-hotel') {
        quickCheckout(id);
    } else {
        quickCheckin(id);
    }
}

// FUNZIONI DI UTILITÀ
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT');
}

function getCountryName(code) {
    const countries = {
        'IT': 'Italia',
        'US': 'Stati Uniti',
        'UK': 'Regno Unito',
        'DE': 'Germania',
        'FR': 'Francia',
        'ES': 'Spagna'
    };
    return countries[code] || code;
}

function getLanguageName(code) {
    const languages = {
        'it': 'Italiano',
        'en': 'Inglese',
        'de': 'Tedesco',
        'fr': 'Francese',
        'es': 'Spagnolo'
    };
    return languages[code] || code;
}

function getGenderLabel(gender) {
    const labels = {
        'male': 'Maschio',
        'female': 'Femmina',
        'other': 'Altro'
    };
    return labels[gender] || 'Non specificato';
}

function getBenefitLabel(benefit) {
    const labels = {
        'welcome-drink': 'Drink di benvenuto',
        'late-checkout': 'Late check-out',
        'room-upgrade': 'Upgrade camera',
        'free-breakfast': 'Colazione gratuita',
        'spa-discount': 'Sconto SPA',
        'birthday-gift': 'Regalo compleanno'
    };
    return labels[benefit] || benefit;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'floating-notification';
    notification.textContent = message;
    
    const bgColor = type === 'warning' ? '#f59e0b' : '#10b981';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Aggiungi stili per le notifiche
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .status-badge {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        text-align: center;
        display: inline-block;
    }
    
    .status-available {
        background: #d1fae5;
        color: #065f46;
    }
    
    .status-checked-in {
        background: #e0e7ff;
        color: #3730a3;
    }
`;

document.head.appendChild(notificationStyle);