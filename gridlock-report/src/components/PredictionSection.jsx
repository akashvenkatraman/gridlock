import { motion } from "framer-motion";
import { TrendingUp, ShieldAlert, Zap } from "lucide-react";

export const PredictionSection = () => {
    return (
        <section className="py-24 px-4 bg-gridlock-panel/30 border-t border-white/5 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gridlock-cyan/5 blur-3xl rounded-full scale-150 opacity-20 animate-pulse-slow"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block bg-gridlock-cyan/10 text-gridlock-cyan border border-gridlock-cyan/50 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest mb-4"
                    >
                        FUTURE OUTLOOK
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-4">
                        PREDICTIVE <span className="text-white text-glow-red">RISK MODEL</span>
                    </h2>
                    <p className="text-gridlock-muted font-mono max-w-2xl mx-auto">
                        Project GRIDLOCK goes beyond historical analysis. We forecast risk to prevent future tragedies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Risk Forecast */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-gridlock-panel border border-white/10 p-8 rounded-xl hover:border-gridlock-cyan/50 transition-colors group"
                    >
                        <div className="w-14 h-14 bg-gridlock-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-8 h-8 text-gridlock-cyan" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">24-Hour Forecast</h3>
                        <p className="text-sm text-gridlock-muted font-mono mb-4">
                            Our model predicts a <span className="text-white font-bold">15% spike</span> in severity for Queens Blvd during tomorrow's evening rush (17:00 - 19:00).
                        </p>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gridlock-cyan h-full w-[75%]"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gridlock-cyan font-mono">
                            <span>CONFIDENCE</span>
                            <span>89%</span>
                        </div>
                    </motion.div>

                    {/* Card 2: Resource Allocation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gridlock-panel border border-white/10 p-8 rounded-xl hover:border-gridlock-red/50 transition-colors group"
                    >
                        <div className="w-14 h-14 bg-gridlock-red/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldAlert className="w-8 h-8 text-gridlock-red" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Resource Deployment</h3>
                        <p className="text-sm text-gridlock-muted font-mono mb-4">
                            Reallocate <span className="text-white font-bold">5 Patrol Units</span> from Manhattan Lower East Side to the newly identified 'Ghost' intersections in Brooklyn.
                        </p>
                        <ul className="text-xs text-gridlock-muted space-y-2 mt-4 border-t border-white/5 pt-4">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-gridlock-red rounded-full"></span> Belt Pkwy & Bay Pkwy
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-gridlock-red rounded-full"></span> Linden Blvd
                            </li>
                        </ul>
                    </motion.div>

                    {/* Card 3: Policy Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gridlock-panel border border-white/10 p-8 rounded-xl hover:border-white/50 transition-colors group"
                    >
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Policy Action</h3>
                        <p className="text-sm text-gridlock-muted font-mono mb-4">
                            Immediate infrastructure audit required for the <span className="text-white font-bold">24,500 recovered crash sites</span>. 60% lack adequate lighting markings.
                        </p>
                        <div className="inline-block border border-white/30 text-white text-xs px-3 py-1 rounded font-mono mt-2">
                            PRIORITY: CRITICAL
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
