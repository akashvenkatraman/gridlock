#!/usr/bin/env python3
"""
Advanced Data Sanitization Script
Project GRIDLOCK - Phase 2 Cleaning
Purpose: Standardize nulls, sanitize numeric columns, normalize categories
"""

import pandas as pd
import numpy as np
import re

print("="*70)
print("ADVANCED DATA SANITIZATION - PHASE 2")
print("="*70)

# Load the dataset
input_file = 'Motor_Vehicle_Collisions_POWERBI_READY.csv'
print(f"\nLoading: {input_file}")
df = pd.read_csv(input_file, low_memory=False)

print(f"Initial shape: {df.shape}")
print(f"Initial rows: {len(df):,}")

# ========================================================================
# STEP 1: STANDARDIZE NULLS (Case-Insensitive)
# ========================================================================
print("\n[STEP 1] Standardizing null representations...")

null_variants = ['Null', 'Unknown', 'nan', 'nan ', 'unspecified', 'Unknown', 
                 'Null', 'NULL', 'UNKNOWN', 'NaN', 'N/A', 'n/a', '']

# Replace null variants with actual NaN
for col in df.columns:
    # Create case-insensitive replacement
    df[col] = df[col].replace({val: np.nan for val in null_variants})
    
    # Also handle as strings (case-insensitive)
    if df[col].dtype == 'object':
        mask = df[col].astype(str).str.strip().str.lower().isin(
            [v.lower() for v in null_variants]
        )
        df.loc[mask, col] = np.nan

null_count_after = df.isna().sum().sum()
print(f"   Total nulls after standardization: {null_count_after:,}")

# ========================================================================
# STEP 2: SANITIZE NUMERIC COLUMNS
# ========================================================================
print("\n[STEP 2] Sanitizing numeric columns...")

def sanitize_numeric(series, dtype='float'):
    """Clean numeric column: remove commas, ?, 'approx', strip whitespace"""
    
    # Convert to string first
    cleaned = series.astype(str)
    
    # Remove unwanted characters and substrings
    cleaned = cleaned.str.replace(',', '', regex=False)  # Remove commas
    cleaned = cleaned.str.replace('?', '', regex=False)  # Remove question marks
    cleaned = cleaned.str.replace('approx.', '', regex=False)  # Remove 'approx.'
    cleaned = cleaned.str.replace('approx', '', regex=False)  # Remove 'approx'
    cleaned = cleaned.str.strip()  # Strip whitespace
    
    # Replace empty strings with NaN
    cleaned = cleaned.replace('', np.nan)
    cleaned = cleaned.replace('nan', np.nan)
    cleaned = cleaned.replace('NaN', np.nan)
    cleaned = cleaned.replace('None', np.nan)
    
    # Convert to numeric (use standard types, not nullable)
    cleaned = pd.to_numeric(cleaned, errors='coerce')
    
    # Then cast to int if needed (this will convert to float if NaN present)
    if dtype == 'int':
        # Fill NaN with 0 for integer columns, then convert
        cleaned = cleaned.fillna(0).astype(int)
    
    return cleaned

# Apply to specific columns
numeric_columns = {
    'NUMBER OF PERSONS INJURED': 'int',
    'NUMBER OF PERSONS KILLED': 'int',
    'NUMBER OF PEDESTRIANS INJURED': 'int',
    'NUMBER OF PEDESTRIANS KILLED': 'int',
    'NUMBER OF CYCLIST INJURED': 'int',
    'NUMBER OF CYCLIST KILLED': 'int',
    'NUMBER OF MOTORIST INJURED': 'int',
    'NUMBER OF MOTORIST KILLED': 'int',
    'LATITUDE': 'float',
    'LONGITUDE': 'float',
    'COLLISION_ID': 'int',
    'SEVERITY_SCORE': 'float',
    'DATA_INTEGRITY_SCORE': 'float',
    'VULNERABILITY_FLAG': 'int',
    'coord_recovery_flag': 'int',
}

for col, dtype in numeric_columns.items():
    if col in df.columns:
        original_nulls = df[col].isna().sum()
        df[col] = sanitize_numeric(df[col], dtype)
        new_nulls = df[col].isna().sum()
        if new_nulls > original_nulls:
            print(f"   {col}: {original_nulls} -> {new_nulls} nulls (sanitized)")
        else:
            print(f"   {col}: Sanitized ({new_nulls:,} nulls)")

# ========================================================================
# STEP 3: CATEGORICAL NORMALIZATION
# ========================================================================
print("\n[STEP 3] Normalizing categorical columns...")

# BOROUGH: Strip whitespace + UPPERCASE
if 'BOROUGH' in df.columns:
    original_unique = df['BOROUGH'].nunique()
    df['BOROUGH'] = df['BOROUGH'].astype(str).str.strip().str.upper()
    df['BOROUGH'] = df['BOROUGH'].replace('NAN', np.nan)
    new_unique = df['BOROUGH'].nunique()
    print(f"   BOROUGH: {original_unique} -> {new_unique} unique values (normalized to UPPERCASE)")

# ZIP CODE: Ensure clean integers
if 'ZIP CODE' in df.columns:
    df['ZIP CODE'] = sanitize_numeric(df['ZIP CODE'], 'int')
    print(f"   ZIP CODE: Sanitized (numeric)")

# VEHICLE TYPE CODES: Title Case (already clean, but ensure consistency)
vehicle_cols = [c for c in df.columns if 'VEHICLE TYPE CODE' in c]
for col in vehicle_cols:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip().str.title()
        df[col] = df[col].replace('Nan', np.nan)

print(f"   {len(vehicle_cols)} vehicle type columns normalized to Title Case")

# ========================================================================
# STEP 4: TEMPORAL STANDARDIZATION
# ========================================================================
print("\n[STEP 4] Standardizing temporal columns...")

# CRASH DATE: Ensure YYYY-MM-DD format
if 'CRASH DATE' in df.columns:
    try:
        df['CRASH DATE'] = pd.to_datetime(df['CRASH DATE'], errors='coerce')
        df['CRASH DATE'] = df['CRASH DATE'].dt.strftime('%Y-%m-%d')
        print(f"   CRASH DATE: Standardized to YYYY-MM-DD")
    except Exception as e:
        print(f"   CRASH DATE: Error - {e}")

# CRASH TIME: Ensure HH:MM:SS format
if 'CRASH TIME' in df.columns:
    try:
        # Handle missing/malformed times
        df['CRASH TIME'] = df['CRASH TIME'].astype(str).str.strip()
        
        # Replace malformed entries with NaN
        df.loc[df['CRASH TIME'].isin(['', 'nan', 'NaN', 'None']), 'CRASH TIME'] = np.nan
        
        # Attempt to parse times
        # If already HH:MM:SS, keep; if HH:MM, append :00
        def standardize_time(t):
            if pd.isna(t):
                return np.nan
            t = str(t).strip()
            if len(t.split(':')) == 2:  # HH:MM
                return f"{t}:00"
            elif len(t.split(':')) == 3:  # HH:MM:SS
                return t
            else:
                return np.nan
        
        df['CRASH TIME'] = df['CRASH TIME'].apply(standardize_time)
        print(f"   CRASH TIME: Standardized to HH:MM:SS")
    except Exception as e:
        print(f"   CRASH TIME: Error - {e}")

# ========================================================================
# STEP 5: DATA INTEGRITY
# ========================================================================
print("\n[STEP 5] Data integrity checks...")

# Drop 100% duplicate rows
initial_rows = len(df)
df = df.drop_duplicates()
duplicates_removed = initial_rows - len(df)
print(f"   Duplicate rows removed: {duplicates_removed}")

# Check COLLISION_ID uniqueness
if 'COLLISION_ID' in df.columns:
    collision_id_nulls = df['COLLISION_ID'].isna().sum()
    collision_id_dupes = df['COLLISION_ID'].duplicated().sum()
    
    print(f"   COLLISION_ID nulls: {collision_id_nulls}")
    print(f"   COLLISION_ID duplicates: {collision_id_dupes}")
    
    if collision_id_dupes > 0:
        print(f"   WARNING: {collision_id_dupes} duplicate COLLISION_IDs found!")
        print(f"   Keeping first occurrence, dropping duplicates...")
        df = df.drop_duplicates(subset=['COLLISION_ID'], keep='first')
        print(f"   Rows after deduplication: {len(df):,}")

# ========================================================================
# STEP 6: FINAL VALIDATION
# ========================================================================
print("\n[STEP 6] Final validation...")

# Check coordinate validity (NYC boundaries)
if 'LATITUDE' in df.columns and 'LONGITUDE' in df.columns:
    valid_coords = (
        (df['LATITUDE'] >= 40.4) & (df['LATITUDE'] <= 41.0) &
        (df['LONGITUDE'] >= -74.3) & (df['LONGITUDE'] <= -73.7)
    )
    invalid_coords = (~valid_coords) & df['LATITUDE'].notna() & df['LONGITUDE'].notna()
    
    print(f"   Valid NYC coordinates: {valid_coords.sum():,}")
    print(f"   Invalid/out-of-bounds coordinates: {invalid_coords.sum():,}")
    
    # Optionally null out invalid coordinates
    if invalid_coords.sum() > 0:
        print(f"   Setting invalid coordinates to NaN...")
        df.loc[invalid_coords, ['LATITUDE', 'LONGITUDE']] = np.nan

# ========================================================================
# STEP 7: EXPORT CLEANED DATASET
# ========================================================================
output_file = 'Motor_Vehicle_Collisions_FINAL_CLEAN.csv'
df.to_csv(output_file, index=False, encoding='utf-8')

print("\n" + "="*70)
print("SANITIZATION COMPLETE")
print("="*70)
print(f"\nFinal shape: {df.shape}")
print(f"Final rows: {len(df):,}")
print(f"Total columns: {len(df.columns)}")
print(f"\nOutput file: {output_file}")

# ========================================================================
# SUMMARY STATISTICS
# ========================================================================
print("\n" + "="*70)
print("SUMMARY STATISTICS")
print("="*70)

print("\n1. NULL COUNTS BY COLUMN (Top 10):")
null_counts = df.isna().sum().sort_values(ascending=False).head(10)
for col, count in null_counts.items():
    pct = (count / len(df)) * 100
    print(f"   {col}: {count:,} ({pct:.1f}%)")

print("\n2. BOROUGH DISTRIBUTION:")
if 'BOROUGH' in df.columns:
    for borough, count in df['BOROUGH'].value_counts().items():
        print(f"   {borough}: {count:,}")

print("\n3. DATA QUALITY:")
print(f"   Rows with complete coordinates: {(df['LATITUDE'].notna() & df['LONGITUDE'].notna()).sum():,}")
print(f"   Rows with SEVERITY_SCORE > 0: {(df['SEVERITY_SCORE'] > 0).sum():,}")
print(f"   Vulnerable user crashes: {(df['VULNERABILITY_FLAG'] == 1).sum():,}")

print("\n4. TEMPORAL COVERAGE:")
if 'CRASH DATE' in df.columns:
    date_col = pd.to_datetime(df['CRASH DATE'], errors='coerce')
    print(f"   Earliest crash: {date_col.min()}")
    print(f"   Latest crash: {date_col.max()}")

print("\n✓ Dataset ready for Power BI import!")
print("="*70)
