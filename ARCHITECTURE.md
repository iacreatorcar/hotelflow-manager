# 🏛️ HotelFlow Manager - High-Level Architecture

Questo documento descrive l'architettura tecnica e il design del sistema di **HotelFlow Manager**. Il progetto segue i principi della **Separation of Concerns (SoC)** e si prepara per una transizione verso un'architettura esagonale (Hexagonal Architecture) con il futuro rilascio del backend.

---

## 💎 Architectural Principles

Il sistema è stato progettato seguendo tre pilastri fondamentali:

1.  **Performance First:** Utilizzo di Vanilla JS per eliminare l'overhead dei framework e garantire un'interazione fluida (<100ms di latenza UI).
2.  **Modularity:** Ogni modulo (Booking, Guests, Loyalty) è isolato a livello di logica e stile per facilitare la manutenzione.
3.  **Data-Driven Design:** L'intera Dashboard è alimentata da un motore di visualizzazione dati centralizzato che trasforma i dati grezzi in KPI azionabili.

---

## 📊 System Architecture Diagram

Il diagramma seguente illustra il flusso dei dati e la gerarchia dei permessi, distinguendo tra l'accesso pubblico e il core applicativo protetto.

```mermaid
graph TB
    %% Stili
    classDef public fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef protected fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef assets fill:#e8f5e8,stroke:#4caf50,stroke-width:2px
    classDef config fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    
    subgraph "🏨 HotelFlow Manager - System Architecture"
        direction TB
        
        subgraph "🌐 Public Access"
            P1["index.html<br/>Landing Page"]
            P2["login.html<br/>Authentication"]
            P3["demo.html<br/>Live Demo"]
        end
        
        subgraph "🔐 Application Core (Business Logic)"
            A1["📊 Dashboard<br/>Real-time Analytics"]
            A2["📅 Bookings<br/>Calendar & Management"]
            A3["🛏️ Rooms<br/>Floor Plan & Status"]
            A4["👥 Guests<br/>CRM & Loyalty"]
        end
        
        subgraph "✨ Advanced Engines"
            F1["👑 Loyalty Program<br/>4-tier system"]
            F2["⚡ Quick Operations<br/>30-second check-in"]
        end
        
        subgraph "🛠️ Tech Stack"
            T1["HTML5/CSS3"]
            T3["JS ES6+"]
            T4["Chart.js"]
        </div>
    end
    
    %% Connessioni
    P2 -->|Authenticates| A1
    P3 -->|Demo Session| A1
    A1 -->|Aggregates| A2
    A1 -->|Monitors| A3
    A4 -->|Processes| F1
    A4 -->|Triggers| F2
    
    class P1,P2,P3 public
    class A1,A2,A3,A4 protected
    class F1,F2 assets
    class T1,T3,T4 config
