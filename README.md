# Tuberculosis-Data-Visualization

## Dependencies

- HTML, CSS, JavaScript
- D3.js (v7)
- Pandas (for preprocessing CSV data)

## Introduction

Tuberculosis (TB) remains a significant global health issue, and effective data visualization can help in understanding **its spread, demographic impact, and trends over time**. This project presents **multiple interactive visualizations** using **D3.js** to explore **hierarchical relationships, time-based trends, geographic distributions, and demographic breakdowns** within TB datasets.

The visualizations allow users to:
- **Analyze regional and decade-wise TB cases** through a **Treemap**.
- **Explore country-level connections** in a **Force-Directed Graph**.
- **Observe temporal trends** with a **Time-Lapse Bar Chart**.
- **Compare gender-based distributions** via a **World Map with Population Charts**.
- **Drill down into hierarchical relationships** using a **Sunburst Chart**.

Each visualization is **interactive**, allowing users to filter data, drill down into specific insights, and analyze TB trends from different perspectives.

## Project Objectives

- Provide an interactive visualization of TB cases across **regions, decades, and demographics**.
- Enable users to **explore relationships** between countries using network analysis.
- Present **time-series trends** for TB cases globally.
- Offer **demographic insights** (gender and age distribution) using hierarchical and geospatial visualizations.

## Data Preprocessing

To ensure the dataset is structured and optimized for visualization, we perform the following preprocessing steps:

- **Handling Missing Values:**
  - Records with missing region, country, or population values are removed.
  - Missing age group or gender-based data is filled using mean imputation.

- **Data Aggregation:**
  - Population data is aggregated **by region and decade** for the Treemap.
  - Time-series data is grouped **by year** for the Time-Lapse visualization.
  - The Force-Directed Graph aggregates population at the **region-country** level.

- **Data Normalization & Standardization:**
  - Region and country names are standardized for consistency (e.g., "USA" vs. "United States").
  - Population values are scaled for visual clarity in charts.

- **Encoding Categorical Variables:**
  - Gender-based populations are **split into separate columns** for the World Map.
  - Relationship types (for the Force-Directed Graph) are mapped to numerical values.

### How the Data is Used in Each Visualization

- **Force-Directed Graph:** Establishes relationships between regions and countries based on population data.
- **Treemap:** Categorizes TB cases into a hierarchical structure (region → decade → population).
- **Time-Lapse Bar Chart:** Tracks TB case trends across different years.
- **World Map & Population Charts:** Compares gender-based distributions over time.
- **Sunburst Chart:** Explores TB case breakdowns by age, gender, and country.

---

## 1. Force-Directed Graph

### Dataset Used
- **Source:** `Force_directed_graph.csv`
- **Columns Used:** Region, Country, Age Groups, TotalPopAffected

### Design Choices

- **Nodes:** Represent regions and countries (regions as larger central nodes, countries as smaller nodes connected to them).
- **Links:** Indicate relationships, with link strength proportional to population affected.
- **Color Scheme:** Uses `d3.schemeCategory10` to differentiate between regions and countries.

### Interactive Features

- **Zoom and Pan:** Allows navigation with mouse interactions.
- **Tooltips:** Displays node details (region, country, population) on hover.
- **Region Filter:** Clicking a region reveals its connected countries.
- **Age Group Filter:** Dropdown to filter by demographics.
- **Draggable Nodes:** Users can manually explore relationships.
- **Reset Button:** Clears filters and restores the default view.

---

## 2. Treemap (Aggregated by Region and Decade)

### Dataset Used
- **Source:** `treemap.json`
- **Columns Used:** Region, Decade, TotalPopAffected

### Design Choices

- **Hierarchy Levels:**
  - **Level 1:** Regions (e.g., EMR, SEA, WPR).
  - **Level 2:** Decades (e.g., 1980-1990, 1990-2000).
  - **Level 3:** Population affected.
- **Color Scheme:** Supports dynamic palettes (`Blues`, `Viridis`, etc.).

### Interactive Features

- **Region Filter:** Dropdown for selecting specific regions.
- **Color Scheme Selection:** Allows users to switch color palettes.
- **Breadcrumb Navigation:** Tracks user’s drill-down path.
- **Tooltips:** Displays region, decade, and population details on hover.

---

## 3. Time-Lapse Visualization with Bar Chart

### Dataset Used
- **Source:** `Data.csv`
- **Columns Used:** Country, Year, TotalPopAffected

### Design Choices

- **Map:** Uses `geoMercator` projection to visualize country populations.
- **Bar Chart:** Highlights the top and bottom five countries based on affected population.
- **Color Coding:** Blue to red gradient indicating population impact intensity.

### Interactive Features

- **Year Slider:** Allows users to select a year (1980–2020).
- **Auto-Scroll Mode:** Plays the time-lapse automatically.
- **Tooltips:** Displays country-wise population data on hover.
- **Dynamic Updates:** Both the map and bar chart update in real-time.

---

## 4. World Map with Population Charts

### Dataset Used
- **Source:** `Data.csv`
- **Columns Used:** Country, Year, Gender-Based Population Ratios

### Design Choices

- **Map:** Displays global TB population data using a sequential color scale.
- **Pie Chart:** Represents male-to-female population ratios for selected countries.
- **Bar Chart:** Compares gender-based distributions across countries.

### Interactive Features

- **Year Range Selector:** Allows users to analyze different time periods.
- **Zoom & Reset:** Enables zooming into specific countries.
- **Country Click:** Loads pie and bar charts for detailed demographic analysis.
- **Tooltip on Hover:** Displays affected population details.

---

## 5. Sunburst Chart for Population Data

### Dataset Used
- **Source:** `treemap.json`
- **Columns Used:** Region, Country, Gender, Age Groups, TotalPopAffected

### Design Choices

- **Hierarchy Levels:**
  - **Root Node:** Total Population.
  - **Level 1:** Regions.
  - **Level 2:** Countries.
  - **Level 3:** Gender.
  - **Level 4:** Age Groups.
- **Color Scheme:** Uses `d3.schemeDark2` for distinct segments.

### Interactive Features

- **Region-Based Filtering:** Dropdown to filter by specific regions.
- **Hover Effect:** Displays tooltips with segment details.
- **Click to Focus:** Highlights a selected segment while dimming others.
- **Legend Explanation:** Users can filter by clicking labels in the legend.

---

## Limitations & Future Work

### Current Limitations
- The **Force-Directed Graph** does not currently support **edge weighting** for relationship strength.
- The **Time-Lapse visualization** lacks predictive modeling for future TB trends.
- The **World Map** does not provide a drill-down feature for subnational data.

### Future Enhancements
- **Integrate predictive analytics** using machine learning for TB trend forecasting.
- **Improve geospatial granularity** by adding province/state-level mapping.
- **Enhance interaction** by allowing users to upload their own TB datasets.

---

## Running the Project

### 1. Using Python HTTP Server

Navigate to the project directory and run:

```sh
python -m http.server 8000
```

Then, open `http://localhost:8000/index.html` in your browser.

### 2. Using VS Code Live Server

1. Install the **Live Server** extension.
2. Open `index.html` in VS Code.
3. Right-click and select **Open with Live Server**.

---

## Contributors

- **Ahsan Abdul** ([i221870@nu.edu.pk](mailto:i221870@nu.edu.pk))
- **M Zaid** ([i221934@nu.edu.pk](mailto:i221934@nu.edu.pk))
- **Awais Arshad** ([i221989@nu.edu.pk](mailto:i221989@nu.edu.pk))

