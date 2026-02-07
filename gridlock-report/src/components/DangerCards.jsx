import { Card } from "./ui/Card";
import { AlertTriangle, User, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const DangerCards = ({ zones }) => {
    return (
        <div className="w-full overflow-x-auto pb-8 scrollbar-hide py-4">
            <div className="flex gap-6 px-4 md:px-0 w-max mx-auto">
                {zones.map((zone, i) => (
                    <Card
                        key={i}
                        delay={i * 0.1}
                        className="w-[300px] md:w-[350px] shrink-0 bg-gridlock-panel border border-gridlock-red/20 hover:border-gridlock-cyan/50 transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gridlock-red/10 text-gridlock-red px-2 py-1 rounded text-xs font-bold font-mono animate-pulse">
                                ZONE #{i + 1}
                            </div>
                            <AlertTriangle className="text-gridlock-red w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>

                        <h3 className="text-xl font-tech font-bold text-white mb-1 truncate" title={zone.name}>
                            {zone.name}
                        </h3>
                        <p className="text-sm text-gridlock-muted font-mono mb-4">{zone.borough}</p>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-xs text-gridlock-muted flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-gridlock-cyan" /> SEVERITY
                                </span>
                                <span className="text-gridlock-cyan font-bold font-mono">{(zone.severity_total || 0).toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-xs text-gridlock-muted flex items-center gap-2">
                                    <User className="w-3 h-3 text-white" /> CASUALTIES
                                </span>
                                <span className="text-white font-bold font-mono">{zone.casualties}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gridlock-muted">REASON HIDDEN</span>
                                <span className="text-xs text-gridlock-red font-bold uppercase tracking-wider">Null Coords</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
