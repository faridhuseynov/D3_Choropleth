const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

var eduData = [];
var countyData=[];

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
