// Set dimensions and radius
const width = 800;
const radius = width / 2;

// Select the SVG container and group
const svgGroup = d3.select("svg")
    .append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

// Tooltip for interactivity
const tooltip = d3.select(".tooltip");

// Dark color scale
const color = d3.scaleOrdinal(d3.schemeDark2);

// Partition layout
const partition = d3.partition().size([2 * Math.PI, radius]);

// Arc generator
const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

// Load and process data
d3.csv("awais.csv").then(data => {
    // Convert CSV data to hierarchical structure
    const buildHierarchy = (filteredData) => {
        return {
            name: "Total Population Affected",
            children: d3.groups(filteredData, d => d.Region).map(([region, countries]) => ({
                name: region,
                children: countries.map(country => ({
                    name: country.Country,
                    children: [
                        {
                            name: "Male",
                            children: [
                                { name: "0-14", value: +country.M_Pop0to14 },
                                { name: "15-24", value: +country.M_Pop15to24 },
                                { name: "25-34", value: +country.M_Pop25to34 },
                                { name: "35-44", value: +country.M_Pop35to44 },
                                { name: "45-54", value: +country.M_Pop45to54 },
                                { name: "55-64", value: +country.M_Pop55to64 },
                                { name: "65+", value: +country.M_Pop65Plus }
                            ]
                        },
                        {
                            name: "Female",
                            children: [
                                { name: "0-14", value: +country.F_Pop0to14 },
                                { name: "15-24", value: +country.F_Pop15to24 },
                                { name: "25-34", value: +country.F_Pop25to34 },
                                { name: "35-44", value: +country.F_Pop35to44 },
                                { name: "45-54", value: +country.F_Pop45to54 },
                                { name: "55-64", value: +country.F_Pop55to64 },
                                { name: "65+", value: +country.F_Pop65Plus }
                            ]
                        }
                    ]
                }))
            }))
        };
    };

    // Create filter options for regions
    const regions = [...new Set(data.map(d => d.Region))];
    const regionFilter = d3.select("#region-filter");
    regions.forEach(region => {
        regionFilter.append("option").text(region).attr("value", region);
    });

    // Function to update chart based on region
    const updateChart = (region) => {
        // Filter data
        const filteredData = region === "All" ? data : data.filter(d => d.Region === region);
        
        // Build hierarchy data
        const hierarchyData = buildHierarchy(filteredData);

        // Create root node
        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // Apply partition layout
        partition(root);

        // Bind data and draw Sunburst chart
        const paths = svgGroup.selectAll("path").data(root.descendants());

        paths.join(
            enter => enter.append("path")
                .attr("d", arc)
                .style("fill", d => color(d.depth))
                .style("stroke", "#fff")
                .style("cursor", "pointer")
                .on("mouseover", (event, d) => {
                    tooltip.style("opacity", 1)
                        .html(`
                            <strong>${d.data.name}</strong><br>
                            Value: ${d.value ? d3.format(",")(d.value) : "N/A"}
                        `);
                })
                .on("mousemove", event => {
                    tooltip.style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 20}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                })
                .on("click", (event, d) => {
                    // Highlight the selected section by darkening it
                    svgGroup.selectAll("path")
                        .style("opacity", 0.5); // Dim all sections

                    d3.select(event.currentTarget)
                        .style("opacity", 1); // Highlight the clicked section
                }),
            update => update.attr("d", arc),
            exit => exit.remove()
        );
    };

    // Initialize chart with all regions
    updateChart("All");

    // Listen for filter change
    regionFilter.on("change", function () {
        const selectedRegion = this.value;
        updateChart(selectedRegion);
    });
}).catch(error => {
    console.error("Error loading data:", error);
});
