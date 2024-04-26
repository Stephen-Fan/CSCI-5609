import React from "react";
import USAMap from "react-usa-map";
import MapData from "./MapData";
import { scaleLinear } from 'd3-scale';
import Legend from './Legend';

const stateTotals = Object.entries(MapData).reduce((acc, [state, weapons]) => {
  acc[state] = Object.values(weapons).reduce((sum, count) => sum + count, 0);
  return acc;
}, {});

const minValue = 0;
const maxValue = 2000;

function makeStatesConfig(stateTotals, colorScale) {
  const config = {};
  for (const [state, total] of Object.entries(stateTotals)) {
      config[state] = { fill: colorScale(total) };
  }
  return config;
}

export default function App() {
  const colorScale = scaleLinear()
    .domain([Math.min(...Object.values(stateTotals)), Math.max(...Object.values(stateTotals))])
    .range(["hsl(0, 90%, 95%)", "hsl(0, 90%, 30%)"]);

  const statesCustomConfig = makeStatesConfig(stateTotals, colorScale);


  const mapHandler = (event) => {
    for(let usState in MapData){
      if (event.target.dataset.name === usState){
        alert(JSON.stringify(usState) + "\n" + JSON.stringify(MapData[usState], null, 2));
      }
    }
    
  };

  return (
    <div className="mapTitle">
      <div>
        <h1>Crime Data for the Nation</h1>
        <USAMap customize={statesCustomConfig} tit onClick={mapHandler} />
      </div>
      <div className="mapLegend">
        <p>Legend</p>
        <Legend colorScale={colorScale} min={minValue} max={maxValue} />
      </div>
    </div>
  );
}
