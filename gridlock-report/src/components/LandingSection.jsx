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

                {/* Problem Statement Cards */}
                <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="bg-gridlock-panel/50 p-6 rounded-xl border border-gridlock-red/20 hover:border-gridlock-red/50 transition-colors group">
                        <ShieldAlert className="w-8 h-8 text-gridlock-red mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">The Problem</h3>
                        <p className="text-sm text-gridlock-muted font-mono leading-relaxed">
                            47% of NYC crash data was invisible to planners due to sensor failures and ghost records.
                        </p>
                    </div>

                    <div className="bg-gridlock-panel/50 p-6 rounded-xl border border-gridlock-cyan/20 hover:border-gridlock-cyan/50 transition-colors group">
                        <BrainCircuit className="w-8 h-8 text-gridlock-cyan mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">The Solution</h3>
                        <p className="text-sm text-gridlock-muted font-mono leading-relaxed">
                            Automated Regex pattern mining recovered 24,500 coordinates from raw text descriptions.
                        </p>
                    </div>

                    <div className="bg-gridlock-panel/50 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                        <Database className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">The Impact</h3>
                        <p className="text-sm text-gridlock-muted font-mono leading-relaxed">
                            Data integrity restored to 93%, revealing 5 previously unknown high-risk intersections.
                        </p>
                    </div>
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
