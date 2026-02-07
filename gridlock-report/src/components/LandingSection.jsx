import { motion } from "framer-motion";
import { ChevronDown, Database, ShieldAlert, BrainCircuit } from "lucide-react";
import { GlitchText } from "./ui/Card";

export const LandingSection = ({ meta, stats }) => {
    if (!meta) return null;

    return (
        <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Video/Effect */}
            <div className="absolute inset-0 bg-gridlock-bg">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gridlock-bg/80 to-gridlock-bg" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                {/* Event Name */}
                <div className="inline-block mb-6 px-4 py-1 rounded-full border border-gridlock-cyan/30 bg-gridlock-cyan/5 backdrop-blur">
                    <span className="text-gridlock-cyan font-mono text-sm tracking-[0.2em] uppercase">
                        {meta.event_name}
                    </span>
                </div>

                {/* Title */}
                <div className="mb-2">
                    <GlitchText text="PROJECT GRIDLOCK" className="text-6xl md:text-9xl font-black text-white tracking-tighter" />
                </div>
                <div className="text-xl md:text-2xl text-gridlock-muted font-mono mb-12 max-w-2xl mx-auto">
                    Forensic Data Audit & remediation
                </div>

                {/* Team */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {meta.members.map((member, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-lg border border-white/5 hover:border-gridlock-cyan/30 transition-colors">
                            <div className="w-2 h-2 bg-gridlock-cyan rounded-full animate-pulse" />
                            <span className="font-mono text-sm font-bold text-white">{member}</span>
                        </div>
                    ))}
                </div>

                {/* PROBLEM / SOLUTION / IMPACT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full mb-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 bg-gridlock-panel/40 backdrop-blur border border-gridlock-red/20 hover:border-gridlock-red/50 rounded-xl group transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldAlert className="w-6 h-6 text-gridlock-red" />
                            <h3 className="text-xl font-bold text-white">The Problem</h3>
                        </div>
                        <p className="text-gridlock-muted text-sm leading-relaxed mb-4">
                            NYC's $1.8B Vision Zero initiative manages safety, but the underlying data was critically flawed, blinding city planners.
                        </p>
                        <ul className="text-xs text-gridlock-muted space-y-2 font-mono border-t border-white/5 pt-4">
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-red">✕</span> 47% of crash locations were NULL/Missing.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-red">✕</span> 3,000+ "Ghost Rows" set in the future (2026).
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-red">✕</span> 80+ variations for a single vehicle type.
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-6 bg-gridlock-panel/40 backdrop-blur border border-gridlock-cyan/20 hover:border-gridlock-cyan/50 rounded-xl group transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <BrainCircuit className="w-6 h-6 text-gridlock-cyan" />
                            <h3 className="text-xl font-bold text-white">The Solution</h3>
                        </div>
                        <p className="text-gridlock-muted text-sm leading-relaxed mb-4">
                            We built a forensic Python pipeline to extract, clean, and standardize the raw data into actionable intelligence.
                        </p>
                        <ul className="text-xs text-gridlock-muted space-y-2 font-mono border-t border-white/5 pt-4">
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-cyan">✓</span> Regex Mining recovered 24,500+ coordinates.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-cyan">✓</span> Entity Resolution unified 394 vehicle types to 14.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gridlock-cyan">✓</span> ISO 8601 Standardization for all dates/times.
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-6 bg-gridlock-panel/40 backdrop-blur border border-white/10 hover:border-white/30 rounded-xl group transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-white" />
                            <h3 className="text-xl font-bold text-white">The Impact</h3>
                        </div>
                        <p className="text-gridlock-muted text-sm leading-relaxed mb-4">
                            Restored data integrity to 93%, revealing hidden dangers and enabling precise resource allocation for the first time.
                        </p>
                        <ul className="text-xs text-gridlock-muted space-y-2 font-mono border-t border-white/5 pt-4">
                            <li className="flex items-start gap-2">
                                <span className="text-white">★</span> 5 Hidden "High-Risk" Intersections Exposed.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white">★</span> 92.3% Global Data Integrity Score Achieved.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white">★</span> Power BI Ready Dataset for Legislative Action.
                            </li>
                        </ul>
                    </motion.div>

                </div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gridlock-muted"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
};
