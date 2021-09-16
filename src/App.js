import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand
} from "d3";

// const data = [25, 30, 45, 60, 20];
 
function App() {
  //demonstrate the chart will work if underlying data changes, store some data and change it later on
  const  [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  //create reference object
  const svgRef = useRef();

  //undefined at first and doesn't contain our svg dom element
  //react only updates this svg dom element when it has been rendered, and at first, it would not have been rendered and have to wait one cycle to access the svg element
  // console.log(svgRef);

  
  useEffect( () => {
    //now points to svg in dom element
    // console.log('svgRef in useEffect', svgRef);

    //now pass this dom element to d3 to work with it
    //current where our svg element now lives
    const svg = select(svgRef.current);

    //create a scale first
    // const xScale = scaleLinear()
    const xScale = scaleBand() //scaleban takes range and splits it into equal bands on x-axis by length of array argument for domain
      // .domain([0, data.length - 1])
      .domain([0, 1, 2, 3, 4, 5, 6]) //adjust domain with domain of explicit values, here we're using index values
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150]) //start with 75 so we can map 75 to green and values beyond 75 will start turning red
      .range(['green', 'orange', 'red']) //instead of defining numeric output value
      .clamp(true); //make sure that values beyond 75 or 150 will still return the values green and red defined here

    //creating x-axis first
    //axisBottom expects a scale that transforms an input value to something else, which is usually needed for visual representation of that value
    const xAxis = axisBottom(xScale)
      .ticks(data.length);
      // .tickFormat(index => index + 1);  //remove this for bar to take away the adjustments

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);

    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data) //want a bar for every element
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)') //origin of each rectangle is on top left corner, so we have to flip the bars upside-down via y-axi
      .attr('x', (value, index) => xScale(index))
      .attr('y', -150) //instead of yScale, have to set this at fix location
      .attr('width', xScale.bandwidth())
      .transition() //define what to animate after transition, so transition before height
      .attr('fill', colorScale) //here, after transition, color changes will animate
      .attr('height', value => 150 - yScale(value));

    //line will help with the d attribute of path element, which will be shaped like a line
    //have to tell our line based on the data it gets where we like to render each dot on our line
    //start with x coordinate of each dot on our line
    //y coordinate of each dot on our line
    //myLine is a function that will generate the d attribute of our path element based on the data it gets
    // const myLine = line()
    //   .x((value, index) => xScale(index))
    //   .y(yScale)
    //   .curve(curveCardinal); //argument in curve tells how to curve

    //generate path element and attach the d attribute from myLine to this path element
    //hey svg, select all the path elements and sync it with data given here
    //need to wrap/pass [data] in an array to .data() because we don't want to new path element for every element within data, but want only 1 path element for entire data array
    //join('path') to create a new path element for every entering piece of data for every new piece of data
    //attach the attribute d to every entering and updating element with the value callback, which calls back the myLine function to return new values
    // svg
    //   .selectAll(".line")
    //   .data([data])
    //   .join("path")
    //   .attr("class", "line")
    //   .attr("d", myLine)
    //   .attr("fill", "none")
    //   .attr("stroke", "blue");

    //now have all d3 methods at disposal to manipulate dom or render circles
    //hey d3, select all the existing circle elements you find in svg and synchronize them with the data(array) that I'm giving you
    //zero circles and 5 array elements --> have to make 5 circles
    //ENTER represents all the dom elements/nodes that needs to enter your svg to have the sync between your data and the dom
    //UPDATE all the the circles/dom elements that need to be updated to have the sync
    //EXIT all the circles that need to be removed from your svg, if there are more circles in svg than elements in data array, they need to be removed
    //here is where the join API or general update pattern comes into play, we can now control entering, updating, and removing in our join api
    //pass in a callback for each type of element for entering, updating, and exiting elements
    // console.log('selection', svg.selectAll('circle').data(data));
    // svg
    //   .selectAll('circle')
    //   .data(data)
    //   .join('circle')
    //   // .join(
    //   //   enter => enter.append('circle'), //create the circle dom element in svg
    //   //   //if only enter is needed, then we can use just join('circle)

    //   //   update => update.attr('class', 'updated'), //called for every circle in svg
    //   //   //can remove update callback if elements don't need to be updatedated

    //   //   exit => exit.remove() //every circle that is no longer needed, remove
    //   //   //exit is a default, so d3 will automatically remove elements no longer needed, but if you want to animate or transition the exiting elements before removing them, then can use the exit callback
    //   // )
    //   .attr('r', value => value) //will apply these attributes to enter & updating elements
    //   .attr('cx', value => value * 2)
    //   .attr('cy', value => value * 2)
    //   .attr('stroke', 'red');
  }, [data]) //every time data changes, the whole code block in useEffect is being triggered

  return (
    <React.Fragment>
      <svg ref={svgRef}>

        <g className="x-axis" />
        <g className="y-axis" />

        {/* to draw connected line in svg, use polyline element or path element, path is more powerful because you can curve the line */}
        {/* d is the collection of dots you want to have on your path */}
        {/* <path d="M0,150, 100,100 150,120" stroke="blue" fill="none" /> */}

        {/* <circle /> */}
        {/* d3 will take the existing dom element and update it, repeat circle 4 times */}
        {/* can now see the class='updated on first circle because it has been updated*/}
        {/* <circle />
        <circle />
        <circle />
        <circle />
        <circle /> */}
        {/* will see all circles updated in dom element because it had to remove 1 circle */}
        {/* {data.map(value => (
          <circle r={value}></circle>
        ))} */}
      </svg>
      <br />
      <br />
      <br />
      <br />
      {/* buttons to manipulate and change the data state */}
      <button onClick={ () => setData(data.map(value => value + 5))}>
        Update Data
      </button>
      <button onClick={ () => setData(data.filter(value => value <= 35 ))}>
        Filter Data
      </button>
    </React.Fragment>
  );
}

export default App;
