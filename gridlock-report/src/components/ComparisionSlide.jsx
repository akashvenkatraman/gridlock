import { motion } from "framer-motion";
import { FileWarning, ArrowRight, CheckCircle, Database, AlertCircle } from "lucide-react";

export const ComparisionSlide = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-gridlock-bg overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gridlock-cyan/5 blur-3xl rounded-full translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gridlock-red/5 blur-3xl rounded-full -translate-x-1/2 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-12 relative z-10"
            >
                <div className="inline-block bg-gridlock-panel/80 backdrop-blur px-4 py-1 rounded-full border border-white/10 text-[10px] uppercase font-mono text-gridlock-muted mb-4 tracking-[0.2em] shadow-lg">
                    Forensic Transformation Pipeline
                </div>
                <h2 className="text-3xl md:text-5xl font-tech font-black text-white tracking-tight">
                    THE <span className="text-gridlock-red text-glow-red">PROBLEM</span> <span className="text-zinc-600 text-2xl px-2 font-mono">VS</span> <span className="text-gridlock-cyan text-glow">SOLUTION</span>
                </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-6xl w-full px-4 relative z-10">

                {/* OLD DATA CARD */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="flex-1 bg-gridlock-panel/80 backdrop-blur border border-gridlock-red/30 p-8 rounded-2xl relative group hover:border-gridlock-red/60 transition-all hover:shadow-[0_0_30px_rgba(255,0,60,0.1)]"
                >
                    <div className="absolute -top-3 left-6 bg-gridlock-red text-black px-3 py-1 text-[10px] font-bold font-mono rounded uppercase tracking-wider shadow-lg">
                        Legacy Dataset
                    </div>

                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="text-[10px] text-gridlock-muted uppercase tracking-wider mb-1">Data Health Score</div>
                            <div className="text-4xl font-mono font-bold text-white leading-none">{stats.old_stats.integrity_score}%</div>
                            <div className="text-xs text-gridlock-red mt-1 font-bold animate-pulse">CRITICAL FAILURE</div>
                        </div>
                        <div className="p-3 bg-gridlock-red/10 rounded-xl border border-gridlock-red/20">
                            <FileWarning className="w-8 h-8 text-gridlock-red" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 bg-black/40 rounded border border-gridlock-red/10 flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-gridlock-red mt-0.5 shrink-0" />
                            <div>
                                <div className="text-sm text-gridlock-red font-bold font-mono">{stats.old_stats.missing_coords.toLocaleString()} Missing Coords</div>
                                <div className="text-xs text-gridlock-muted">47.5% of crashes invisible to city planners</div>
                            </div>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-gridlock-red/10 flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-gridlock-red shrink-0" />
                            <span className="text-sm text-gridlock-muted font-mono">3,500 Ghost Records (Future Dates)</span>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-gridlock-red/10 flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-gridlock-red shrink-0" />
                            <span className="text-sm text-gridlock-muted font-mono">Unstandardized Schema</span>
                        </div>
                    </div>
                </motion.div>

                {/* TRANSITION ARROW */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                    className="self-center text-gridlock-muted/20 md:rotate-0 rotate-90"
                >
                    <ArrowRight className="w-10 h-10 md:w-12 md:h-12" />
                </motion.div>

                {/* NEW DATA CARD */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                    className="flex-1 bg-gridlock-panel/80 backdrop-blur border border-gridlock-cyan/30 p-8 rounded-2xl relative group hover:border-gridlock-cyan/60 transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]"
                >
                    <div className="absolute -top-3 right-6 bg-gridlock-cyan text-black px-3 py-1 text-[10px] font-bold font-mono rounded uppercase tracking-wider shadow-lg">
                        Forensic Clean
                    </div>

                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="text-[10px] text-gridlock-muted uppercase tracking-wider mb-1">Data Health Score</div>
                            <div className="text-4xl font-mono font-bold text-white leading-none">{stats.integrity_score}%</div>
                            <div className="text-xs text-gridlock-cyan mt-1 font-bold">OPTIMIZED & READY</div>
                        </div>
                        <div className="p-3 bg-gridlock-cyan/10 rounded-xl border border-gridlock-cyan/20">
                            <Database className="w-8 h-8 text-gridlock-cyan" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 bg-black/40 rounded border border-gridlock-cyan/20 flex items-start gap-3 shadow-[inset_0_0_10px_rgba(0,243,255,0.05)]">
                            <CheckCircle className="w-4 h-4 text-gridlock-cyan mt-0.5 shrink-0" />
                            <div>
                                <div className="text-sm text-white font-bold font-mono">{stats.recovered_coords.toLocaleString()} Coordinates Recovered</div>
                                <div className="text-xs text-gridlock-cyan">Using Regex Pattern Extraction</div>
                            </div>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-gridlock-cyan/10 flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-gridlock-cyan shrink-0" />
                            <span className="text-sm text-gridlock-muted font-mono">ISO 8601 Temporal Standardization</span>
                        </div>
                        <div className="p-3 bg-black/40 rounded border border-gridlock-cyan/10 flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-gridlock-cyan shrink-0" />
                            <span className="text-sm text-gridlock-muted font-mono">Severity & Vulnerability Scoring</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
