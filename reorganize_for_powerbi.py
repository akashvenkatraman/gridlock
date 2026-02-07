import pandas as pd
import numpy as np

print("="*70)
print("REORGANIZING DATASET FOR POWER BI OPTIMIZATION")
print("="*70)

# Load the cleaned dataset
df = pd.read_csv('Motor_Vehicle_Collisions_CLEAN.csv')

print(f"\nOriginal column count: {len(df.columns)}")
print(f"Original row count: {len(df):,}")

# Define optimal column order for Power BI
# Priority: Key Fields → Location → Impact Metrics → Details → Flags

optimal_column_order = [
    # === SECTION 1: KEY IDENTIFIERS ===
    'COLLISION_ID',
    'CRASH DATE',
    'CRASH TIME',
    
    # === SECTION 2: GEOGRAPHIC LOCATION (Critical for mapping) ===
    'LATITUDE',
    'LONGITUDE',
    'BOROUGH',
    'ZIP CODE',
    'ON STREET NAME',
    'CROSS STREET NAME',
    'OFF STREET NAME',
    'LOCATION',
    
    # === SECTION 3: SEVERITY & IMPACT (Engineered + Original) ===
    'SEVERITY_SCORE',              # NEW: Our engineered metric
    'VULNERABILITY_FLAG',          # NEW: Our engineered metric
    'NUMBER OF PERSONS KILLED',
    'NUMBER OF PERSONS INJURED',
    'NUMBER OF PEDESTRIANS KILLED',
    'NUMBER OF PEDESTRIANS INJURED',
    'NUMBER OF CYCLIST KILLED',
    'NUMBER OF CYCLIST INJURED',
    'NUMBER OF MOTORIST KILLED',
    'NUMBER OF MOTORIST INJURED',
    
    # === SECTION 4: VEHICLE INFORMATION ===
    'VEHICLE TYPE CODE 1',
    'VEHICLE TYPE CODE 2',
    'VEHICLE TYPE CODE 3',
    'VEHICLE TYPE CODE 4',
    'VEHICLE TYPE CODE 5',
    
    # === SECTION 5: CONTRIBUTING FACTORS ===
    'CONTRIBUTING FACTOR VEHICLE 1',
    'CONTRIBUTING FACTOR VEHICLE 2',
    'CONTRIBUTING FACTOR VEHICLE 3',
    'CONTRIBUTING FACTOR VEHICLE 4',
    'CONTRIBUTING FACTOR VEHICLE 5',
    
    # === SECTION 6: DATA QUALITY METRICS (For filtering/validation) ===
    'DATA_INTEGRITY_SCORE',        # NEW: Our engineered metric
    'DATA_QUALITY_FLAGS',          # NEW: Our engineered metric
    'coord_recovery_flag',         # NEW: Metadata flag
]

# Verify all columns exist
missing_cols = [col for col in optimal_column_order if col not in df.columns]
if missing_cols:
    print(f"\nWarning: Missing columns: {missing_cols}")
    optimal_column_order = [col for col in optimal_column_order if col in df.columns]

# Reorder the dataframe
df_optimized = df[optimal_column_order]

# Save the reorganized dataset
output_file = 'Motor_Vehicle_Collisions_POWERBI_READY.csv'
df_optimized.to_csv(output_file, index=False, encoding='utf-8')

print(f"\n✓ Dataset reorganized successfully!")
print(f"\nNew column order (Power BI optimized):")
print("\n--- SECTION 1: KEY IDENTIFIERS ---")
print("1. COLLISION_ID")
print("2. CRASH DATE")
print("3. CRASH TIME")

print("\n--- SECTION 2: GEOGRAPHIC LOCATION ---")
print("4-11. LATITUDE, LONGITUDE, BOROUGH, ZIP CODE, Street Names, LOCATION")

print("\n--- SECTION 3: SEVERITY & IMPACT ---")
print("12. SEVERITY_SCORE (NEW - Sort/Filter by this!)")
print("13. VULNERABILITY_FLAG (NEW - Filter pedestrian/cyclist crashes)")
print("14-21. Killed/Injured breakdowns (Persons, Pedestrians, Cyclists, Motorists)")

print("\n--- SECTION 4: VEHICLE INFORMATION ---")
print("22-26. VEHICLE TYPE CODE 1-5 (Now standardized!)")

print("\n--- SECTION 5: CONTRIBUTING FACTORS ---")
print("27-31. CONTRIBUTING FACTOR VEHICLE 1-5")

print("\n--- SECTION 6: DATA QUALITY METRICS ---")
print("32. DATA_INTEGRITY_SCORE (Filter by quality)")
print("33. DATA_QUALITY_FLAGS (Identify clean vs problematic rows)")
print("34. coord_recovery_flag (Track recovered coordinates)")

print(f"\n{'='*70}")
print(f"OUTPUT: {output_file}")
print(f"Rows: {len(df_optimized):,}")
print(f"Columns: {len(df_optimized.columns)}")
print(f"{'='*70}")

print("\n🎯 POWER BI QUICK START GUIDE:")
print("\n1. IMPORT THIS FILE into Power BI Desktop")
print("2. KEY VISUALIZATIONS TO CREATE:")
print("   • Map: Plot LATITUDE/LONGITUDE with SEVERITY_SCORE as bubble size")
print("   • Bar Chart: Top 10 intersections by SEVERITY_SCORE")
print("   • Pie Chart: VULNERABILITY_FLAG distribution")
print("   • Time Series: Crashes by CRASH DATE")
print("   • Table: Filter by DATA_QUALITY_FLAGS = 'CLEAN' for verified data")

print("\n3. RECOMMENDED FILTERS:")
print("   • DATA_QUALITY_FLAGS ≠ 'FUTURE_DATE' (exclude ghost rows)")
print("   • DATA_INTEGRITY_SCORE > 0.6 (high-quality data only)")
print("   • SEVERITY_SCORE > 0 (exclude no-casualty crashes)")

print("\n4. CALCULATED COLUMNS TO ADD IN POWER BI:")
print("   • Crash Hour = HOUR(CRASH TIME)")
print("   • Crash Month = MONTH(CRASH DATE)")
print("   • High Severity = IF(SEVERITY_SCORE > 10, 'High', 'Low')")

print("\n✅ Dataset ready for datathon presentation!")
