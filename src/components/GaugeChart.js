import React, { useRef, useEffect, useState } from 'react';
import { select, arc, pie, interpolate } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect( () => {
    const observeTarget = ref.current;

    const resizeObserver = new ResizeObserver( (entries) => {
      entries.forEach( (entry) => {
        setDimensions(entry.contentRect);
      });
    });

    resizeObserver.observe(observeTarget);
    
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

function GaugeChart({data}) {
  // console.log('this is d3 gaugechart data', data)

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // console.log(dimensions);

    if (!dimensions) return;

    //helper methods to help create the arcs
    const arcGenerator = arc()
      .innerRadius(75)
      .outerRadius(150);

    const pieGenerator = pie().sort(null);
    const instructions = pieGenerator(data);

    //need 2 path elements, one for each of the data element
    svg
      .selectAll('.slice')
      .data(instructions)
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (instruction, index) => (index === 0 ? '#f5d7e3' : '#eee'))
      .style(
        'transform',
        `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`
      )
      .transition()
      .attrTween('d', function(nextInstruction) {
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1)
        return function (t){
          return arcGenerator(interpolator(t));
      }});

    //draw the gauge

  }, [data, dimensions]);

  const completionPercent = (data[0] * 100).toFixed(0);

  return (
    <>
      <span>You've completed {completionPercent}% of your daily habits this month! </span>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
        </svg>
      </div>
    </>
  );
}

export default GaugeChart;
