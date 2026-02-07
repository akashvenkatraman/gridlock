# Project GRIDLOCK: Forensic Data Analysis & Visualization
## Analytics Showdown 4.0 Submission - Team Data Masters

**Project GRIDLOCK** is a forensic audit and visualization platform built to uncover hidden patterns in NYC's motor vehicle collision data.

---

## 📂 Repository Contents

### **1. The Visualization (Web App)**
- **Code**: `gridlock-report/` (React + Vite + Tailwind + Framer Motion)
- **Live Tech**: Maps (Leaflet), Charts (Recharts), Scrollytelling
- **Run Locally**:
  ```bash
  cd gridlock-report
  npm install
  npm run dev
  ```

### **2. The Forensic Engine (Python)**
- **Audit Script**: `gridlock_forensic_audit.py` (Reproducible Data Cleaning)
- **Data Processor**: `web_data_processor.py` (Generates JSON for frontend)
- **Patch Script**: `patch_json_final.py` (Applies narrative consistency)
- **Output**: `Motor_Vehicle_Collisions_CLEAN.csv` (Power BI Ready)

### **3. Documentation (Artifacts)**
- **pitch**: [PitchScript.md](PitchScript.md) - The verbal presentation script.
- **architecture**: [Technical_Architecture.md](Technical_Architecture.md) - Full stack diagrams.
- **audit summary**: [GRIDLOCK_AUDIT_SUMMARY.md](GRIDLOCK_AUDIT_SUMMARY.md) - Executive findings.
- **power bi guide**: [PowerBI_Quick_Start_Guide.md](PowerBI_Quick_Start_Guide.md) - Dashboard setup.

---

## 🚀 Key Features

*   **Coordinate Recovery**: Regex pattern mining recovered 24,500 missing coordinates (98% success).
*   **Narrative Integrity**: "Before vs After" visualization of data quality.
*   **Predictive Analytics**: Forecasting severity spikes and resource optimization.

---

**Team**: Akash Venkatraman, Avvudaiyappan RM, Harish Raj S
**Date**: February 7, 2026
