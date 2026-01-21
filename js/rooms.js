// HotelFlow Manager - Rooms Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Rooms management system loaded');
    
    // Carica le camere
    loadRooms();
    
    // Inizializza i filtri
    initFilters();
    
    // Inizializza il piano
    initFloorPlan();
    
    // Setup event listeners
    setupEventListeners();
    
    // Calcola il prezzo iniziale
    calculateFinalPrice();
});

// DATI DI ESEMPIO
const sampleRooms = [
    {
        id: 'room-001',
        number: '101',
        floor: 0,
        type: 'standard',
        typeLabel: 'Standard',
        capacity: 2,
        beds: { single: 0, double: 1, extra: 0 },
        size: 25,
        price: 80,
        discount: 0,
        status: 'available',
        services: ['wifi', 'tv', 'ac', 'safe'],
        description: 'Camera standard confortevole con vista giardino',
        images: ['room1.jpg'],
        currentGuest: null,
        checkOut: null,
        lastCleaning: '2024-01-20',
        nextMaintenance: '2024-03-15'
    },
    {
        id: 'room-002',
        number: '102',
        floor: 0,
        type: 'deluxe',
        typeLabel: 'Deluxe',
        capacity: 3,
        beds: { single: 1, double: 1, extra: 0 },
        size: 35,
        price: 120,
        discount: 10,
        status: 'occupied',
        services: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony'],
        description: 'Camera deluxe con balcone e vista parziale mare',
        images: ['room2.jpg', 'room2-bath.jpg'],
        currentGuest: { name: 'Mario Rossi', checkIn: '2024-01-20', checkOut: '2024-01-23' },
        checkOut: '2024-01-23',
        lastCleaning: '2024-01-20',
        nextMaintenance: '2024-04-10'
    },
    {
        id: 'room-003',
        number: '103',
        floor: 0,
        type: 'suite',
        typeLabel: 'Suite',
        capacity: 4,
        beds: { single: 0, double: 2, extra: 0 },
        size: 50,
        price: 200,
        discount: 15,
        status: 'reserved',
        services: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony', 'sea-view', 'jacuzzi'],
        description: 'Suite lussuosa con vista mare e vasca idromassaggio',
        images: ['suite1.jpg', 'suite1-living.jpg', 'suite1-bath.jpg'],
        currentGuest: { name: 'Laura Bianchi', checkIn: '2024-01-25', checkOut: '2024-01-30' },
        checkOut: '2024-01-30',
        lastCleaning: '2024-01-18',
        nextMaintenance: '2024-05-20'
    },
    {
        id: 'room-104',
        number: '104',
        floor: 1,
        type: 'family',
        typeLabel: 'Famiglia',
        capacity: 5,
        beds: { single: 2, double: 1, extra: 1 },
        size: 45,
        price: 150,
        discount: 5,
        status: 'maintenance',
        services: ['wifi', 'tv', 'ac', 'safe', 'balcony'],
        description: 'Camera familiare spaziosa, ideale per famiglie con bambini',
        images: ['family1.jpg'],
        currentGuest: null,
        checkOut: null,
        lastCleaning: '2024-01-19',
        nextMaintenance: '2024-01-25'
    },
    {
        id: 'room-105',
        number: '105',
        floor: 1,
        type: 'standard',
        typeLabel: 'Standard',
        capacity: 2,
        beds: { single: 2, double: 0, extra: 0 },
        size: 22,
        price: 75,
        discount: 0,
        status: 'cleaning',
        services: ['wifi', 'tv', 'ac'],
        description: 'Camera standard con due letti singoli',
        images: ['room3.jpg'],
        currentGuest: null,
        checkOut: null,
        lastCleaning: '2024-01-21',
        nextMaintenance: '2024-03-30'
    },
    {
        id: 'room-201',
        number: '201',
        floor: 2,
        type: 'deluxe',
        typeLabel: 'Deluxe',
        capacity: 3,
        beds: { single: 0, double: 1, extra: 1 },
        size: 32,
        price: 110,
        discount: 8,
        status: 'available',
        services: ['wifi', 'tv', 'ac', 'minibar', 'safe'],
        description: 'Camera deluxe con possibilità di letto aggiuntivo',
        images: ['room4.jpg'],
        currentGuest: null,
        checkOut: null,
        lastCleaning: '2024-01-21',
        nextMaintenance: '2024-04-15'
    },
    {
        id: 'room-202',
        number: '202',
        floor: 2,
        type: 'suite',
        typeLabel: 'Suite',
        capacity: 2,
        beds: { single: 0, double: 1, extra: 0 },
        size: 40,
        price: 180,
        discount: 12,
        status: 'occupied',
        services: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony', 'sea-view'],
        description: 'Suite romantica con vista mare e balcone privato',
        images: ['suite2.jpg'],
        currentGuest: { name: 'Giuseppe Verdi', checkIn: '2024-01-22', checkOut: '2024-01-24' },
        checkOut: '2024-01-24',
        lastCleaning: '2024-01-21',
        nextMaintenance: '2024-05-05'
    },
    {
        id: 'room-301',
        number: '301',
        floor: 3,
        type: 'family',
        typeLabel: 'Famiglia',
        capacity: 6,
        beds: { single: 2, double: 2, extra: 0 },
        size: 55,
        price: 170,
        discount: 7,
        status: 'reserved',
        services: ['wifi', 'tv', 'ac', 'safe', 'balcony', 'sea-view'],
        description: 'Suite familiare con due camere separate e grande balcone',
        images: ['family2.jpg', 'family2-room2.jpg'],
        currentGuest: { name: 'Anna Neri', checkIn: '2024-01-26', checkOut: '2024-02-02' },
        checkOut: '2024-02-02',
        lastCleaning: '2024-01-20',
        nextMaintenance: '2024-06-10'
    }
];

// COLORI PER GLI STATI
const statusColors = {
    'available': { color: '#10b981', label: 'Disponibile', icon: 'fa-door-open' },
    'occupied': { color: '#8b5cf6', label: 'Occupata', icon: 'fa-bed' },
    'reserved': { color: '#3b82f6', label: 'Prenotata', icon: 'fa-calendar-check' },
    'maintenance': { color: '#f59e0b', label: 'Manutenzione', icon: 'fa-tools' },
    'cleaning': { color: '#64748b', label: 'In Pulizia', icon: 'fa-broom' },
    'out-of-service': { color: '#ef4444', label: 'Fuori Servizio', icon: 'fa-ban' }
};

// COLORE PER I TIPI DI CAMERA
const roomTypeColors = {
    'standard': { color: '#3b82f6', bg: '#dbeafe', label: 'Standard' },
    'deluxe': { color: '#8b5cf6', bg: '#f3e8ff', label: 'Deluxe' },
    'suite': { color: '#f59e0b', bg: '#fef3c7', label: 'Suite' },
    'family': { color: '#10b981', bg: '#d1fae5', label: 'Famiglia' }
};

// CARICA LE CAMERE
function loadRooms(filteredRooms = null) {
    const rooms = filteredRooms || sampleRooms;
    
    // Aggiorna le statistiche
    updateRoomStats(rooms);
    
    // Carica la vista grid
    loadRoomGrid(rooms);
    
    // Carica la vista tabella
    loadRoomTable(rooms);
    
    // Aggiorna il piano
    updateFloorPlan(1); // Mostra il primo piano di default
}

// AGGIORNA LE STATISTICHE
function updateRoomStats(rooms) {
    const stats = {
        total: rooms.length,
        available: rooms.filter(r => r.status === 'available').length,
        occupied: rooms.filter(r => r.status === 'occupied').length,
        maintenance: rooms.filter(r => r.status === 'maintenance').length,
        cleaning: rooms.filter(r => r.status === 'cleaning').length
    };
    
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.getElementById(`${key}-rooms-count`);
        if (element) {
            animateCounter(element, value);
        }
    });
}

// ANIMAZIONE CONTATORI (versione corretta)
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

// CARICA LA VISTA GRID
function loadRoomGrid(rooms) {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    rooms.forEach(room => {
        const roomCard = createRoomCard(room);
        grid.appendChild(roomCard);
    });
}

// CREA UNA CARD PER LA CAMERA
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = `room-card ${room.status}`;
    card.dataset.id = room.id;
    
    const status = statusColors[room.status];
    const type = roomTypeColors[room.type];
    
    // Calcola il prezzo scontato
    const discountedPrice = room.price * (1 - room.discount / 100);
    
    card.innerHTML = `
        <div class="room-badge badge-floor">
            <i class="fas fa-layer-group"></i> Piano ${room.floor + 1}
        </div>
        
        <div class="room-header">
            <div class="room-number">
                <i class="fas fa-hashtag"></i> ${room.number}
                <span class="room-type ${room.type}">${type.label}</span>
            </div>
            <div class="room-status status-${room.status}">
                <i class="fas ${status.icon}"></i> ${status.label}
            </div>
        </div>
        
        <div class="room-content">
            <div class="room-info">
                <div class="room-detail">
                    <span class="detail-label">
                        <i class="fas fa-users"></i> Capacità
                    </span>
                    <span class="detail-value">${room.capacity} pers.</span>
                </div>
                <div class="room-detail">
                    <span class="detail-label">
                        <i class="fas fa-bed"></i> Letti
                    </span>
                    <span class="detail-value">
                        ${room.beds.double} Matr. ${room.beds.single > 0 ? `, ${room.beds.single} Sing.` : ''}
                    </span>
                </div>
                <div class="room-detail">
                    <span class="detail-label">
                        <i class="fas fa-expand-arrows-alt"></i> Metratura
                    </span>
                    <span class="detail-value">${room.size}m²</span>
                </div>
                <div class="room-detail">
                    <span class="detail-label">
                        <i class="fas fa-euro-sign"></i> Prezzo
                    </span>
                    <span class="detail-value price-tag">€${discountedPrice.toFixed(2)}/notte</span>
                </div>
            </div>
            
            <div class="room-services">
                ${room.services.slice(0, 4).map(service => `
                    <div class="service-icon" title="${getServiceLabel(service)}">
                        <i class="fas ${getServiceIcon(service)}"></i>
                    </div>
                `).join('')}
                ${room.services.length > 4 ? `
                    <div class="service-icon" title="Altri servizi">
                        <i class="fas fa-plus"></i>
                    </div>
                ` : ''}
            </div>
            
            ${room.currentGuest ? `
                <div class="current-guest-info">
                    <div class="room-detail">
                        <span class="detail-label">
                            <i class="fas fa-user"></i> Ospite
                        </span>
                        <span class="detail-value">${room.currentGuest.name}</span>
                    </div>
                    <div class="room-detail">
                        <span class="detail-label">
                            <i class="fas fa-calendar"></i> Check-out
                        </span>
                        <span class="detail-value">${formatDate(room.checkOut)}</span>
                    </div>
                </div>
            ` : ''}
            
            <div class="room-actions">
                <button class="room-action-btn action-view" onclick="viewRoom('${room.id}')">
                    <i class="fas fa-eye"></i> Dettagli
                </button>
                <button class="room-action-btn action-status" onclick="changeRoomStatus('${room.id}')">
                    <i class="fas fa-sync-alt"></i> Stato
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// CARICA LA VISTA TABELLA
function loadRoomTable(rooms) {
    const tableBody = document.getElementById('rooms-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    rooms.forEach(room => {
        const row = createRoomTableRow(room);
        tableBody.appendChild(row);
    });
}

// CREA UNA RIGA PER LA TABELLA
function createRoomTableRow(room) {
    const row = document.createElement('tr');
    const status = statusColors[room.status];
    const type = roomTypeColors[room.type];
    const discountedPrice = room.price * (1 - room.discount / 100);
    
    row.innerHTML = `
        <td><input type="checkbox" class="room-checkbox" data-id="${room.id}"></td>
        <td><strong>${room.number}</strong></td>
        <td><span class="room-type ${room.type}">${type.label}</span></td>
        <td>Piano ${room.floor + 1}</td>
        <td>${room.capacity} pers.</td>
        <td><strong>€${discountedPrice.toFixed(2)}</strong></td>
        <td><span class="room-status status-${room.status}">${status.label}</span></td>
        <td>${room.currentGuest ? room.currentGuest.name : '-'}</td>
        <td>${room.checkOut ? formatDate(room.checkOut) : '-'}</td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" title="Visualizza" onclick="viewRoom('${room.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Modifica" onclick="editRoom('${room.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn status" title="Cambia Stato" onclick="changeRoomStatus('${room.id}')">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// INIZIALIZZA I FILTRI
function initFilters() {
    // Filtri per stato
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterRooms(filter);
        });
    });
    
    // Filtro per piano
    document.getElementById('filter-floor').addEventListener('change', function() {
        filterRooms();
    });
    
    // Filtro per tipo
    document.getElementById('filter-type').addEventListener('change', function() {
        filterRooms();
    });
    
    // Filtro per capacità
    document.getElementById('filter-capacity').addEventListener('change', function() {
        filterRooms();
    });
    
    // Filtro per prezzo
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `€${this.value}`;
        filterRooms();
    });
    
    // Ricerca
    const searchInput = document.getElementById('room-search');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterRooms();
        }, 300);
    });
}

// FILTRA LE CAMERE
function filterRooms(statusFilter = null) {
    const activeFilter = statusFilter || document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const floorFilter = document.getElementById('filter-floor').value;
    const typeFilter = document.getElementById('filter-type').value;
    const capacityFilter = document.getElementById('filter-capacity').value;
    const priceFilter = parseInt(document.getElementById('price-range').value);
    const searchQuery = document.getElementById('room-search').value.toLowerCase();
    
    const filtered = sampleRooms.filter(room => {
        let match = true;
        
        // Filtro per stato
        if (activeFilter !== 'all' && room.status !== activeFilter) {
            match = false;
        }
        
        // Filtro per piano
        if (floorFilter !== '' && room.floor.toString() !== floorFilter) {
            match = false;
        }
        
        // Filtro per tipo
        if (typeFilter !== '' && room.type !== typeFilter) {
            match = false;
        }
        
        // Filtro per capacità
        if (capacityFilter !== '') {
            if (capacityFilter === '4' && room.capacity < 4) {
                match = false;
            } else if (capacityFilter !== '4' && room.capacity.toString() !== capacityFilter) {
                match = false;
            }
        }
        
        // Filtro per prezzo
        const discountedPrice = room.price * (1 - room.discount / 100);
        if (discountedPrice > priceFilter) {
            match = false;
        }
        
        // Filtro per ricerca
        if (searchQuery) {
            const searchText = `${room.number} ${room.type} ${roomTypeColors[room.type].label}`.toLowerCase();
            if (!searchText.includes(searchQuery)) {
                match = false;
            }
        }
        
        return match;
    });
    
    loadRooms(filtered);
}

// INIZIALIZZA IL PIANO
function initFloorPlan() {
    // Event listener per i pulsanti del piano
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const floor = parseInt(this.dataset.floor);
            updateFloorPlan(floor);
        });
    });
}

// AGGIORNA IL PIANO
function updateFloorPlan(floor) {
    const floorGrid = document.getElementById('floor-grid');
    const currentFloorElement = document.getElementById('current-floor');
    
    if (!floorGrid || !currentFloorElement) return;
    
    // Aggiorna il titolo del piano
    const floorNames = ['Piano Terra', 'Primo Piano', 'Secondo Piano', 'Terzo Piano'];
    currentFloorElement.textContent = floorNames[floor];
    
    // Filtra le camere per piano
    const floorRooms = sampleRooms.filter(room => room.floor === floor);
    
    // Crea la griglia del piano
    floorGrid.innerHTML = '';
    
    // Crea una mappa delle camere per numero
    const roomMap = {};
    floorRooms.forEach(room => {
        roomMap[room.number] = room;
    });
    
    // Genera le camere del piano (ipotizziamo 20 camere per piano)
    for (let i = 1; i <= 20; i++) {
        const roomNumber = `${floor}${i.toString().padStart(2, '0')}`;
        const room = roomMap[roomNumber];
        
        const roomElement = document.createElement('div');
        roomElement.className = `floor-room ${room ? room.status : 'out-of-service'}`;
        
        if (room) {
            roomElement.dataset.id = room.id;
            roomElement.onclick = () => viewRoom(room.id);
        }
        
        roomElement.innerHTML = `
            <div class="floor-room-number">${roomNumber}</div>
            <div class="floor-room-type">
                ${room ? roomTypeColors[room.type].label : 'Non attiva'}
            </div>
        `;
        
        floorGrid.appendChild(roomElement);
    }
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Pulsante nuova camera
    document.getElementById('add-room-btn').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Nuova Camera';
        document.getElementById('room-modal').classList.add('show');
        resetRoomForm();
    });
    
    // Pulsante vista piano
    document.getElementById('room-plan-btn').addEventListener('click', () => {
        toggleView('plan');
    });
    
    // Cambia vista
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            toggleView(view);
            
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Cambio sconto
    document.getElementById('seasonal-discount').addEventListener('input', function() {
        document.getElementById('discount-value').textContent = `${this.value}%`;
        calculateFinalPrice();
    });
    
    // Upload immagini
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('room-images');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        const preview = document.getElementById('image-preview');
        preview.innerHTML = '';
        
        Array.from(this.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.className = 'preview-image';
                img.src = e.target.result;
                img.alt = `Camera ${index + 1}`;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
    
    // Drag & drop per immagini
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#3b82f6';
        this.style.background = '#eff6ff';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#cbd5e1';
        this.style.background = '#f8fafc';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#cbd5e1';
        this.style.background = '#f8fafc';
        
        const files = e.dataTransfer.files;
        fileInput.files = files;
        
        // Trigger change event
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
    });
    
    // Submit form camera
    document.getElementById('room-form').addEventListener('submit', submitRoomForm);
    
    // Select all checkbox
    document.getElementById('select-all-rooms').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.room-checkbox');
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

// TOGGLE VISTA
function toggleView(view) {
    const grid = document.getElementById('rooms-grid');
    const table = document.getElementById('rooms-table');
    const plan = document.getElementById('floor-plan');
    
    if (view === 'grid') {
        grid.style.display = 'grid';
        table.style.display = 'none';
        plan.style.display = 'none';
    } else if (view === 'table') {
        grid.style.display = 'none';
        table.style.display = 'block';
        plan.style.display = 'none';
    } else if (view === 'plan') {
        grid.style.display = 'none';
        table.style.display = 'none';
        plan.style.display = 'block';
    }
}

// CALCOLA PREZZO FINALE
function calculateFinalPrice() {
    const basePrice = parseFloat(document.getElementById('room-price').value) || 80;
    const discount = parseFloat(document.getElementById('seasonal-discount').value) || 0;
    const finalPrice = basePrice * (1 - discount / 100);
    
    document.getElementById('final-price').value = `€${finalPrice.toFixed(2)}`;
}

// RESETTA IL FORM
function resetRoomForm() {
    document.getElementById('room-form').reset();
    document.getElementById('room-capacity').value = 2;
    document.getElementById('single-beds').value = 0;
    document.getElementById('double-beds').value = 1;
    document.getElementById('extra-beds').value = 0;
    document.getElementById('room-size').value = 25;
    document.getElementById('room-price').value = 80;
    document.getElementById('seasonal-discount').value = 0;
    document.getElementById('discount-value').textContent = '0%';
    document.getElementById('image-preview').innerHTML = '';
    
    // Seleziona tutti i servizi di default
    document.querySelectorAll('input[name="services"]').forEach(cb => {
        if (['wifi', 'tv'].includes(cb.value)) {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });
    
    calculateFinalPrice();
}

// SUBMIT FORM CAMERA
function submitRoomForm(e) {
    e.preventDefault();
    
    const roomNumber = document.getElementById('room-number').value;
    const floor = parseInt(document.getElementById('room-floor').value);
    const type = document.getElementById('room-type').value;
    const capacity = parseInt(document.getElementById('room-capacity').value);
    const singleBeds = parseInt(document.getElementById('single-beds').value);
    const doubleBeds = parseInt(document.getElementById('double-beds').value);
    const extraBeds = parseInt(document.getElementById('extra-beds').value);
    const size = parseInt(document.getElementById('room-size').value);
    const price = parseFloat(document.getElementById('room-price').value);
    const discount = parseFloat(document.getElementById('seasonal-discount').value);
    const description = document.getElementById('room-description').value;
    
    // Ottieni i servizi selezionati
    const services = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(cb => {
        services.push(cb.value);
    });
    
    // Crea il nuovo ID
    const newId = `room-${Date.now()}`;
    
    const newRoom = {
        id: newId,
        number: roomNumber,
        floor: floor,
        type: type,
        typeLabel: roomTypeColors[type].label,
        capacity: capacity,
        beds: { single: singleBeds, double: doubleBeds, extra: extraBeds },
        size: size,
        price: price,
        discount: discount,
        status: 'available',
        services: services,
        description: description,
        images: [],
        currentGuest: null,
        checkOut: null,
        lastCleaning: new Date().toISOString().split('T')[0],
        nextMaintenance: getNextMaintenanceDate()
    };
    
    // Aggiungi alla lista (in un'app reale qui faresti una chiamata API)
    sampleRooms.push(newRoom);
    
    // Aggiorna la vista
    loadRooms();
    
    // Chiudi il modal
    document.getElementById('room-modal').classList.remove('show');
    
    // Mostra notifica
    showNotification(`Camera ${roomNumber} creata con successo!`);
    
    console.log('New room:', newRoom);
}

// FUNZIONI PER LE AZIONI
function viewRoom(id) {
    const room = sampleRooms.find(r => r.id === id);
    if (!room) return;
    
    const modal = document.getElementById('room-detail-modal');
    const content = document.getElementById('room-detail-content');
    const roomNumber = document.getElementById('detail-room-number');
    
    roomNumber.textContent = room.number;
    
    const discountedPrice = room.price * (1 - room.discount / 100);
    const status = statusColors[room.status];
    const type = roomTypeColors[room.type];
    
    content.innerHTML = `
        <div class="room-detail-images">
            <img src="https://via.placeholder.com/600x400/3b82f6/ffffff?text=Room+${room.number}" 
                 alt="Camera ${room.number}" class="main-image" id="main-image">
            <div class="image-thumbnails">
                <img src="https://via.placeholder.com/100x100/3b82f6/ffffff?text=Room+${room.number}+1" 
                     alt="Vista camera" class="thumbnail active" onclick="changeMainImage(this)">
                <img src="https://via.placeholder.com/100x100/10b981/ffffff?text=Bagno" 
                     alt="Bagno" class="thumbnail" onclick="changeMainImage(this)">
                <img src="https://via.placeholder.com/100x100/8b5cf6/ffffff?text=Vista" 
                     alt="Vista" class="thumbnail" onclick="changeMainImage(this)">
            </div>
        </div>
        
        <div class="room-detail-info">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Informazioni Camera</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Numero:</span>
                        <span class="detail-value">${room.number}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Piano:</span>
                        <span class="detail-value">Piano ${room.floor + 1}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo:</span>
                        <span class="detail-value">${type.label}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Stato:</span>
                        <span class="detail-value room-status status-${room.status}">${status.label}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Capacità:</span>
                        <span class="detail-value">${room.capacity} persone</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Metratura:</span>
                        <span class="detail-value">${room.size}m²</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prezzo base:</span>
                        <span class="detail-value">€${room.price}/notte</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Sconto:</span>
                        <span class="detail-value">${room.discount}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prezzo finale:</span>
                        <span class="detail-value price">€${discountedPrice.toFixed(2)}/notte</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-bed"></i> Configurazione Letti</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Letti singoli:</span>
                        <span class="detail-value">${room.beds.single}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Letti matrimoniali:</span>
                        <span class="detail-value">${room.beds.double}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Letti aggiuntivi:</span>
                        <span class="detail-value">${room.beds.extra}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Totale posti letto:</span>
                        <span class="detail-value">${room.beds.single + room.beds.double * 2 + room.beds.extra}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-concierge-bell"></i> Servizi</h4>
                <div class="services-list">
                    ${room.services.map(service => `
                        <div class="service-tag">
                            <i class="fas ${getServiceIcon(service)}"></i>
                            ${getServiceLabel(service)}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-sticky-note"></i> Descrizione</h4>
                <p>${room.description}</p>
            </div>
            
            ${room.currentGuest ? `
                <div class="detail-section">
                    <h4><i class="fas fa-user"></i> Ospite Attuale</h4>
                    <div class="current-guest">
                        <div class="guest-info">
                            <div class="guest-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="guest-details">
                                <h5>${room.currentGuest.name}</h5>
                                <p>Check-in: ${formatDate(room.currentGuest.checkIn)}</p>
                                <p>Check-out: ${formatDate(room.checkOut)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h4><i class="fas fa-calendar-alt"></i> Manutenzione</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Ultima pulizia:</span>
                        <span class="detail-value">${formatDate(room.lastCleaning)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prossima manutenzione:</span>
                        <span class="detail-value">${formatDate(room.nextMaintenance)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-actions">
                <button class="btn-secondary modal-close">Chiudi</button>
                <button class="btn-primary" onclick="changeRoomStatus('${room.id}')">
                    <i class="fas fa-sync-alt"></i> Cambia Stato
                </button>
                <button class="btn-primary" onclick="editRoom('${room.id}')">
                    <i class="fas fa-edit"></i> Modifica
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function editRoom(id) {
    const room = sampleRooms.find(r => r.id === id);
    if (!room) return;
    
    // Popola il form con i dati della camera
    document.getElementById('modal-title').textContent = `Modifica Camera ${room.number}`;
    document.getElementById('room-number').value = room.number;
    document.getElementById('room-floor').value = room.floor;
    document.getElementById('room-type').value = room.type;
    document.getElementById('room-capacity').value = room.capacity;
    document.getElementById('single-beds').value = room.beds.single;
    document.getElementById('double-beds').value = room.beds.double;
    document.getElementById('extra-beds').value = room.beds.extra;
    document.getElementById('room-size').value = room.size;
    document.getElementById('room-price').value = room.price;
    document.getElementById('seasonal-discount').value = room.discount;
    document.getElementById('discount-value').textContent = `${room.discount}%`;
    document.getElementById('room-description').value = room.description;
    
    // Seleziona i servizi
    document.querySelectorAll('input[name="services"]').forEach(cb => {
        cb.checked = room.services.includes(cb.value);
    });
    
    // Aggiorna il prezzo
    calculateFinalPrice();
    
    // Aggiungi l'ID della camera al form
    const form = document.getElementById('room-form');
    form.dataset.editingId = id;
    
    // Mostra il modal
    document.getElementById('room-modal').classList.add('show');
}

function changeRoomStatus(id) {
    const room = sampleRooms.find(r => r.id === id);
    if (!room) return;
    
    const modal = document.getElementById('status-modal');
    const roomNumber = document.getElementById('status-room-number');
    const currentStatus = document.getElementById('current-status');
    
    roomNumber.textContent = room.number;
    currentStatus.textContent = statusColors[room.status].label;
    currentStatus.className = `status-badge status-${room.status}`;
    
    // Mostra il modal
    modal.classList.add('show');
    
    // Quando si conferma il cambio stato
    const statusForm = document.getElementById('status-form');
    statusForm.onsubmit = function(e) {
        e.preventDefault();
        
        const newStatus = document.getElementById('new-status').value;
        const notes = document.getElementById('status-notes').value;
        
        if (newStatus) {
            room.status = newStatus;
            
            // Se diventa disponibile, resetta l'ospite
            if (newStatus === 'available') {
                room.currentGuest = null;
                room.checkOut = null;
            }
            
            // Aggiorna la vista
            loadRooms();
            
            // Chiudi il modal
            modal.classList.remove('show');
            
            // Mostra notifica
            showNotification(`Stato camera ${room.number} cambiato in ${statusColors[newStatus].label}`);
            
            // Log dell'azione
            console.log(`Room ${room.number} status changed to ${newStatus}. Notes: ${notes}`);
        }
    };
}

// FUNZIONI DI UTILITÀ
function changeMainImage(thumb) {
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    
    const mainImage = document.getElementById('main-image');
    mainImage.src = thumb.src;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT');
}

function getNextMaintenanceDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
}

function getServiceIcon(service) {
    const icons = {
        'wifi': 'fa-wifi',
        'tv': 'fa-tv',
        'ac': 'fa-snowflake',
        'minibar': 'fa-wine-bottle',
        'safe': 'fa-lock',
        'balcony': 'fa-door-open',
        'sea-view': 'fa-water',
        'jacuzzi': 'fa-hot-tub'
    };
    return icons[service] || 'fa-check';
}

function getServiceLabel(service) {
    const labels = {
        'wifi': 'WiFi',
        'tv': 'TV Satellitare',
        'ac': 'Aria Condizionata',
        'minibar': 'Minibar',
        'safe': 'Cassaforte',
        'balcony': 'Balcone',
        'sea-view': 'Vista Mare',
        'jacuzzi': 'Vasca Idromassaggio'
    };
    return labels[service] || service;
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
`;

document.head.appendChild(notificationStyle);