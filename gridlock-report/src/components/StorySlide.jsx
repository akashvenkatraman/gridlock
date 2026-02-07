import { motion } from "framer-motion";
import { Clock, Map, Car, AlertTriangle } from "lucide-react";

const icons = {
    clock: Clock,
    map: Map,
    car: Car,
    alert: AlertTriangle
};

export const StorySlide = ({ stories }) => {
    if (!stories) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gridlock-bg relative overflow-hidden">
            {/* Background Particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05),transparent)] animate-pulse-slow pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-6xl font-tech font-black text-white mb-4">
                    DATA <span className="text-gridlock-red text-glow-red">HORROR STORIES</span>
                </h2>
                <p className="text-gridlock-muted font-mono tracking-widest uppercase">
                    What was lurking inside the legacy database?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
                {stories.map((story, i) => {
                    const Icon = icons[story.icon] || AlertTriangle;
                    return (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-gridlock-panel/80 backdrop-blur border border-white/5 p-8 rounded-2xl group hover:border-gridlock-red/40 transition-all hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-gridlock-bg rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-gridlock-red/50 transition-colors shadow-lg">
                                <Icon className="w-8 h-8 text-white group-hover:text-gridlock-red transition-colors" />
                            </div>

                            <div className="text-5xl font-mono font-bold text-white mb-2 group-hover:text-gridlock-red transition-colors">
                                {story.stat}
                            </div>
                            <div className="text-xs text-gridlock-muted uppercase tracking-wider mb-6 font-bold">
                                {story.label}
                            </div>

                            <p className="text-sm text-gridlock-muted/80 font-mono leading-relaxed border-t border-white/5 pt-4">
                                {story.desc}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
