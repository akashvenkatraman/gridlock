import { motion } from "framer-motion";

export const Timeline = ({ data }) => {
    if (!data || data.length === 0) return null;

    const maxVal = Math.max(...data.map(d => d.severity));

    return (
        <div className="w-full max-w-6xl mx-auto px-4 mt-8">
            <div className="h-64 flex items-end justify-between gap-[2px] w-full">
                {data.map((item, i) => {
                    const height = (item.severity / maxVal) * 100;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gridlock-panel text-xs p-2 rounded border border-gridlock-cyan/20 whitespace-nowrap z-10 pointer-events-none shadow-xl">
                                <div className="font-bold text-white mb-1">{item.month_year}</div>
                                <div className="text-gridlock-cyan font-mono">Score: {item.severity.toFixed(1)}</div>
                                <div className="text-gridlock-muted text-[10px]">{item.count} crashes</div>
                            </div>

                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.01, ease: "easeOut" }}
                                className="w-full bg-gridlock-cyan/20 hover:bg-gridlock-cyan transition-colors rounded-t-[1px]"
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between text-xs text-gridlock-muted font-mono mt-2 border-t border-white/10 pt-2 uppercase tracking-widest">
                <span>{data[0]?.month_year}</span>
                <span>TIMELINE ANALYSIS</span>
                <span>{data[data.length - 1]?.month_year}</span>
            </div>
        </div>
    );
};
