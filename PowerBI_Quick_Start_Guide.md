# Power BI Quick Start Guide
## Project GRIDLOCK - Visualization Playbook

---

## 📂 STEP 1: Import the Data

**File to Import**: `Motor_Vehicle_Collisions_POWERBI_READY.csv`

**Power BI Steps**:
1. Open Power BI Desktop
2. Home → Get Data → Text/CSV
3. Select `Motor_Vehicle_Collisions_POWERBI_READY.csv`
4. Click "Load" (not Transform - data is pre-cleaned!)

**Verify Import**:
- Check that CRASH DATE is recognized as Date type
- Check that LATITUDE/LONGITUDE are Decimal Number type
- Total rows should be 60,000

---

## 🗺️ KEY VISUALIZATION 1: NYC Crash Heatmap

**Purpose**: Show the 24,500 recovered crash locations

**Steps**:
1. **Visualization Type**: Map (filled map or bubble map)
2. **Location**: Drag `LATITUDE` to Latitude, `LONGITUDE` to Longitude
3. **Size/Intensity**: Drag `SEVERITY_SCORE` to Size
4. **Color**: Drag `VULNERABILITY_FLAG` to Legend
   - 0 = Gray (motor-only)
   - 1 = Red (pedestrian/cyclist involved)
5. **Filter**: `DATA_QUALITY_FLAGS` ≠ "FUTURE_DATE" (exclude ghost rows)

**Expected Result**: High-density clusters on Belt Parkway, FDR Drive, Grand Concourse

---

## 📊 KEY VISUALIZATION 2: Top 10 Dangerous Intersections

**Purpose**: Identify high-risk locations for Vision Zero targeting

**Steps**:
1. **Visualization Type**: Horizontal Bar Chart
2. **Axis**: Create calculated field:
   ```DAX
   Intersection = 
   IF(ISBLANK([ON STREET NAME]), "Unknown", [ON STREET NAME]) 
   & " × " & 
   IF(ISBLANK([CROSS STREET NAME]), "", [CROSS STREET NAME])
   ```
3. **Values**: `SUM(SEVERITY_SCORE)`
4. **Sort**: Descending by Severity Score
5. **Top N Filter**: Show top 10 only
6. **Color**: Conditional formatting (Red = highest severity)

**Expected Result**: Belt Parkway, Grand Concourse, Queens Blvd in top 5

---

## 🥧 KEY VISUALIZATION 3: Vulnerable Road Users

**Purpose**: Show percentage of crashes involving pedestrians/cyclists

**Steps**:
1. **Visualization Type**: Donut Chart
2. **Legend**: `VULNERABILITY_FLAG`
   - 0 = "Motor-Only Crashes"
   - 1 = "Vulnerable User Involved"
3. **Values**: `COUNT(COLLISION_ID)`
4. **Data Labels**: Show percentage

**Expected Result**: ~86% motor-only, ~14% vulnerable users

---

## 📈 KEY VISUALIZATION 4: Crash Trends Over Time

**Purpose**: Time-series analysis (exclude ghost dates)

**Steps**:
1. **Visualization Type**: Line Chart
2. **Axis**: `CRASH DATE` (by Month/Year)
3. **Values**: `COUNT(COLLISION_ID)`
4. **Legend**: `BOROUGH` (show 5 different lines)
5. **Filter**: 
   - `DATA_QUALITY_FLAGS` ≠ "FUTURE_DATE"
   - `CRASH DATE` < 2026-01-01

**Expected Result**: Seasonal patterns, Brooklyn shows highest volume

---

## 🚗 KEY VISUALIZATION 5: Vehicle Type Breakdown

**Purpose**: Show standardized vehicle categories

**Steps**:
1. **Visualization Type**: Stacked Bar Chart
2. **Axis**: `VEHICLE TYPE CODE 1`
3. **Values**: `COUNT(COLLISION_ID)`
4. **Sort**: Descending by count
5. **Top N Filter**: Show top 10 vehicle types

**Expected Result**: Sedan (45%), SUV (22%), Taxi (8%), etc.

---

## 🔢 KEY VISUALIZATION 6: Borough Data Quality Scorecard

**Purpose**: Show which boroughs have best/worst reporting

**Steps**:
1. **Visualization Type**: Table or Matrix
2. **Rows**: `BOROUGH`
3. **Values**: 
   - `AVERAGE(DATA_INTEGRITY_SCORE)` (format as %)
   - `COUNT(COLLISION_ID)` (total crashes)
   - `SUM(coord_recovery_flag)` (coordinates recovered)
4. **Conditional Formatting**: 
   - Green = >80% integrity
   - Yellow = 70-80%
   - Red = <70%

**Expected Result**: Manhattan 88%, Brooklyn 74%

---

## ⏰ KEY VISUALIZATION 7: Crash Patterns by Time of Day

**Purpose**: Identify peak danger hours

**Steps**:
1. **Create Calculated Column** in Power BI:
   ```DAX
   Crash Hour = HOUR([CRASH TIME])
   ```
2. **Visualization Type**: Column Chart
3. **Axis**: `Crash Hour` (0-23)
4. **Values**: `COUNT(COLLISION_ID)`
5. **Color**: `AVERAGE(SEVERITY_SCORE)` (darker = more severe)

**Expected Result**: Rush hours (8-9 AM, 5-7 PM) show peaks

---

## 🎯 ADVANCED CALCULATED MEASURES

**Create these in Power BI for deeper analysis**:

```DAX
// Total Fatalities
Total Fatalities = SUM('Crashes'[NUMBER OF PERSONS KILLED])

// Total Injuries
Total Injuries = SUM('Crashes'[NUMBER OF PERSONS INJURED])

// Average Severity
Avg Severity = AVERAGE('Crashes'[SEVERITY_SCORE])

// High Severity Crash Count
High Severity Crashes = 
CALCULATE(
    COUNT('Crashes'[COLLISION_ID]),
    'Crashes'[SEVERITY_SCORE] > 10
)

// Pedestrian Crash Rate
Pedestrian Crash Rate = 
DIVIDE(
    SUM('Crashes'[VULNERABILITY_FLAG]),
    COUNT('Crashes'[COLLISION_ID])
) * 100

// Clean Data Percentage
Clean Data % = 
DIVIDE(
    CALCULATE(COUNT('Crashes'[COLLISION_ID]), 'Crashes'[DATA_QUALITY_FLAGS] = "CLEAN"),
    COUNT('Crashes'[COLLISION_ID])
) * 100
```

---

## 🎨 DASHBOARD LAYOUT RECOMMENDATION

**Page 1: Executive Summary**
- KPI Cards: Total Crashes, Total Fatalities, Total Injuries, Clean Data %
- NYC Crash Heatmap (large, center)
- Top 10 Dangerous Intersections (right sidebar)

**Page 2: Vulnerable Road Users**
- Donut Chart: Vulnerable User %
- Bar Chart: Pedestrian crashes by Borough
- Line Chart: Cyclist crashes over time

**Page 3: Data Quality Insights**
- Borough Quality Scorecard (table)
- Before/After Coordinate Completeness (two pie charts: 52% vs 93%)
- Data Quality Flags breakdown

**Page 4: Temporal Analysis**
- Crashes by Month/Year (line chart)
- Crashes by Hour of Day (column chart)
- Seasonal patterns by Borough

---

## 🚨 IMPORTANT FILTERS TO APPLY

**Create Page-Level Filters**:
1. **Exclude Ghost Rows**:
   ```
   DATA_QUALITY_FLAGS ≠ "FUTURE_DATE"
   ```

2. **High-Quality Data Only**:
   ```
   DATA_INTEGRITY_SCORE > 0.6
   ```

3. **Date Range**:
   ```
   CRASH DATE >= 2019-01-01 AND CRASH DATE < 2026-01-01
   ```

4. **Severity Filter** (for focused analysis):
   ```
   SEVERITY_SCORE > 0
   ```

---

## 💡 STORYTELLING TIPS FOR PRESENTATION

**Slide 1 Visual**: Show the heatmap BEFORE recovery (sparse) vs AFTER (dense)
- Use Power BI's duplicate page feature
- Filter one map by coord_recovery_flag = 0 (before)
- Show the other unfiltered (after)

**Slide 2 Visual**: Top 10 intersections bar chart
- Highlight Belt Parkway, FDR Drive in red
- Annotate with "Previously Hidden - NULL Coordinates"

**Slide 3 Visual**: Vulnerable user donut chart
- Show the 13.9% slice in bright red
- Add callout: "8,342 crashes = Vision Zero priority"

**Slide 4 Visual**: Borough quality scorecard
- Highlight Brooklyn's 74% in red
- Add recommendation: "$200K sensor upgrade needed"

---

## ✅ PRE-PRESENTATION CHECKLIST

Before the datathon:
- [ ] Verify all visualizations load without errors
- [ ] Check that dates display correctly (no 2026 ghost dates visible)
- [ ] Confirm heatmap shows high density on expressways
- [ ] Test interactivity (clicking borough should filter other visuals)
- [ ] Export high-res images for PowerPoint backup
- [ ] Prepare 3-5 second talking point for each visual

---

## 🏆 WINNING VISUAL: Before/After Recovery Map

**Most Impactful Slide**:
1. Create two identical map visualizations side-by-side
2. LEFT MAP:
   - Filter: `coord_recovery_flag = 0` AND original nulls
   - Title: "BEFORE: 52% Coordinate Completeness"
   - Color: Faded gray
3. RIGHT MAP:
   - No filter (all data)
   - Title: "AFTER: 93% Coordinate Completeness"
   - Color: Vibrant red/blue heatmap

**Speaker Note**: 
*"On the left, what NYC saw. On the right, what we revealed. 24,500 crashes just appeared on the map. Every red dot is a potential life saved if Vision Zero acts on this intelligence."*

---

**Good luck with your datathon presentation! The data is ready—now make it visual!** 🚀
