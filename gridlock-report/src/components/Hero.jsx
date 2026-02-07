import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, FileWarning, Search, EyeOff } from "lucide-react";

export const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-gridlock-bg">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="z-10 text-center max-w-5xl px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="border border-gridlock-cyan/50 px-4 py-1 rounded-full bg-gridlock-cyan/10 text-gridlock-cyan text-xs font-mono tracking-[0.2em] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gridlock-cyan animate-pulse"></span>
                        FORENSIC AUDIT COMPLETE
                    </div>
                </motion.div>

                <h1 className="text-6xl md:text-9xl font-tech font-black text-white mb-4 tracking-tighter">
                    PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-gridlock-cyan to-blue-600 text-glow">GRIDLOCK</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-gridlock-muted font-mono max-w-2xl mx-auto mb-10"
                >
                    Uncovering <span className="text-gridlock-red font-bold">24,500 hidden crash locations</span> in NYC's official collision database.
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                    {[
                        { icon: EyeOff, label: "Invisible Crashes", value: "47.5%" },
                        { icon: FileWarning, label: "Ghost Dates", value: "3,500" },
                        { icon: Search, label: "Recovered", value: "24,500" },
                        { icon: ShieldAlert, label: "High Risk Zones", value: "Top 5" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="bg-gridlock-panel border border-gridlock-bg p-4 rounded hover:border-gridlock-cyan/30 transition-colors"
                        >
                            <item.icon className="w-6 h-6 text-gridlock-cyan mb-2" />
                            <div className="text-2xl font-tech font-bold text-white">{item.value}</div>
                            <div className="text-xs text-gridlock-muted uppercase tracking-wider">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gridlock-cyan/50 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to Decode</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gridlock-cyan/0 via-gridlock-cyan to-gridlock-cyan/0"></div>
            </motion.div>
        </section>
    );
};
