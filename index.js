
const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

var eduData = [];
var countyData = [];

const height = 1000;
const width = 1200;
const padding = 100;

const title = d3
    .select("body")
    .append("title")
    .attr("id", "title")
    .text("Choropleth Map");

const svg = d3
    .select("#main")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("transform", "translate(30,30)");


const descriptionBlock = svg
    .append("g")
    .attr("id", "description");

const descriptionSubBlock = descriptionBlock
    .append("g");

descriptionSubBlock
    .append("text")
    .attr("id", "description-title")
    .text("United States Educational Attainment")
    .attr("x", width / 4)
    .attr("y", padding / 2);

descriptionSubBlock
    .append("text")
    .attr("id", "description-subtitle")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
    .attr("x", width - 70)
    .attr("y", padding + 50)
    .attr("text-anchor", "end");

color = d3.scaleThreshold()
    .domain([0.03, 0.12, 0.21, 0.3, 0.39, 0.48, 0.57, 0.66])
    .range(d3.schemeGreens[7]);
format = d3.format("0.0%");

legend = g => {
    const width = 260;
    const length = color.range().length;

    const x = d3.scaleLinear()
        .domain([1, length - 1])
        .rangeRound([width / length, width * (length - 1) / length]);

    g.selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("height", 8)
        .attr("x", (d, i) => x(i))
        .attr("width", (d, i) => x(i + 1) - x(i))
        .attr("fill", d => d);

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(i => format(color.domain()[i]))
        .tickValues(d3.range(0, length + 1)))
        .select(".domain")
        .remove();
}

svg.append("g")
    .attr("transform", "translate(800,240)")
    .attr("id", "legend")
    .call(legend);

fetch(educationDataUrl)
    .then(response => response.json())
    .then(result => {
        eduData = result;
        fetch(countyDataUrl)
            .then(response => response.json())
            .then(data => {
                countyData = data;
                console.log(eduData);
                console.log(countyData);
                const path = d3.geoPath();

                const div = d3.select("body").append("div")
                    .attr("id", "tooltip")
                    .style("opacity",0);


                var tooltipData;
                const map = svg.append("g")
                    .selectAll("path")
                    .data(topojson.feature(
                        countyData, countyData.objects.counties
                    ).features)
                    .join("path")
                    .attr("fill", (d, i) => {
                        var value = (eduData[i].bachelorsOrHigher) / 100;
                        return color(value)
                    })
                    .attr("d", path)
                    .attr("class", "county")
                    .attr("data-fips", (d, i) => eduData[i].fips)
                    .attr("data-education", (d, i) => eduData[i].bachelorsOrHigher)
                    .attr("id", (d, i) => i)
                    .on("mouseover", (event,d) => {
                        tooltipData = eduData[event.target.id];
                        div.transition()
                            .duration(200)
                            .style("opacity", 0.9)
                            .attr("data-education",tooltipData["bachelorsOrHigher"]);
                        
                        div.html(
                            tooltipData["area_name"]
                            + ", " +
                            tooltipData["state"]
                            + ": " +
                            tooltipData["bachelorsOrHigher"]
                            +"%")
                            .style("left",(event.pageX)+"px")
                            .style("top",(event.pageY-30)+"px");
                        }
                    )
                    .on("mouseout",(d)=>{
                        div.transition()
                            .duration(500)
                            .style("opacity",0);
                    });

                    const stateLineMap = svg.append("path")
                    .datum(topojson.mesh(countyData,
                        countyData.objects.states, (a, b) => a !== b))
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-linejoin", "round")
                    .attr("d", path);
                    
                map.attr("transform", "translate(" + padding + "," + height / 4 + ")");
                stateLineMap.attr("transform", "translate(" + padding + "," + height / 4 + ")");
            })
    });
