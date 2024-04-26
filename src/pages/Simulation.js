import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import SimData from "./SimData";

const Simulation = () => {
    const [selectedState, setSelectedState] = useState("Select a State");
    const [selectedAge, setSelectedAge] = useState("<16");
    const [simulationResult, setSimulationResult] = useState(null);

    const handleSelectState = (eventKey) => {
        setSelectedState(eventKey);
    };

    const handleSelectAge = (event) => {
        setSelectedAge(event.target.value);
    };

    const handleSimulation = () => {
        if (selectedState === "Select a State" || selectedAge === "") {
            setSimulationResult("Please select a state and an age to simulate.");
            return;
        }

        const stateData = SimData[selectedState];
        if (stateData) {
            const ageData = stateData[selectedAge];
            if (ageData) {
                const totalCount = Object.values(ageData).reduce((acc, val) => acc + val, 0);
                const percentageData = Object.entries(ageData).map(([key, value]) => [
                    key,
                    (value / totalCount) * 100,
                ]);
                setSimulationResult(percentageData);
            } else {
                setSimulationResult("No data available for the selected age group in this state.");
            }
        } else {
            setSimulationResult("No data available for the selected state.");
        }
    };

    return (
        <div className="simulation">
            <h1>Situation Simulations</h1>
            <div style={{ display: "flex" }}>
                <p>State: </p>
                <Dropdown style={{ marginLeft: "50px" }} onSelect={handleSelectState}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedState}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {Object.keys(SimData).map((state) => (
                            <Dropdown.Item key={state} eventKey={state}>{state}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{ display: "flex" }}>
                <p>Age: </p>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={selectedAge}
                        onChange={handleSelectAge}
                        style={{ marginLeft: "50px", marginTop: "10px" }}
                    >
                        <FormControlLabel value="<16" control={<Radio />} label="<16" />
                        <FormControlLabel value="17-30" control={<Radio />} label="17-30" />
                        <FormControlLabel value="30-45" control={<Radio />} label="30-45" />
                        <FormControlLabel value="45+" control={<Radio />} label="45+" />
                    </RadioGroup>
                </FormControl>
            </div>
            <button onClick={handleSimulation}>Simulate</button>
            {simulationResult && typeof simulationResult !== 'string' ? (
                <div>
                    <h2>Simulation Result</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <Chart
                                chartType="PieChart"
                                data={[["Age", "Percentage"]].concat(simulationResult)}
                                options={{
									fontSize:30,
									chartArea:{width:'100%',height:'100%'},
                                    legend: {
										position: 'right',
										textStyle: { color: 'black' },
									},
                                    pieSliceText: "label",
                                    slices: {
                                        0: { color: '#FF6384' },
                                        1: { color: '#36A2EB' },
                                        2: { color: '#FFCE56' },
                                    },
									pieSliceTextStyle: {
										color: 'black',
									},
                                }}
								width={"100%"}
                                height={"400px"}
                            />
                        </div>
                    </div>
                </div>
            ) : (
				<div>
					<p>{simulationResult}</p>
				</div>
			)}
        </div>
    );
};

export default Simulation;
