const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

var eduData = [];
var countyData=[];

const height=1000;
const width=1200;
const padding = 100;

const title = d3
.select("body")
.append("title")
.attr("id","title")
.text("Choropleth Map");

const svg = d3
    .select("#main")
    .append("svg")
    .attr("height",height)
    .attr("width",width)
    .attr("transform","translate(100,10)");


const descriptionBlock = svg
    .append("g")
    .attr("id","description");
const descriptionSubBlock = descriptionBlock
    .append("g");

    descriptionSubBlock
        .append("text")
        .attr("id","description-title")
        .text("United States Educational Attainment")
        .attr("x",width/4)
        .attr("y",padding/2);

        descriptionSubBlock
        .append("text")
        .attr("id","description-subtitle")
        .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
        .attr("x",width-70)
        .attr("y",padding+50)
        .attr("text-anchor","end");

fetch(educationDataUrl)
    .then(response=>response.json())
    .then(result=>{
        eduData= result;
        fetch(countyDataUrl)
            .then(response=>response.json())
            .then(data=>{
                countyData = data;
                console.log(eduData)
                console.log(countyData);


            })
    })
