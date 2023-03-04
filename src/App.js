import { useState, useEffect } from "react";
import "./App.css";

// hours: 10

export default function App() {
  const statRolls = {
    "ATK %": 4.975,
    "DEF %": 6.2,
    "HP %": 4.975,
    "C. DMG": 6.6,
    "C. RATE": 3.3,
    EM: 19.75,
    ER: 5.5,
    ATK: 16.75,
    DEF: 19.75,
    HP: 254.0
  };
  const [statMultipliers, setStatMultipliers] = useState({
    "ATK %": 1.0,
    "DEF %": 1.0,
    "HP %": 1.0,
    "C. DMG": 1.1,
    "C. RATE": 1.1,
    EM: 1.0,
    ER: 1.0,
    ATK: 0.3,
    DEF: 0.3,
    HP: 0.3
  });
  const [statInputs, setStatInputs] = useState([0.0, 0.0, 0.0, 0.0]);
  const [selectedOptions, setSelectedOptions] = useState([...Object.keys(statRolls).slice(0, 4)]);
  // function updateStatMultipliers(key, newValue) {}
  function updateStatInputs(index, newValue) {
    const newArray = [...statInputs];
    newArray[index] = newValue;
    setStatInputs(newArray);
  }
  function updateSelectedOptions(index, newValue) {
    const newArray = [...selectedOptions];
    newArray[index] = newValue;
    setSelectedOptions(newArray);
  }
  return (
    <div className="App">
      <ScoreBox statRolls={statRolls} statInputs={statInputs} selectedOptions={selectedOptions} statMultipliers={statMultipliers} />
      <StatBox
        statTypes={Object.keys(statRolls)}
        statInputs={statInputs}
        selectedOptions={selectedOptions}
        updateStatInputs={updateStatInputs}
        updateSelectedOptions={updateSelectedOptions}
      />
      <MultiplierBox />
    </div>
  );
}

function ScoreBox({ statRolls, statInputs, selectedOptions, statMultipliers }) {
  let score = 0;
  for (let i = 0; i < 4; i++) {
    if (statRolls[selectedOptions[i]] !== 0) {
      score += (statInputs[i] * statMultipliers[selectedOptions[i]]) / statRolls[selectedOptions[i]];
    }
  }
  return <div className="ScoreBox">Score: {score}</div>;
}

function StatBox({ statTypes, statInputs, selectedOptions, updateStatInputs, updateSelectedOptions }) {
  const statRows = [];
  for (let i = 0; i < 4; i++) {
    statRows.push(
      <StatRow
        key={i}
        statTypes={statTypes}
        initialInput={statInputs[i]}
        initialOption={selectedOptions[i]}
        updateStatInputs={updateStatInputs}
        updateSelectedOptions={updateSelectedOptions}
        index={i}
      />
    );
  }
  return <div className="StatBox">{statRows}</div>;
}

function StatRow({ statTypes, initialInput, initialOption, updateStatInputs, updateSelectedOptions, index }) {
  function handleValueChange(event) {
    const newValue = parseFloat(event.target.value);
    updateStatInputs(index, newValue);
  }
  function handleOptionChange(event) {
    const newValue = event.target.value;
    updateSelectedOptions(index, newValue);
  }
  const optionElements = [];
  for (let i = 0; i < statTypes.length; i++) {
    optionElements.push(
      <option key={statTypes[i]} value={statTypes[i]}>
        {statTypes[i]}
      </option>
    );
  }
  return (
    <div className="StatRow">
      <select className="SelectStat" value={initialOption} onChange={handleOptionChange}>
        {optionElements}
      </select>
      <input className="InputStat" type="number" value={initialInput} onChange={handleValueChange} />
    </div>
  );
}

function MultiplierBox({ statMultipliers }) {
  const multiplierRows = [];
  // for (let i = 0; i < Object.keys(statMultipliers).length; i++) {

  // }
  return <div className="MultiplierBox">MultiplierBox</div>;
}
