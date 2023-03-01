import { useState, useEffect } from "react";
import "./App.css";

// hours: 8

export default function App() {
  const statTypes = ["ATK %", "DEF %", "HP %", "C. DMG", "C. RATE", "EM", "ER", "ATK", "DEF", "HP"];
  const [inputArray, setInputArray] = useState([0.0, 0.0, 0.0, 0.0]);
  const [optionArray, setOptionArray] = useState([...statTypes.slice(0, 4)]);
  function updateInputArray(index, newValue) {
    const newArray = [...inputArray];
    newArray[index] = newValue;
    setInputArray(newArray);
  }
  function updateOptionArray(index, newValue) {
    const newArray = [...optionArray];
    newArray[index] = newValue;
    setOptionArray(newArray);
  }
  const score = inputArray.reduce((a, b) => a + b, 0);
  return (
    <div className="App">
      <ScoreBox score={score} optionArray={optionArray} />
      <StatBox
        statTypes={statTypes}
        inputArray={inputArray}
        optionArray={optionArray}
        updateInputArray={updateInputArray}
        updateOptionArray={updateOptionArray}
      />
      <MultiplierBox />
    </div>
  );
}

function ScoreBox({ score, optionArray }) {
  return (
    <div className="ScoreBox">
      Score: {score} {optionArray}
    </div>
  );
}

function StatBox({ statTypes, inputArray, optionArray, updateInputArray, updateOptionArray }) {
  function StatRow({ statTypes, initialInput, initialOption, updateInputArray, updateOptionArray, index }) {
    // todo: fix unfocusing
    function handleInputChange(event) {
      const newValue = parseFloat(event.target.value);
      updateInputArray(index, newValue);
    }
    function handleOptionChange(event) {
      const newValue = event.target.value;
      updateOptionArray(index, newValue);
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
        <input className="InputStat" type="number" value={initialInput} onChange={handleInputChange} />
      </div>
    );
  }
  const statRows = [];
  for (let i = 0; i < inputArray.length; i++) {
    statRows.push(
      <StatRow
        key={i}
        statTypes={statTypes}
        initialInput={inputArray[i]}
        initialOption={optionArray[i]}
        updateInputArray={updateInputArray}
        updateOptionArray={updateOptionArray}
        index={i}
      />
    );
  }
  return <div className="StatBox">{statRows}</div>;
}

function MultiplierBox({ statTypes }) {
  return <div className="MultiplierBox">MultiplierBox</div>;
}

function getScore() {}
