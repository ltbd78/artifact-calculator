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
  function updateStatMultipliers(key, newValue) {
    const newDict = { ...statMultipliers };
    newDict[key] = newValue;
    setStatMultipliers(newDict);
  }
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
      <MultiplierBox statMultipliers={statMultipliers} updateStatMultipliers={updateStatMultipliers} />
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
    const optionElements = statTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
    statRows.push(
      <div className="StatRow" key={i}>
        <select className="SelectStat" value={selectedOptions[i]} onChange={(event) => updateSelectedOptions(i, event.target.value)}>
          {optionElements}
        </select>
        <input className="InputStat" type="number" value={statInputs[i]} onChange={(event) => updateStatInputs(i, parseFloat(event.target.value))} />
      </div>
    );
  }
  return <div className="StatBox">{statRows}</div>;
}

function MultiplierBox({ statMultipliers, updateStatMultipliers }) {
  const multiplierRows = [];
  for (const [key, value] of Object.entries(statMultipliers)) {
    multiplierRows.push(
      <div className="MultiplierRow" key={key}>
        <span className="StatType">{key}</span>
        <input className="StatMultiplier" value={value} onChange={(event) => updateStatMultipliers(key, parseFloat(event.target.value))} />
      </div>
    );
  }
  return <div className="MultiplierBox">{multiplierRows}</div>;
}
