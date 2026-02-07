import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const StatsCounter = ({ value, label, suffix = "", duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(String(value).replace(/,/g, ""));
            if (start === end) return;

            let totalMilSec = duration * 1000;
            let incrementTime = (totalMilSec / end) * 10;

            // Optimization for large numbers
            let step = 1;
            if (end > 1000) step = Math.floor(end / 100);

            let timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setCount(start);
            }, 16); // ~60fps

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-6xl font-tech font-bold text-gridlock-cyan text-glow tabular-nums">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gridlock-muted text-sm md:text-base font-mono mt-2 tracking-widest uppercase">
                {label}
            </div>
        </div>
    );
};
