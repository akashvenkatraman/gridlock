import { motion } from "framer-motion";

export const Card = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`bg-gridlock-panel/80 backdrop-blur-md border border-gridlock-cyan/20 p-6 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.05)] hover:border-gridlock-cyan/50 transition-colors ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const GlitchText = ({ text, className = "" }) => {
    return (
        <h1 className={`relative inline-block font-tech uppercase tracking-widest ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-gridlock-red opacity-70 animate-glitch translate-x-[2px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-gridlock-cyan opacity-70 animate-glitch translate-x-[-2px] animation-delay-200">
                {text}
            </span>
        </h1>
    );
};
