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
    .attr("transform","translate(0,100)");

   const descriptionDiv = svg.append("p")
   .text("hello")
   .attr("height",100)
   .attr("width",100)
   .attr("transform","translate(10,10)");
//         .append("p")
//         .attr("x",100)
//         .attr("y",100)
//         .attr("height",100)
//         .attr("width",100)
//         .text("hello");
// const descriptionBlock = svg
//     .append("g")
//     .attr("id","description")
//     .attr("transform","translate(40,60)");

// const descriptionSubBlock = descriptionBlock
//     .append("g")
//     .attr("transform","translate(40,60)");

// const descriptionDiv = descriptionSubBlock
//     .append("div")
//     .attr("transform","translate(40,60)");

//     descriptionDiv
//         .append("p")
//         .attr("x",100)
//         .attr("y",100)
//         .attr("height",100)
//         .attr("width",100)
//         .text("hello");

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
