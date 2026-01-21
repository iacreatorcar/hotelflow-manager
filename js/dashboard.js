// HotelFlow Manager - Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    // Inizializza i grafici
    initCharts();
    
    // Carica i dati
    loadDashboardData();
    
    // Anima i numeri delle statistiche
    animateStats();
    
    // Aggiungi event listeners
    setupEventListeners();
});

// DATI DI ESEMPIO
const sampleData = {
    occupancy: {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        data: [65, 72, 80, 75, 85, 90, 95]
    },
    revenue: {
        labels: ['Standard', 'Deluxe', 'Suite', 'Famiglia'],
        data: [45000, 75000, 120000, 35000],
        colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
    },
    checkIns: [
        { room: '101', guest: 'Mario Rossi', time: '14:30', duration: '3 notti', action: 'Check-in' },
        { room: '205', guest: 'Laura Bianchi', time: '15:45', duration: '2 notti', action: 'Check-in' },
        { room: '312', guest: 'Giuseppe Verdi', time: '16:20', duration: '5 notti', action: 'Check-in' },
        { room: '408', guest: 'Anna Neri', time: '17:00', duration: '1 notte', action: 'Check-in' }
    ],
    checkOuts: [
        { room: '102', guest: 'Paolo Gialli', time: '10:00', total: '€420', action: 'Pagato' },
        { room: '207', guest: 'Sara Blu', time: '10:30', total: '€580', action: 'Pagato' },
        { room: '303', guest: 'Luca Rossi', time: '11:15', total: '€320', action: 'In attesa' }
    ]
};

// INIZIALIZZA I GRAFICI
function initCharts() {
    // Grafico Occupazione
    const occupancyCtx = document.getElementById('occupancyChart').getContext('2d');
    new Chart(occupancyCtx, {
        type: 'line',
        data: {
            labels: sampleData.occupancy.labels,
            datasets: [{
                label: 'Tasso Occupazione %',
                data: sampleData.occupancy.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Grafico Revenue
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: sampleData.revenue.labels,
            datasets: [{
                data: sampleData.revenue.data,
                backgroundColor: sampleData.revenue.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// CARICA I DATI DELLA DASHBOARD
function loadDashboardData() {
    // Simula caricamento dati
    setTimeout(() => {
        // Aggiorna le statistiche
        updateStats({
            totalRooms: 50,
            occupiedRooms: 35,
            availableRooms: 15,
            todayRevenue: 12540
        });

        // Popola le tabelle
        populateTable('today-checkins', sampleData.checkIns);
        populateTable('today-checkouts', sampleData.checkOuts);
    }, 500);
}

// AGGIORNA LE STATISTICHE
function updateStats(data) {
    const stats = {
        'total-rooms': data.totalRooms,
        'occupied-rooms': data.occupiedRooms,
        'available-rooms': data.availableRooms,
        'today-revenue': `€${data.todayRevenue.toLocaleString()}`
    };

    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// ANIMA I NUMERI DELLE STATISTICHE
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = stat.id === 'today-revenue' 
                ? `€${Math.floor(currentValue).toLocaleString()}`
                : Math.floor(currentValue);
        }, stepTime);
    });
}

// POPOLA LE TABELLE
function populateTable(tableId, data) {
    const tableBody = document.getElementById(tableId);
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        Object.values(item).forEach((value, index) => {
            const cell = document.createElement('td');
            
            // L'ultima colonna è per le azioni
            if (index === Object.values(item).length - 1) {
                cell.innerHTML = `<button class="action-btn ${value.toLowerCase()}">${value}</button>`;
            } else {
                cell.textContent = value;
            }
            
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Pulsante notifiche
    document.querySelector('.notification-btn').addEventListener('click', function() {
        this.querySelector('.notification-count').style.display = 'none';
        showNotification('Tutte le notifiche visualizzate!');
    });

    // Pulsante nuova prenotazione
    document.querySelector('.add-booking-btn').addEventListener('click', function() {
        showNotification('Modal nuova prenotazione aperta!');
        // Qui si aprirà il modal per nuova prenotazione
    });

    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`Avvio: ${action}`);
        });
    });

    // Filtri dei grafici
    document.querySelectorAll('.chart-filter').forEach(select => {
        select.addEventListener('change', function() {
            showNotification(`Filtro aggiornato: ${this.value}`);
        });
    });
}

// FUNZIONE PER MOSTRARE NOTIFICHE
function showNotification(message) {
    // Crea elemento notifica
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

    // Rimuovi dopo 3 secondi
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Aggiungi stili per l'animazione delle notifiche
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .action-btn {
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.3s;
    }
    
    .action-btn:hover {
        opacity: 0.9;
    }
    
    .action-btn.check-in {
        background: #10b981;
    }
    
    .action-btn.pagato {
        background: #3b82f6;
    }
    
    .action-btn.in\ attesa {
        background: #f59e0b;
    }
`;

document.head.appendChild(style);

// SIMULA DATI IN TEMPO REALE
function simulateLiveData() {
    setInterval(() => {
        // Aggiorna casualmente alcune statistiche
        const occupied = Math.floor(Math.random() * 10) + 30;
        const available = 50 - occupied;
        const revenue = Math.floor(Math.random() * 5000) + 10000;
        
        updateStats({
            totalRooms: 50,
            occupiedRooms: occupied,
            availableRooms: available,
            todayRevenue: revenue
        });
        
        // Aggiungi una notifica casuale
        if (Math.random() > 0.7) {
            const messages = [
                'Nuova prenotazione ricevuta!',
                'Check-in completato camera 205',
                'Pagamento ricevuto per camera 102',
                'Pulizia camera 312 completata'
            ];
            showNotification(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 10000); // Ogni 10 secondi
}

// Avvia simulazione dati in tempo reale (solo per demo)
simulateLiveData();