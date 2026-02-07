import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertCircle, Clock, MapPin } from "lucide-react";

export const DashboardSlide = ({ charts }) => {
    if (!charts) return (
        <div className="text-center p-10 border border-gridlock-red/30 rounded-xl bg-gridlock-panel/50">
            <h3 className="text-gridlock-red font-mono">ANALYTICS DATA UNAVAILABLE</h3>
            <p className="text-xs text-gridlock-muted">Please run python data processor.</p>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gridlock-panel border border-gridlock-cyan/30 p-2 text-xs font-mono rounded shadow-xl">
                    <p className="text-white font-bold">{label}</p>
                    <p className="text-gridlock-cyan">Score: {Number(payload[0].value).toFixed(0)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full">

                {/* LEFT COLUMN: CHARTS (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* CHART 1: BOROUGH SEVERITY */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-gridlock-panel/50 border border-white/10 p-6 rounded-xl h-[300px] flex flex-col"
                    >
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gridlock-cyan"></span>
                            SEVERITY BY BOROUGH
                        </h3>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={charts.borough} layout="vertical" margin={{ left: 40, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="BOROUGH" type="category" width={100} tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="SEVERITY_SCORE" radius={[0, 4, 4, 0]}>
                                        {charts.borough.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00f3ff' : '#00a8b3'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* CHART 2: HOURLY HEATMAP */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gridlock-panel/50 border border-white/10 p-6 rounded-xl h-[300px] flex flex-col"
                    >
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gridlock-red"></span>
                            HOURLY RISK PROFILE
                        </h3>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={charts.hourly}>
                                    <XAxis dataKey="hour" tick={{ fill: '#888', fontSize: 10 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                                    <Bar dataKey="SEVERITY_SCORE" fill="#ff003c" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: INSIGHTS & FACTORS */}
                <div className="space-y-6">
                    {/* KEY INSIGHTS PANEL */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-gridlock-panel border border-gridlock-cyan/30 p-6 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.05)]"
                    >
                        <h3 className="text-xl font-tech font-bold text-white mb-6 border-b border-white/10 pb-2">
                            KEY <span className="text-gridlock-cyan">FINDINGS</span>
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gridlock-red/10 rounded-lg">
                                    <MapPin className="text-gridlock-red w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-gridlock-muted uppercase tracking-wider">Most Dangerous</div>
                                    <div className="text-2xl font-bold text-white">BROOKLYN</div>
                                    <div className="text-xs text-gridlock-red font-mono mt-1">34% of Total Severity</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gridlock-cyan/10 rounded-lg">
                                    <Clock className="text-gridlock-cyan w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-gridlock-muted uppercase tracking-wider">Peak Risk Hour</div>
                                    <div className="text-2xl font-bold text-white">5:00 PM</div>
                                    <div className="text-xs text-gridlock-cyan font-mono mt-1">Evening Commute Spike</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <AlertCircle className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-gridlock-muted uppercase tracking-wider">Top Cause</div>
                                    <div className="text-xl font-bold text-white">Driver Inattention</div>
                                    <div className="text-xs text-gridlock-muted font-mono mt-1">28% of All Crashes</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CHART 3: FACTORS LIST */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gridlock-panel/50 border border-white/10 p-6 rounded-xl flex flex-col h-[280px]"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-white"></span>
                            CONTRIBUTING FACTORS
                        </h3>
                        <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            {charts.factors?.map((factor, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <div className="text-sm text-gridlock-muted truncate max-w-[150px]" title={factor.factor}>
                                        {i + 1}. {factor.factor}
                                    </div>
                                    <div className="text-white font-mono font-bold">{factor.count.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};
