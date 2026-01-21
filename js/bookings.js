// HotelFlow Manager - Bookings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bookings system loaded');
    
    // Inizializza i datepicker
    initDatepickers();
    
    // Carica le prenotazioni
    loadBookings();
    
    // Inizializza il calendario
    initCalendar();
    
    // Setup event listeners
    setupEventListeners();
    
    // Calcola il prezzo iniziale
    calculatePrice();
});

// DATI DI ESEMPIO
const sampleBookings = [
    {
        id: 'RES-2024-001',
        guest: 'Mario Rossi',
        email: 'mario.rossi@email.com',
        phone: '+39 333 1234567',
        room: '101 - Deluxe',
        roomType: 'deluxe',
        checkIn: '2024-01-20',
        checkOut: '2024-01-23',
        nights: 3,
        guests: 2,
        rooms: 1,
        total: 360,
        status: 'confirmed',
        notes: 'Richiesta camera vista mare'
    },
    {
        id: 'RES-2024-002',
        guest: 'Laura Bianchi',
        email: 'laura.bianchi@email.com',
        phone: '+39 334 2345678',
        room: '205 - Suite',
        roomType: 'suite',
        checkIn: '2024-01-21',
        checkOut: '2024-01-25',
        nights: 4,
        guests: 3,
        rooms: 1,
        total: 800,
        status: 'checked-in',
        notes: 'Celebrazione anniversario'
    },
    {
        id: 'RES-2024-003',
        guest: 'Giuseppe Verdi',
        email: 'g.verdi@email.com',
        phone: '+39 335 3456789',
        room: '312 - Standard',
        roomType: 'standard',
        checkIn: '2024-01-22',
        checkOut: '2024-01-24',
        nights: 2,
        guests: 1,
        rooms: 1,
        total: 160,
        status: 'pending',
        notes: 'Arrivo dopo le 20:00'
    },
    {
        id: 'RES-2024-004',
        guest: 'Anna Neri',
        email: 'anna.neri@email.com',
        phone: '+39 336 4567890',
        room: '408 - Famiglia',
        roomType: 'family',
        checkIn: '2024-01-19',
        checkOut: '2024-01-26',
        nights: 7,
        guests: 4,
        rooms: 2,
        total: 2100,
        status: 'checked-out',
        notes: 'Famiglia con 2 bambini piccoli'
    },
    {
        id: 'RES-2024-005',
        guest: 'Paolo Gialli',
        email: 'paolo.g@email.com',
        phone: '+39 337 5678901',
        room: '102 - Deluxe',
        roomType: 'deluxe',
        checkIn: '2024-01-25',
        checkOut: '2024-01-28',
        nights: 3,
        guests: 2,
        rooms: 1,
        total: 360,
        status: 'cancelled',
        notes: 'Cancellazione per emergenza'
    }
];

const roomRates = {
    'standard': 80,
    'deluxe': 120,
    'suite': 200,
    'family': 150
};

// INIZIALIZZA I DATEPICKER
function initDatepickers() {
    flatpickr.localize(flatpickr.l10ns.it);
    
    const datepickerOptions = {
        dateFormat: 'd/m/Y',
        locale: 'it',
        minDate: 'today',
        onChange: function(selectedDates, dateStr, instance) {
            if (instance.input.id === 'checkin-date' || instance.input.id === 'checkout-date') {
                calculateNights();
                calculatePrice();
            }
        }
    };
    
    // Inizializza tutti i datepicker
    document.querySelectorAll('.datepicker').forEach(input => {
        flatpickr(input, datepickerOptions);
    });
}

// CARICA LE PRENOTAZIONI
function loadBookings() {
    const tableBody = document.getElementById('bookings-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    sampleBookings.forEach(booking => {
        const row = createBookingRow(booking);
        tableBody.appendChild(row);
    });
    
    updateStats();
}

// CREA UNA RIGA DELLA TABELLA
function createBookingRow(booking) {
    const tr = document.createElement('tr');
    
    // Mappa degli stati
    const statusMap = {
        'confirmed': { class: 'status-confirmed', text: 'Confermata' },
        'pending': { class: 'status-pending', text: 'In Attesa' },
        'checked-in': { class: 'status-checked-in', text: 'Check-in' },
        'checked-out': { class: 'status-checked-out', text: 'Check-out' },
        'cancelled': { class: 'status-cancelled', text: 'Cancellata' }
    };
    
    const status = statusMap[booking.status] || statusMap.pending;
    
    tr.innerHTML = `
        <td><input type="checkbox" class="booking-checkbox"></td>
        <td><strong>${booking.id}</strong></td>
        <td>
            <div class="guest-info">
                <strong>${booking.guest}</strong><br>
                <small>${booking.phone}</small>
            </div>
        </td>
        <td>${booking.room}</td>
        <td>${formatDate(booking.checkIn)}</td>
        <td>${formatDate(booking.checkOut)}</td>
        <td>${booking.nights}</td>
        <td><strong>€${booking.total}</strong></td>
        <td><span class="status-badge ${status.class}">${status.text}</span></td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" title="Visualizza" onclick="viewBooking('${booking.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Modifica" onclick="editBooking('${booking.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn checkin" title="Check-in" onclick="checkinBooking('${booking.id}')">
                    <i class="fas fa-door-open"></i>
                </button>
                <button class="action-btn delete" title="Elimina" onclick="deleteBooking('${booking.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return tr;
}

// AGGIORNA LE STATISTICHE
function updateStats() {
    const stats = {
        total: sampleBookings.length,
        confirmed: sampleBookings.filter(b => b.status === 'confirmed').length,
        pending: sampleBookings.filter(b => b.status === 'pending').length,
        'checked-in': sampleBookings.filter(b => b.status === 'checked-in').length,
        'checked-out': sampleBookings.filter(b => b.status === 'checked-out').length
    };
    
    // Aggiorna i badge
    document.querySelector('#booking-count').textContent = stats.total;
    
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.querySelector(`.stat-badge.${key} .stat-number`);
        if (element) {
            animateCounter(element, value);
        }
    });
}

// ANIMA I CONTATORI
function animateCounter(element, target) {
    const current = parseInt(element.textContent) || 0;
    
    // Se non c'è cambiamento, esci subito
    if (current === target) {
        element.textContent = target;
        return;
    }
    
    const duration = 500; // 0.5 secondi
    const steps = 30; // Numero fisso di passi
    const increment = (target - current) / steps;
    const stepTime = duration / steps;
    
    let currentValue = current;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        currentValue += increment;
        
        // All'ultimo passo, assicurati di arrivare esattamente al target
        if (step >= steps) {
            currentValue = target;
            clearInterval(timer);
        }
        
        // Arrotonda e aggiorna il testo
        element.textContent = Math.round(currentValue);
    }, stepTime);
}

// INIZIALIZZA IL CALENDARIO
function initCalendar() {
    const now = new Date();
    updateCalendar(now.getFullYear(), now.getMonth());
}

// AGGIORNA IL CALENDARIO
function updateCalendar(year, month) {
    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                       'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    
    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const calendar = document.getElementById('booking-calendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    
    // Aggiungi i giorni della settimana
    const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });
    
    // Aggiungi i giorni del mese
    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (day.getDay() === 0 || day.getDay() === 6) {
            dayElement.classList.add('weekend');
        }
        
        if (day.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('today');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = i;
        dayElement.appendChild(dayNumber);
        
        // Aggiungi le prenotazioni per questo giorno
        const bookings = getBookingsForDate(year, month + 1, i);
        bookings.forEach(booking => {
            const bookingElement = document.createElement('div');
            bookingElement.className = 'calendar-booking';
            bookingElement.textContent = `${booking.room} - ${booking.guest.split(' ')[0]}`;
            bookingElement.style.background = getStatusColor(booking.status);
            bookingElement.onclick = () => viewBooking(booking.id);
            dayElement.appendChild(bookingElement);
        });
        
        calendar.appendChild(dayElement);
    }
}

// OTTIENE LE PRENOTAZIONI PER UNA DATA
function getBookingsForDate(year, month, day) {
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return sampleBookings.filter(booking => {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const currentDate = new Date(dateStr);
        
        return currentDate >= checkIn && currentDate <= checkOut;
    });
}

// OTTIENE IL COLORE IN BASE ALLO STATO
function getStatusColor(status) {
    const colors = {
        'confirmed': '#10b981',
        'pending': '#f59e0b',
        'checked-in': '#3b82f6',
        'checked-out': '#64748b',
        'cancelled': '#ef4444'
    };
    
    return colors[status] || '#64748b';
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Pulsante nuovo booking
    document.getElementById('new-booking-btn').addEventListener('click', () => {
        document.getElementById('booking-modal').classList.add('show');
        resetForm();
    });
    
    // Pulsante filtri
    document.getElementById('filter-btn').addEventListener('click', () => {
        const filters = document.getElementById('advanced-filters');
        filters.classList.toggle('show');
    });
    
    // Applica filtri
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Cambia vista (lista/calendario)
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'calendar') {
                document.querySelector('.bookings-table-container').style.display = 'none';
                document.getElementById('calendar-view').style.display = 'block';
            } else {
                document.querySelector('.bookings-table-container').style.display = 'block';
                document.getElementById('calendar-view').style.display = 'none';
            }
        });
    });
    
    // Navigazione calendario
    document.getElementById('prev-month').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => navigateMonth(1));
    
    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
    
    // Cambiamenti nel form
    document.getElementById('room-type').addEventListener('change', calculatePrice);
    document.getElementById('guests-count').addEventListener('change', calculatePrice);
    document.getElementById('rooms-count').addEventListener('change', calculatePrice);
    document.getElementById('discount').addEventListener('input', calculatePrice);
    
    // Submit form
    document.getElementById('booking-form').addEventListener('submit', submitBooking);
    
    // Seleziona tutti i checkbox
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.booking-checkbox');
        checkboxes.forEach(cb => cb.checked = this.checked);
    });
    
    // Click fuori dal modal per chiudere
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

// NAVIGA TRA I MESI
function navigateMonth(direction) {
    const currentMonth = document.getElementById('current-month').textContent;
    const [monthName, year] = currentMonth.split(' ');
    const monthIndex = getMonthIndex(monthName);
    
    let newYear = parseInt(year);
    let newMonth = monthIndex + direction;
    
    if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    }
    
    updateCalendar(newYear, newMonth);
}

// OTTIENE L'INDICE DEL MESE DAL NOME
function getMonthIndex(monthName) {
    const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                   'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    return months.indexOf(monthName.toLowerCase());
}

// CALCOLA LE NOTTI
function calculateNights() {
    const checkin = document.getElementById('checkin-date').value;
    const checkout = document.getElementById('checkout-date').value;
    
    if (checkin && checkout) {
        const start = parseDate(checkin);
        const end = parseDate(checkout);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            document.getElementById('nights').value = nights;
            document.getElementById('nights-count').textContent = nights;
        }
    }
}

// PARSA UNA DATA DAL FORMATO ITALIANO
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
}

// CALCOLA IL PREZZO
function calculatePrice() {
    const roomType = document.getElementById('room-type').value;
    const nights = parseInt(document.getElementById('nights').value) || 1;
    const rooms = parseInt(document.getElementById('rooms-count').value) || 1;
    const discount = parseInt(document.getElementById('discount').value) || 0;
    
    if (roomType && roomRates[roomType]) {
        const rate = roomRates[roomType];
        const subtotal = rate * nights * rooms;
        const discountAmount = subtotal * (discount / 100);
        const total = subtotal - discountAmount;
        
        document.getElementById('room-rate').textContent = `€${rate}/notte`;
        document.getElementById('total-price').textContent = `€${total.toFixed(2)}`;
    }
}

// APPLICA I FILTRI
function applyFilters() {
    const checkin = document.getElementById('filter-checkin').value;
    const checkout = document.getElementById('filter-checkout').value;
    const status = document.getElementById('filter-status').value;
    const guest = document.getElementById('filter-guest').value.toLowerCase();
    
    const filtered = sampleBookings.filter(booking => {
        let match = true;
        
        if (checkin) {
            const filterDate = parseDate(checkin);
            const bookingDate = new Date(booking.checkIn);
            match = match && bookingDate >= filterDate;
        }
        
        if (checkout) {
            const filterDate = parseDate(checkout);
            const bookingDate = new Date(booking.checkOut);
            match = match && bookingDate <= filterDate;
        }
        
        if (status) {
            match = match && booking.status === status;
        }
        
        if (guest) {
            match = match && booking.guest.toLowerCase().includes(guest);
        }
        
        return match;
    });
    
    updateTable(filtered);
    showNotification(`Trovate ${filtered.length} prenotazioni`);
}

// RESETTA I FILTRI
function resetFilters() {
    document.getElementById('filter-checkin').value = '';
    document.getElementById('filter-checkout').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-guest').value = '';
    
    loadBookings();
    showNotification('Filtri resettati');
}

// AGGIORNA LA TABELLA
function updateTable(bookings) {
    const tableBody = document.getElementById('bookings-table-body');
    tableBody.innerHTML = '';
    
    bookings.forEach(booking => {
        const row = createBookingRow(booking);
        tableBody.appendChild(row);
    });
}

// RESETTA IL FORM
function resetForm() {
    document.getElementById('booking-form').reset();
    document.getElementById('nights').value = 1;
    document.getElementById('guests-count').value = 1;
    document.getElementById('rooms-count').value = 1;
    document.getElementById('discount').value = 0;
    calculatePrice();
}

// SUBMIT DELLA PRENOTAZIONE
function submitBooking(e) {
    e.preventDefault();
    
    // Genera un nuovo ID
    const newId = `RES-${new Date().getFullYear()}-${String(sampleBookings.length + 1).padStart(3, '0')}`;
    
    const newBooking = {
        id: newId,
        guest: `Ospite ${sampleBookings.length + 1}`,
        email: '',
        phone: document.getElementById('guest-phone').value,
        room: `Nuova - ${document.getElementById('room-type').selectedOptions[0].text.split(' ')[0]}`,
        roomType: document.getElementById('room-type').value,
        checkIn: formatDateForStorage(document.getElementById('checkin-date').value),
        checkOut: formatDateForStorage(document.getElementById('checkout-date').value),
        nights: parseInt(document.getElementById('nights').value),
        guests: parseInt(document.getElementById('guests-count').value),
        rooms: parseInt(document.getElementById('rooms-count').value),
        total: parseFloat(document.getElementById('total-price').textContent.replace('€', '')),
        status: 'pending',
        notes: document.getElementById('booking-notes').value
    };
    
    // Aggiungi alla lista
    sampleBookings.unshift(newBooking);
    
    // Aggiorna la tabella
    loadBookings();
    
    // Chiudi il modal
    document.getElementById('booking-modal').classList.remove('show');
    
    // Mostra notifica
    showNotification(`Prenotazione ${newId} creata con successo!`);
    
    // In un'app reale, qui faresti una chiamata API
    console.log('New booking:', newBooking);
}

// FUNZIONI PER LE AZIONI
function viewBooking(id) {
    const booking = sampleBookings.find(b => b.id === id);
    if (!booking) return;
    
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('booking-detail-content');
    
    content.innerHTML = `
        <div class="booking-detail">
            <div class="detail-header">
                <h3>${booking.id}</h3>
                <span class="status-badge ${getStatusClass(booking.status)}">${getStatusText(booking.status)}</span>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-user"></i> Informazioni Ospite</h4>
                <div class="detail-grid">
                    <div><strong>Nome:</strong> ${booking.guest}</div>
                    <div><strong>Email:</strong> ${booking.email}</div>
                    <div><strong>Telefono:</strong> ${booking.phone}</div>
                    <div><strong>Numero Ospiti:</strong> ${booking.guests}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-bed"></i> Dettagli Soggiorno</h4>
                <div class="detail-grid">
                    <div><strong>Camera:</strong> ${booking.room}</div>
                    <div><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</div>
                    <div><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</div>
                    <div><strong>Notti:</strong> ${booking.nights}</div>
                    <div><strong>Numero Camere:</strong> ${booking.rooms}</div>
                    <div><strong>Totale:</strong> <strong class="price">€${booking.total}</strong></div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-sticky-note"></i> Note</h4>
                <p>${booking.notes || 'Nessuna nota'}</p>
            </div>
            
            <div class="detail-actions">
                <button class="btn-secondary modal-close">Chiudi</button>
                <button class="btn-primary" onclick="checkinBooking('${booking.id}')">
                    <i class="fas fa-door-open"></i> Check-in
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function editBooking(id) {
    showNotification(`Modifica prenotazione ${id} - Funzionalità in sviluppo`);
    // Qui implementerai la modifica
}

function checkinBooking(id) {
    const booking = sampleBookings.find(b => b.id === id);
    if (booking) {
        booking.status = 'checked-in';
        loadBookings();
        
        // Chiudi il modal dei dettagli
        document.getElementById('detail-modal').classList.remove('show');
        
        showNotification(`Check-in completato per ${booking.guest}`);
        
        // Aggiorna immediatamente il contatore delle camere occupate
        updateRoomOccupancy();
    }
}

function updateRoomOccupancy() {
    // Conta le camere occupate
    const occupied = sampleBookings.filter(b => b.status === 'checked-in').length;
    const available = 50 - occupied; // 50 camere totali
    
    // Aggiorna le statistiche nella dashboard
    const occupiedElement = document.getElementById('occupied-rooms');
    const availableElement = document.getElementById('available-rooms');
    
    if (occupiedElement) animateCounter(occupiedElement, occupied);
    if (availableElement) animateCounter(availableElement, available);
}

function deleteBooking(id) {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
        const index = sampleBookings.findIndex(b => b.id === id);
        if (index !== -1) {
            sampleBookings.splice(index, 1);
            loadBookings();
            showNotification('Prenotazione eliminata');
        }
    }
}

// FUNZIONI DI UTILITÀ
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatDateForStorage(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

function getStatusClass(status) {
    const map = {
        'confirmed': 'status-confirmed',
        'pending': 'status-pending',
        'checked-in': 'status-checked-in',
        'checked-out': 'status-checked-out',
        'cancelled': 'status-cancelled'
    };
    return map[status] || '';
}

function getStatusText(status) {
    const map = {
        'confirmed': 'Confermata',
        'pending': 'In Attesa',
        'checked-in': 'Check-in',
        'checked-out': 'Check-out',
        'cancelled': 'Cancellata'
    };
    return map[status] || status;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'floating-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
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
    
    .booking-detail {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 2px solid #e2e8f0;
    }
    
    .detail-section {
        background: #f8fafc;
        padding: 20px;
        border-radius: 8px;
    }
    
    .detail-section h4 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        color: #1e293b;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .detail-grid div {
        padding: 8px 0;
        border-bottom: 1px dashed #e2e8f0;
    }
    
    .detail-grid div:last-child {
        border-bottom: none;
    }
    
    .price {
        color: #10b981;
        font-size: 1.2rem;
    }
    
    .detail-actions {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
    }
`;

document.head.appendChild(notificationStyle);

// CARICA GLI OSPITI ESISTENTI
function loadGuests() {
    const select = document.getElementById('guest-select');
    // Qui in un'app reale caricheresti gli ospiti dal database
    const sampleGuests = ['Mario Rossi', 'Laura Bianchi', 'Giuseppe Verdi', 'Anna Neri'];
    
    sampleGuests.forEach(guest => {
        const option = document.createElement('option');
        option.value = guest.toLowerCase().replace(' ', '-');
        option.textContent = guest;
        select.appendChild(option);
    });
}

// Carica gli ospiti quando il DOM è pronto
setTimeout(loadGuests, 500);