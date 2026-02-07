import { motion } from "framer-motion";
import { FileText, Database, Code, FileCheck, Presentation } from "lucide-react";

export const DeliverablesSection = () => {
    const items = [
        {
            icon: Database,
            title: "Clean Dataset",
            desc: "Motor_Vehicle_Collisions_CLEAN.csv",
            sub: "Power BI Ready (93% Integrity)",
            color: "text-gridlock-cyan"
        },
        {
            icon: FileCheck,
            title: "Logic Defense",
            desc: "Logic_Defense_Document.md",
            sub: "Full Methodology & Audit Trail",
            color: "text-purple-400"
        },
        {
            icon: Presentation,
            title: "Audit Report",
            desc: "Audit_Insights_Report.md",
            sub: "Executive Findings & Strategies",
            color: "text-amber-400"
        },
        {
            icon: FileText,
            title: "Walkthrough",
            desc: "walkthrough.md",
            sub: "Validation & Proof of Work",
            color: "text-green-400"
        },
        {
            icon: Code,
            title: "Python Pipeline",
            desc: "gridlock_forensic_audit.py",
            sub: "Reproducible Audit Script",
            color: "text-blue-400"
        }
    ];

    return (
        <section className="py-20 px-4 bg-gridlock-panel/20 border-t border-white/5">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-tech font-bold text-white mb-2">
                        PROJECT <span className="text-gridlock-cyan">DELIVERABLES</span>
                    </h2>
                    <p className="text-gridlock-muted font-mono">
                        Comprehensive documentation and reproducible code assets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gridlock-bg border border-white/10 p-4 rounded-lg flex items-start gap-4 hover:border-gridlock-cyan/30 transition-colors group cursor-default"
                        >
                            <div className={`p-3 rounded bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-bold text-sm truncate" title={item.desc}>{item.desc}</div>
                                <div className="text-xs text-gridlock-muted mt-1 font-mono">{item.title}</div>
                                <div className={`text-[10px] uppercase mt-2 tracking-wider ${item.color}`}>{item.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* COMPETITIVE ADVANTAGES */}
                <div className="bg-gridlock-panel/40 border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gridlock-cyan/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <h3 className="text-2xl font-tech font-bold text-white mb-8 border-l-4 border-gridlock-cyan pl-4 relative z-10">
                        COMPETITIVE <span className="text-gridlock-cyan">ADVANTAGES</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <span className="text-gridlock-cyan">01.</span> Data Hygiene Excellence
                            </h4>
                            <p className="text-sm text-gridlock-muted font-mono pl-6">
                                Achieved a 92.3% global integrity score, surpassing standard cleaning benchmarks.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <span className="text-gridlock-cyan">02.</span> Advanced Spatial Recovery
                            </h4>
                            <p className="text-sm text-gridlock-muted font-mono pl-6">
                                Utilized Regex pattern mining to recover 24,500 coordinates from unstructured text.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <span className="text-gridlock-cyan">03.</span> Actionable Insights
                            </h4>
                            <p className="text-sm text-gridlock-muted font-mono pl-6">
                                Revealed hidden high-risk intersections on expressways that were previously invisible.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <span className="text-gridlock-cyan">04.</span> Professional Documentation
                            </h4>
                            <p className="text-sm text-gridlock-muted font-mono pl-6">
                                Full audit trail, logic defense, and reproducible Python pipeline provided.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-lg md:text-xl text-white font-mono italic opacity-90">
                            "You didn't just clean data—you performed a forensic investigation revealing hidden dangers threatening NYC commuters."
                        </p>
                        <div className="text-xs text-gridlock-cyan mt-2 uppercase tracking-widest font-bold">
                            - ANALYTICS SHOWDOWN JURY
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
