#!/usr/bin/env python3
"""
Project GRIDLOCK - Forensic Data Audit Script
Federal Transportation Safety Auditor for NHTSA
Purpose: Remediate systemic entropy in NYC Motor Vehicle Collisions dataset
"""

import pandas as pd
import numpy as np
import re
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

print("="*70)
print("PROJECT GRIDLOCK - FORENSIC DATA AUDIT")
print("Federal Transportation Safety Auditor - NHTSA")
print("="*70)

# Input/Output files
input_file = 'refined_Motor_Vehicle_Collisions_-_Crashes_20260107.csv'
output_file = 'Motor_Vehicle_Collisions_CLEAN.csv'

# Load dataset
print("\n[1/7] LOADING DATASET...")
df = pd.read_csv(input_file, low_memory=False)
print(f"Loaded {len(df):,} rows with {len(df.columns)} columns")

# PHASE 1: CORRUPTION DETECTION
print("\n[2/7] DETECTING CORRUPTION...")
print("="*70)

# Detect Ghost Rows
ghost_in_date = df['CRASH DATE'].astype(str).str.contains('2026', na=False).sum()
ghost_in_time = df['CRASH TIME'].astype(str).str.contains('2026', na=False).sum()
total_ghost = max(ghost_in_date, ghost_in_time)
print(f"Ghost rows (future dates 2026): {total_ghost:,}")

# Coordinate voids
lat_nulls = df['LATITUDE'].isna().sum()
lon_nulls = df['LONGITUDE'].isna().sum()
recoverable = df[df['LATITUDE'].isna() & df['LOCATION'].notna()]['LOCATION'].count()
print(f"Coordinate voids - LAT nulls: {lat_nulls:,}, LON nulls: {lon_nulls:,}")
print(f"Recoverable from LOCATION: {recoverable:,}")

# PHASE 2: SPATIAL RECOVERY
print("\n[3/7] SPATIAL RECOVERY (Regex extraction)...")
print("="*70)

coord_pattern = r'\(([0-9.-]+),\s*([0-9.-]+)\)'
NYC_LAT_MIN, NYC_LAT_MAX = 40.4, 41.0
NYC_LON_MIN, NYC_LON_MAX = -74.3, -73.7

recovered = 0
df['coord_recovery_flag'] = 0

print("Extracting coordinates from LOCATION column...")
for idx, row in df.iterrows():
    if idx % 10000 == 0:
        print(f"  Processing row {idx:,}...")
    
    if pd.isna(row['LATITUDE']) or pd.isna(row['LONGITUDE']):
        location_str = str(row['LOCATION'])
        match = re.search(coord_pattern, location_str)
        
        if match:
            try:
                lat = float(match.group(1))
                lon = float(match.group(2))
                
                if (NYC_LAT_MIN <= lat <= NYC_LAT_MAX and NYC_LON_MIN <= lon <= NYC_LON_MAX):
                    df.at[idx, 'LATITUDE'] = lat
                    df.at[idx, 'LONGITUDE'] = lon
                    df.at[idx, 'coord_recovery_flag'] = 1
                    recovered += 1
            except:
                pass

recovery_rate = (recovered / recoverable * 100) if recoverable > 0 else 0
print(f"Successfully recovered: {recovered:,} coordinate pairs ({recovery_rate:.1f}%)")

# PHASE 3: DATE NORMALIZATION
print("\n[4/7] DATE NORMALIZATION...")
print("="*70)

NULL_VARIANTS = ['nan', 'NA', 'Null', 'Unknown', 'NA ', 'nan ', 'Null ', 'Unknown ', 'approx 0', '']

def parse_date(date_str):
    if pd.isna(date_str) or str(date_str).strip() in NULL_VARIANTS:
        return pd.NaT
    
    date_str =  str(date_str).strip()
    
    # ISO format (YYYY-MM-DD)
    match = re.search(r'(\d{4})-(\d{2})-(\d{2})', date_str)
    if match:
        try:
            return pd.to_datetime(f"{match.group(1)}-{match.group(2)}-{match.group(3)}")
        except:
            pass
    
    # US format (MM/DD/YYYY)
    match = re.search(r'(\d{2})/(\d{2})/(\d{4})', date_str)
    if match:
        try:
            return pd.to_datetime(f"{match.group(3)}-{match.group(1)}-{match.group(2)}")
        except:
            pass
    
    return pd.NaT

print("Standardizing CRASH DATE to ISO 8601...")
df['CRASH DATE'] = df['CRASH DATE'].apply(parse_date)

print("Cleaning CRASH TIME...")
def clean_time(time_str):
    if pd.isna(time_str) or str(time_str).strip() in NULL_VARIANTS:
        return pd.NaT
    
    time_str = str(time_str).strip()
    time_match = re.search(r'(\d{1,2}):(\d{2})', time_str)
    if time_match:
        return f"{time_match.group(1).zfill(2)}:{time_match.group(2)}:00"
    
    return pd.NaT

df['CRASH TIME'] = df['CRASH TIME'].apply(clean_time)
print("Date normalization complete")

# PHASE 4: VEHICLE TYPE NORMALIZATION
print("\n[5/7] VEHICLE TYPE NORMALIZATION...")
print("="*70)

vehicle_mapping = {
    'sedan': 'Sedan',
    'pk': 'Sedan',
    '4 dr sedan': 'Sedan',
    'station wagon/sport utility vehicle': 'SUV',
    'suv': 'SUV',
    'utility': 'SUV',
    'bike': 'Bicycle',
    'e-bike': 'E-Bicycle',
    'e-scooter': 'E-Scooter',
    'motorscooter': 'Motorscooter',
    'moped': 'Moped',
    'pick-up truck': 'Pickup Truck',
    'pickup': 'Pickup Truck',
    'box truck': 'Box Truck',
    'dump': 'Dump Truck',
    'tow truck / wrecker': 'Tow Truck',
    'tanker': 'Tanker',
    'tractor truck diesel': 'Tractor Truck',
    'bus': 'Bus',
    'taxi': 'Taxi',
    'ambulance': 'Ambulance',
    'garbage or refuse': 'Refuse Truck',
    'motorcycle': 'Motorcycle',
    'van': 'Van',
    'convertible': 'Convertible',
    'unknown': 'Unknown',
}

original_types = df['VEHICLE TYPE CODE 1'].nunique()
df['VEHICLE TYPE CODE 1'] = df['VEHICLE TYPE CODE 1'].astype(str).str.lower().str.strip()
df['VEHICLE TYPE CODE 1'] = df['VEHICLE TYPE CODE 1'].replace(vehicle_mapping)
df['VEHICLE TYPE CODE 1'] = df['VEHICLE TYPE CODE 1'].str.title()
new_types = df['VEHICLE TYPE CODE 1'].nunique()

print(f"Vehicle types: {original_types} -> {new_types} (reduced by {original_types - new_types})")

# PHASE 5: FEATURE ENGINEERING
print("\n[6/7] FEATURE ENGINEERING...")
print("="*70)

def safe_numeric(series):
    series = series.replace(NULL_VARIANTS, np.nan)
    return pd.to_numeric(series, errors='coerce').fillna(0)

# Severity Score
killed = safe_numeric(df['NUMBER OF PERSONS KILLED'])
injured = safe_numeric(df['NUMBER OF PERSONS INJURED'])
df['SEVERITY_SCORE'] = (killed * 5) + (injured * 1)
print(f"Severity Score - Avg: {df['SEVERITY_SCORE'].mean():.2f}, Max: {df['SEVERITY_SCORE'].max():.0f}")

# Vulnerability Flag
ped_injured = safe_numeric(df['NUMBER OF PEDESTRIANS INJURED'])
ped_killed = safe_numeric(df['NUMBER OF PEDESTRIANS KILLED'])
cyc_injured = safe_numeric(df['NUMBER OF CYCLIST INJURED'])
cyc_killed = safe_numeric(df['NUMBER OF CYCLIST KILLED'])

df['VULNERABILITY_FLAG'] = (
    (ped_injured > 0) | (ped_killed > 0) | 
    (cyc_injured > 0) | (cyc_killed > 0)
).astype(int)

vulnerable_count = df['VULNERABILITY_FLAG'].sum()
print(f"Vulnerable road users involved: {vulnerable_count:,} crashes ({vulnerable_count/len(df)*100:.1f}%)")

# Data Integrity Score
critical_fields = ['CRASH DATE', 'CRASH TIME', 'LATITUDE', 'LONGITUDE', 'BOROUGH']

def calc_integrity(row):
    valid_count = 0
    for field in critical_fields:
        if field in row.index:
            val = str(row[field])
            if pd.notna(row[field]) and val not in NULL_VARIANTS and val != 'nan':
                valid_count += 1
    return valid_count / len(critical_fields)

df['DATA_INTEGRITY_SCORE'] = df.apply(calc_integrity, axis=1)
avg_integrity = df['DATA_INTEGRITY_SCORE'].mean()
print(f"Average row integrity: {avg_integrity*100:.1f}%")

# Data Quality Flags
def flag_issues(row):
    flags = []
    if '2026' in str(row.get('CRASH DATE', '')) or '2026' in str(row.get('CRASH TIME', '')):
        flags.append('FUTURE_DATE')
    if pd.isna(row['LATITUDE']) or pd.isna(row['LONGITUDE']):
        flags.append('NULL_COORDS')
    if str(row.get('BOROUGH', '')).strip() in NULL_VARIANTS:
        flags.append('NULL_BOROUGH')
    return '|'.join(flags) if flags else 'CLEAN'

df['DATA_QUALITY_FLAGS'] = df.apply(flag_issues, axis=1)

# GLOBAL INTEGRITY
total_rows = len(df)
clean_rows = total_rows - total_ghost
global_integrity = (clean_rows / total_rows) * 100

print("\n" + "="*70)
print("CITY DATA INTEGRITY ASSESSMENT")
print("="*70)
print(f"Global Integrity Score: {global_integrity:.2f}%")
print(f"Total records: {total_rows:,}")
print(f"Ghost rows: {total_ghost:,}")
print(f"Average row integrity: {avg_integrity*100:.1f}%")

# EXPORT
print("\n[7/7] EXPORTING CLEANED DATASET...")
print("="*70)

df.to_csv(output_file, index=False, encoding='utf-8')
print(f"Cleaned dataset exported to: {output_file}")
print(f"Total rows: {len(df):,}, Total columns: {len(df.columns)}")

print("\n" + "="*70)
print("FORENSIC AUDIT COMPLETE")
print("="*70)
print("\nGenerated files:")
print(f"1. {output_file} - Clean dataset for Power BI")
print("\nNext steps:")
print("1. Import cleaned CSV into Power BI")
print("2. Review audit statistics above")
print("3. Analyze high-risk intersections with SEVERITY_SCORE")
