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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
        </section>
    );
};
