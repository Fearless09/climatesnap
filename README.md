# 🌤️ ClimateSnap

> A modern, high-fidelity real-time weather forecasting and climate insights dashboard built with Next.js, React 19, Tailwind CSS, and GSAP.

ClimateSnap delivers immediate, hyper-local weather updates, interactive 5-day forecast timelines, global city search, and a personalized favorites wishlist. Featuring a sleek glassmorphic UI, fluid GSAP micro-animations, and full dark/light theme support, it offers a premium user experience for weather tracking.

---

## 🚀 Features

- **📍 Intelligent Geolocation Detection**: Automatically queries browser geolocation coordinates to fetch instant, local weather data on load.
- **🔍 Global Location Search**: Seamlessly lookup any city or region globally using integrated geocoding, resolving location names to precise coordinates.
- **📊 Interactive Current Weather Card**: Displays real-time temperature, "feels like" temp, wind speed, humidity, atmospheric pressure, cloud coverage, and precipitation.
- **📅 5-Day Forecast Timeline**: Provides a clean chronological breakdown of temperature trends and weather conditions for the upcoming days.
- **❤️ Favorites & Wishlist Management**: Save and track your favorite global cities. Locations are persisted locally for quick, one-click access and comparative views.
- **✨ Premium UI & Micro-Animations**: Smooth visual transitions and entry effects powered by **GSAP** and interactive Lottie animations using `@lottiefiles/dotlottie-react`.
- **🌓 Adaptive Theme Engine**: Native Dark/Light mode toggle with clean state transitions facilitated by `next-themes`.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native PostCSS configuration
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & [@gsap/react](https://gsap.com/resources/React/)
- **Lottie Player**: [@lottiefiles/dotlottie-react](https://github.com/LottieFiles/dotlottie-react)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Utility**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📂 Project Structure

```text
climatesnap/
├── src/
│   ├── app/                    # Next.js App Router (Layouts, API Routes, Global Styles)
│   │   ├── api/
│   │   │   ├── address/        # Geocoding / Location Resolution API
│   │   │   ├── forecast/       # 5-Day Weather Forecast API
│   │   │   └── weather/        # Current Weather API
│   │   ├── globals.css         # Tailwind & custom CSS variables
│   │   ├── layout.tsx          # Root Layout & Provider bindings
│   │   └── page.tsx            # Main application entrypoint
│   ├── components/             # React Component Library
│   │   ├── Home/               # Main Dashboard views
│   │   ├── shared/             # Reusable page sections (Navbar, Footer, WeatherCard, etc.)
│   │   └── ui/                 # Atomic UI components (Buttons, Switches)
│   ├── context/                # Global State (Weather & Favorites Context)
│   ├── data/                   # Default settings & mock configurations
│   ├── hooks/                  # Custom hooks (Toggle, Debounce, Scroll, Close, etc.)
│   ├── types/                  # TypeScript interface declarations
│   └── utils/                  # Utility functions (Helpers, fetcher, gsap)
├── public/                     # Static assets (Lottie configurations, favicon)
├── package.json                # Project dependencies & script files
└── tsconfig.json               # TypeScript compiler options
```

---

## 🔌 API Endpoints & Services

ClimateSnap abstracts external API requests through server-side Next.js route handlers:

1. **Address Resolution (`/api/address`)**:
   - Integrates with the **OpenCage Geocoding API** to translate textual search queries (e.g. "Paris") into geocoded coordinates, confidence scores, and country details.
2. **Current Weather (`/api/weather`)**:
   - Communicates with the **OpenWeatherMap API** to fetch real-time atmospheric metrics for specific coordinates.
3. **Forecast (`/api/forecast`)**:
   - Queries the **OpenWeatherMap 5-Day/3-Hour Forecast API** to gather upcoming climate trajectories.

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) and the package manager [pnpm](https://pnpm.io/).

### 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/climatesnap.git
   cd climatesnap
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (or update the existing one) with your API keys:
   ```env
   OPEN_WEATHER_API_KEY=your_open_weather_map_api_key
   OPEN_CAGE_API_KEY=your_opencage_data_api_key
   ```

4. **Launch the Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📝 Verification & Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Create a production bundle.
- `pnpm start`: Run the built production application.
- `pnpm lint`: Run ESLint analysis for code quality.
