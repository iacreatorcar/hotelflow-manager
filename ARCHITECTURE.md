🏨 HotelFlow Manager - Architecture Diagram



## Project Structure Overview



```mermaid

graph TB

    %% Stili

    classDef public fill:#e3f2fd,stroke:#2196f3,stroke-width:2px

    classDef protected fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px

    classDef assets fill:#e8f5e8,stroke:#4caf50,stroke-width:2px

    classDef config fill:#fff3e0,stroke:#ff9800,stroke-width:2px

    

    %% Nodo principale

    subgraph "🏨 HotelFlow Manager - System Architecture"

        direction TB

        

        %% LIVELLO 1: Pubbliche

        subgraph "🌐 Public Access"

            P1["index.html<br/>Landing Page"]

            P2["login.html<br/>Authentication"]

            P3["demo.html<br/>Live Demo"]

            P4["features.html<br/>Features"]

            P5["pricing.html<br/>Pricing"]

        end

        

        %% LIVELLO 2: Application (protetta)

        subgraph "🔐 Application Core"

            A1["📊 Dashboard<br/>Real-time Analytics"]

            A2["📅 Bookings<br/>Calendar & Management"]

            A3["🛏️ Rooms<br/>Floor Plan & Status"]

            A4["👥 Guests<br/>CRM & Loyalty"]

            A5["💰 Billing<br/>Invoices & Payments"]

        end

        

        %% LIVELLO 3: Funzionalità Avanzate

        subgraph "✨ Advanced Features"

            F1["👑 Loyalty Program<br/>4-tier system"]

            F2["⚡ Quick Operations<br/>30-second check-in"]

            F3["📱 Mobile Responsive<br/>All devices"]

            F4["🎨 Animated UI<br/>Smooth transitions"]

        end

        

        %% LIVELLO 4: Tecnologie

        subgraph "🛠️ Tech Stack"

            T1["HTML5<br/>Semantic markup"]

            T2["CSS3<br/>Flexbox/Grid"]

            T3["JavaScript ES6+<br/>Vanilla JS"]

            T4["Chart.js<br/>Data visualization"]

            T5["Font Awesome<br/>Icons"]

            T6["Flatpickr<br/>Date handling"]

        end

    end

    

    %% Connessioni

    P2 -->|Authenticates| A1

    P1 -->|Promotes| P3

    P3 -->|Demo Access| A1

    

    A1 -->|Manages| A2

    A1 -->|Monitors| A3

    A1 -->|Analyzes| A4

    A2 -->|Creates| A5

    

    A4 -->|Includes| F1

    A4 -->|Includes| F2

    

    T1 -->|Markup| P1

    T1 -->|Markup| A1

    T2 -->|Styling| All

    T3 -->|Logic| All

    T4 -->|Charts| A1

    T5 -->|Icons| All

    T6 -->|Dates| A2

    

    %% Applica stili

    class P1,P2,P3,P4,P5 public

    class A1,A2,A3,A4,A5 protected

    class F1,F2,F3,F4 assets

    class T1,T2,T3,T4,T5,T6 config

```



## File Structure



```mermaid

graph TD

    Root["hotelflow-manager/"] --> Public["Public Pages"]

    Root --> App["Application"]

    Root --> Assets["Assets"]

    Root --> Docs["Documentation"]

    

    Public --> P1["index.html"]

    Public --> P2["login.html"]

    Public --> P3["demo.html"]

    

    App --> A1["pages/app/dashboard.html"]

    App --> A2["pages/app/bookings.html"]

    App --> A3["pages/app/rooms.html"]

    App --> A4["pages/app/guests.html"]

    App --> A5["pages/app/loyalty.html"]

    

    Assets --> Css["css/"]

    Assets --> Js["js/"]

    Assets --> Img["assets/"]

    

    Css --> C1["style.css"]

    Css --> C2["dashboard.css"]

    Css --> C3["bookings.css"]

    Css --> C4["auth.css"]

    

    Js --> J1["main.js"]

    Js --> J2["dashboard.js"]

    Js --> J3["bookings.js"]

    Js --> J4["auth.js"]

    

    Docs --> D1["README.md"]

    Docs --> D2["LICENSE.md"]

    Docs --> D3["ARCHITECTURE.md"]

    Docs --> D4["vercel.json"]

```



## User Flow



```mermaid

flowchart LR

    Start["User visits site"] --> Landing["Landing Page"]

    Landing --> Choose{User chooses}

    

    Choose -->|Try Demo| Demo["Live Demo"]

    Choose -->|Login| Login["Authentication"]

    Choose -->|Learn More| Features["Features Page"]

    

    Demo --> DemoApp["Demo Application"]

    Login --> Validate{Credentials Check}

    

    Validate -->|Valid| MainApp["Main Application"]

    Validate -->|Invalid| Error["Error Message"]

    

    MainApp --> Dashboard["Dashboard"]

    Dashboard --> Modules{Select Module}

    

    Modules --> Bookings["Bookings"]

    Modules --> Rooms["Rooms"]

    Modules --> Guests["Guests"]

    Modules --> Reports["Reports"]

    

    Bookings --> Actions{Booking Actions}

    Actions --> New["New Booking"]

    Actions --> Edit["Edit Booking"]

    Actions --> Cancel["Cancel Booking"]

    

    Guests --> GuestActions{Guest Actions}

    GuestActions --> CheckIn["Quick Check-in"]

    GuestActions --> CheckOut["Quick Check-out"]

    GuestActions --> DayUse["Day Use"]

    

    Error --> Retry["Retry Login"]

    Retry --> Login

    

    DemoApp --> EndDemo["End Demo Session"]

    EndDemo --> Landing

```



## Technology Stack



```mermaid

quadrantChart

    title "HotelFlow Manager Tech Stack"

    x-axis "Low Level" --> "High Level"

    y-axis "Specialized" --> "Universal"

    

    "HTML5": [0.2, 0.8]

    "CSS3": [0.3, 0.7]

    "JavaScript": [0.6, 0.6]

    "Chart.js": [0.7, 0.4]

    "Font Awesome": [0.8, 0.3]

    "Flatpickr": [0.7, 0.3]

    "LocalStorage": [0.5, 0.5]

```



## Development Progress



```mermaid

gantt

    title HotelFlow Manager Development Timeline

    dateFormat  YYYY-MM-DD

    section Core Modules

    Authentication     :2024-01-01, 7d

    Dashboard          :2024-01-08, 10d

    Booking System     :2024-01-15, 12d

    Room Management    :2024-01-22, 10d

    Guest CRM          :2024-01-29, 12d

    

    section Advanced Features

    Loyalty Program    :2024-02-10, 14d

    Quick Operations   :2024-02-20, 10d

    Billing System     :2024-03-01, 14d

    

    section Future Development

    Multi-user System  :2024-03-15, 21d

    Python Backend     :2024-04-05, 30d

    Mobile App         :2024-05-01, 45d

```



## Legend

- 🟦 **Blue**: Public pages (accessible to all)

- 🟪 **Purple**: Protected application (requires login)

- 🟩 **Green**: Assets and resources

- 🟧 **Orange**: Configuration and documentation



---



*Diagrams created with Mermaid.js - Automatically rendered by GitHub*
