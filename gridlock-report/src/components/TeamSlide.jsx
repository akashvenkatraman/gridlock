import { motion } from "framer-motion";
import { GlitchText } from "./ui/Card";

export const TeamSlide = ({ meta }) => {
    if (!meta) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gridlock-cyan/10 via-black to-black -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12 relative"
            >
                <div className="text-gridlock-cyan font-mono tracking-[0.3em] text-sm mb-4 uppercase animate-pulse">
                    {meta.event_name}
                </div>
                <GlitchText text={meta.team_name} className="text-6xl md:text-9xl font-black mb-6 text-white" />
                <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gridlock-red to-transparent mx-auto mb-8"></div>
                <p className="text-xl text-gridlock-muted font-mono">{meta.pitch_title}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
                {meta.members.map((member, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.2) }}
                        className="bg-gridlock-panel/50 backdrop-blur border border-white/5 p-8 rounded-xl hover:border-gridlock-cyan/50 transition-all group hover:-translate-y-2"
                    >
                        <div className="w-16 h-16 bg-gridlock-bg rounded-full mx-auto mb-6 border border-gridlock-cyan flex items-center justify-center font-bold text-2xl text-gridlock-cyan font-mono group-hover:bg-gridlock-cyan group-hover:text-black transition-colors shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                            {member.charAt(0)}
                        </div>
                        <h3 className="font-tech text-2xl font-bold text-white mb-2">{member}</h3>
                        <p className="text-xs text-gridlock-cyan font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100">Data Scientist</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
