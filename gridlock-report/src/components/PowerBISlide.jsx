import { motion } from "framer-motion";
import { ExternalLink, BarChart2 } from "lucide-react";

export const PowerBISlide = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-gridlock-bg text-center">

            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gridlock-cyan/5 via-black to-black opacity-50 pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full bg-gridlock-panel/80 backdrop-blur border border-gridlock-cyan/20 p-12 rounded-2xl relative overflow-hidden group hover:border-gridlock-cyan/40 transition-colors z-10"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gridlock-cyan to-transparent opacity-50" />

                <div className="w-20 h-20 bg-gridlock-bg rounded-full border border-gridlock-cyan/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <BarChart2 className="w-10 h-10 text-gridlock-cyan" />
                </div>

                <h2 className="text-4xl md:text-6xl font-tech font-bold mb-6 text-white tracking-tight">
                    INTERACTIVE <span className="text-gridlock-cyan text-glow">DASHBOARD</span>
                </h2>

                <p className="text-xl text-gridlock-muted font-mono mb-10 max-w-2xl mx-auto leading-relaxed">
                    Access the full Power BI environment to explore 60,000 records, filter by borough, and drill down into street-level entropy.
                </p>

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("For the pitch: Switch window to Power BI Desktop now!");
                    }}
                    className="inline-flex items-center gap-3 bg-gridlock-cyan text-black px-8 py-4 rounded font-bold font-mono tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.6)] transform hover:-translate-y-1"
                >
                    <ExternalLink className="w-5 h-5" />
                    OPEN ANALYTICS HUB
                </a>
            </motion.div>
        </div>
    );
};
