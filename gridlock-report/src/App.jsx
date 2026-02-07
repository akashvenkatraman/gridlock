import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Components
import { LandingSection } from "./components/LandingSection";
import { DataStorySection } from "./components/DataStorySection";
import { InteractiveMap } from "./components/InteractiveMap";
import { DangerCards } from "./components/DangerCards";
import { Timeline } from "./components/Timeline";
import { DashboardSlide } from "./components/DashboardSlide";
import { PredictionSection } from "./components/PredictionSection";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Use Vite's BASE_URL for correct path on GitHub Pages
    const dataUrl = `${import.meta.env.BASE_URL}web_data_v2.json`;
    console.log(`App: Fetching data from ${dataUrl}...`);

    fetch(dataUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("App: Data loaded", data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("App: Failed to load data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gridlock-bg text-gridlock-cyan font-mono animate-pulse">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">INITIALIZING...</div>
          <div className="text-sm opacity-50">LOADING FORENSIC DATASET</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gridlock-bg text-white font-mono">
        <div className="text-center p-8 border border-red-500 rounded bg-red-900/20">
          <div className="text-2xl font-bold mb-2 text-red-500">DATA LOAD FAILED</div>
          <p className="text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transistion">
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gridlock-bg min-h-screen text-white selection:bg-gridlock-cyan/30 font-sans">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gridlock-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <main className="flex flex-col gap-0">

        {/* 1. LANDING (Event, Team, Problem) */}
        <LandingSection meta={data.meta.team} />

        {/* 2. DATA STORY (Old vs New, Cleaning Stats) */}
        <DataStorySection stats={data.stats} stories={data.stories} />

        {/* 3. INTERACTIVE MAP (The Reveal) */}
        <section className="min-h-screen flex flex-col justify-center px-4 py-24 bg-black relative">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-2">
                SPATIAL <span className="text-gridlock-cyan text-glow">RECOVERY</span>
              </h2>
              <p className="text-gridlock-muted font-mono">
                Drag the slider to reveal the 24,500 crashes that were previously invisible.
              </p>
            </div>
            <div className="h-[70vh] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <InteractiveMap data={data.map_points} />
            </div>
          </div>
        </section>

        {/* 4. INSIGHTS (Danger Zones + Timeline) */}
        <section className="py-24 px-4 bg-gridlock-panel/10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-4">
                HIDDEN <span className="text-gridlock-red text-glow-red">DANGERS</span>
              </h2>
              <p className="text-gridlock-muted font-mono max-w-2xl mx-auto">
                Our recovery revealed these 5 high-risk intersections that were previously unranked.
              </p>
            </div>

            <DangerCards zones={data.danger_zones} />

            <div className="mt-24">
              <h3 className="text-2xl font-tech text-white mb-8 border-l-4 border-gridlock-cyan pl-4">
                SEVERITY TIMELINE
              </h3>
              <div className="bg-black/40 p-8 rounded-xl border border-white/5 backdrop-blur h-[400px]">
                <Timeline data={data.timeline} />
              </div>
            </div>
          </div>
        </section>

        {/* 5. NATIVE ANALYTICS (Recharts) */}
        <section className="py-24 px-4">
          <DashboardSlide charts={data.charts} />
        </section>

        {/* 6. PREDICTIVE INSIGHTS */}
        <PredictionSection />

        {/* 7. FOOTER */}
        <footer className="py-20 text-center bg-black border-t border-white/10">
          <h1 className="text-4xl md:text-6xl font-tech font-black text-white mb-8">
            THANK <span className="text-gridlock-cyan text-glow">YOU</span>
          </h1>
          <p className="text-gridlock-muted font-mono mb-8">Data Masters | Analytics Showdown 4.0</p>
          <a
            href="/Motor_Vehicle_Collisions_FINAL_CLEAN.csv"
            className="inline-block bg-gridlock-cyan text-black px-8 py-3 rounded font-bold font-mono hover:bg-white transition-colors"
          >
            DOWNLOAD DATASET (CSV)
          </a>
        </footer>

      </main>
    </div>
  );
}

export default App;
