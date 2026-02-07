import { motion } from "framer-motion";
import { Database, ArrowRight, FileWarning, Search, Calendar, ShieldCheck, Zap } from "lucide-react";

export const DataStorySection = ({ stats }) => {
    if (!stats) return null;

    const methodologies = [
        {
            icon: Search,
            title: "Spatial Recovery",
            desc: "Regex pattern mining extracted 24,500 coordinates from text fields.",
            color: "text-gridlock-cyan"
        },
        {
            icon: Calendar,
            title: "Temporal Fix",
            desc: "Standardized 60,000 dates to ISO 8601. Flagged 3,500 future dates.",
            color: "text-purple-400"
        },
        {
            icon: Zap,
            title: "Entity Resolution",
            desc: "Mapped 80+ vehicle variants (sedan, PK, 4dr) to 25 standard classes.",
            color: "text-amber-400"
        }
    ];

    return (
        <section className="min-h-screen py-24 px-4 bg-gridlock-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-4">
                        THE <span className="text-gridlock-cyan text-glow">TRANSFORMATION</span>
                    </h2>
                    <p className="text-gridlock-muted font-mono max-w-2xl mx-auto">
                        From chaotic raw data to a forensic-grade intelligence asset.
                    </p>
                </div>

                {/* 1. LEFT-RIGHT COMPARISON MAIN STAGE */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-24">

                    {/* LEFT: LEGACY */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/3 bg-gridlock-panel/80 border border-gridlock-red/30 p-8 rounded-2xl relative group hover:border-gridlock-red/60 transition-colors"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gridlock-red text-black font-bold font-mono px-4 py-1 rounded shadow-lg shadow-gridlock-red/20">
                            BEFORE: CHAOS
                        </div>
                        <div className="flex justify-between items-start mb-6 mt-2">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Legacy Dataset</h3>
                                <div className="text-gridlock-red font-mono text-sm">52% Integrity Score</div>
                            </div>
                            <FileWarning className="w-10 h-10 text-gridlock-red opacity-80" />
                        </div>

                        <div className="space-y-4 font-mono text-sm text-gridlock-muted">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>ROWS</span>
                                <span className="text-white">60,001</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>COLUMNS</span>
                                <span className="text-white">29 (Raw)</span>
                            </div>
                            <div className="pt-2 space-y-2">
                                <div className="flex gap-2 items-center text-red-400">
                                    <span className="text-xs">✕</span> 28,500 Missing Coordinates
                                </div>
                                <div className="flex gap-2 items-center text-red-400">
                                    <span className="text-xs">✕</span> 3,500 Future-Dated Rows
                                </div>
                                <div className="flex gap-2 items-center text-red-400">
                                    <span className="text-xs">✕</span> 80+ Vehicle Typos
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER: ANIMATED PIPELINE */}
                    <div className="hidden lg:flex flex-col items-center justify-center w-24 relative">
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight className="w-12 h-12 text-gridlock-cyan" />
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gridlock-cyan/5 blur-3xl rounded-full"></div>
                    </div>

                    {/* RIGHT: CLEAN */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/3 bg-gridlock-panel border border-gridlock-cyan/50 p-8 rounded-2xl relative shadow-[0_0_30px_rgba(0,243,255,0.1)] group"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gridlock-cyan text-black font-bold font-mono px-4 py-1 rounded shadow-lg shadow-gridlock-cyan/20">
                            AFTER: CLARITY
                        </div>
                        <div className="flex justify-between items-start mb-6 mt-2">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Forensic Clean</h3>
                                <div className="text-gridlock-cyan font-mono text-sm">98% Integrity Score</div>
                            </div>
                            <Database className="w-10 h-10 text-gridlock-cyan" />
                        </div>

                        <div className="space-y-4 font-mono text-sm text-white">
                            <div className="flex justify-between border-b border-gridlock-cyan/20 pb-2">
                                <span>ROWS</span>
                                <span className="text-gridlock-cyan text-glow">60,001 (Preserved)</span>
                            </div>
                            <div className="flex justify-between border-b border-gridlock-cyan/20 pb-2">
                                <span>COLUMNS</span>
                                <span>34 (+Engineering)</span>
                            </div>

                            <div className="pt-2 space-y-2">
                                <div className="flex gap-2 items-center text-gridlock-cyan">
                                    <span className="text-xs">✓</span> <b>24,500+</b> Coords Recovered
                                </div>
                                <div className="flex gap-2 items-center text-gridlock-cyan">
                                    <span className="text-xs">✓</span> <b>100%</b> ISO Date Standard
                                </div>
                                <div className="flex gap-2 items-center text-gridlock-cyan">
                                    <span className="text-xs">✓</span> <b>8,342</b> Vulnerable Risks
                                </div>
                            </div>

                            {/* New Engineering Features List */}
                            <div className="mt-4 pt-4 border-t border-gridlock-cyan/20">
                                <div className="text-[10px] uppercase text-gridlock-muted mb-2 tracking-wider">Engineered Features</div>
                                <div className="text-xs text-gridlock-cyan/80 grid grid-cols-1 gap-1">
                                    <span>+ Severity Risk Score</span>
                                    <span>+ Vulnerability Index</span>
                                    <span>+ Spatial Recovery Flag</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 2. QUALITY IMPACT METRICS (FROM AUDIT SUMMARY) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-gridlock-panel/40 border border-gridlock-cyan/30 p-6 rounded-xl text-center"
                    >
                        <div className="text-3xl font-bold text-white mb-1">+41%</div>
                        <div className="text-xs text-gridlock-cyan uppercase tracking-wider font-bold">Coords Recovered</div>
                        <div className="text-[10px] text-gridlock-muted mt-2">52% → 93% Completeness</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gridlock-panel/40 border border-purple-500/30 p-6 rounded-xl text-center"
                    >
                        <div className="text-3xl font-bold text-white mb-1">+45%</div>
                        <div className="text-xs text-purple-400 uppercase tracking-wider font-bold">Date Consistency</div>
                        <div className="text-[10px] text-gridlock-muted mt-2">55% → 100% ISO Standard</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gridlock-panel/40 border border-amber-500/30 p-6 rounded-xl text-center"
                    >
                        <div className="text-3xl font-bold text-white mb-1">+75%</div>
                        <div className="text-xs text-amber-400 uppercase tracking-wider font-bold">Vehicle Standards</div>
                        <div className="text-[10px] text-gridlock-muted mt-2">Mapped 80+ Variants</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gridlock-panel/40 border border-green-500/30 p-6 rounded-xl text-center"
                    >
                        <div className="text-3xl font-bold text-white mb-1">+35%</div>
                        <div className="text-xs text-green-400 uppercase tracking-wider font-bold">Overall Usability</div>
                        <div className="text-[10px] text-gridlock-muted mt-2">Ready for Power BI</div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
