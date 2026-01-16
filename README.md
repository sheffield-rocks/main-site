# sheffield.rocks 🎸

A high-performance, visually immersive landing page for the future of Sheffield's digital landscape. Built with modern web technologies, featuring a dynamic environment that reflects the real-time atmosphere of the Steel City.

---

## ✨ Features

- **Dynamic Sky Engine**: A real-time atmospheric system that transitions between **Day**, **Dusk**, and **Night** based on actual sunrise and sunset times in Sheffield.
- **Weather Integration**: Seamlessly adjusts the environment to reflect local weather conditions (Sun, Clouds, Overcast) using the Open-Meteo API.
- **Iconic Landmarks**: Custom-crafted SVG silhouettes of Sheffield's famous skyline, including:
  - **The Arts Tower** & **Owen Building**
  - **St Paul's Tower**
  - **Sheffield Town Hall** (with the iconic clock)
  - **Park Hill Flats**
- **Premium Aesthetics**: Smooth transitions via **Framer Motion**, glassmorphism effects, and a responsive design that feels alive.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Runtime**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data**: [Open-Meteo API](https://open-meteo.com/) for real-time solar and weather data.
- **Deployment**: [GitHub Pages](https://pages.github.com) via automated [GitHub Actions](https://github.com/features/actions).

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sheffield-rocks.git
   cd sheffield-rocks
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛰 How it Works: The Sky Engine

The site will rely on the data repo's scheduled workflow to fetch real-time data for Sheffield (Lat: 53.3811, Long: -1.4701).
For now, the dynamic sky is disabled and we use a static preset until a dynamic backend is live.

1. **Scheduled Updates**: The data repo runs `pipelines/sky/update-sky-data.ts`.
2. **Data Fetching**: It queries Open-Meteo for the current daily sunrise/sunset and weather code.
3. **Static Config**: The results are saved to `data/sky/sky-config.json` in the data repo.
4. **Consumption**: This app reads from the data repo via `SHEFFIELD_DATA_BASE_URL` or `SHEFFIELD_DATA_DIR` at build time to set the initial `SkyPreset`.

## 📦 Deployment

This project is optimized for **GitHub Pages**.

1. **Static Export**: Configured with `output: 'export'` in `next.config.ts`.
2. **Automated Workflow**: Pushing to the `main` branch triggers `.github/workflows/deploy.yml`, which builds the project and deploys it.
3. **Custom Domain**: Ready for `sheffield.rocks`. To switch from the default `.github.io` path, adjust the `BASE_PATH` in the deployment workflow.

---

Built with ❤️ for Sheffield.
