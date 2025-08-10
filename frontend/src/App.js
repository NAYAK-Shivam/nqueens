import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [n, setN] = useState(4);
  const [steps, setSteps] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState([]);
  const foundSolutionsRef = useRef(new Set()); // Track which solutions logged
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const fetchSolutions = async () => {
    if (n < 4 || n > 12) {
      alert("Please enter N between 4 and 12.");
      return;
    }
    setIsPlaying(false);
    setSteps([]);
    setSolutions([]);
    setIndex(0);
    setLogs([]);
    foundSolutionsRef.current.clear();

    const res = await axios.get(`${API_URL}/solve?n=${n}`);
    setSteps(res.data.steps);
    setSolutions(res.data.solutions);
  };

  const startVisualization = () => {
    if (!steps.length) return;
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      setIndex(i);

      // Check if this step matches any solution and hasn't been logged yet
      solutions.forEach((sol, idx) => {
        if (
          JSON.stringify(sol) === JSON.stringify(steps[i]) &&
          !foundSolutionsRef.current.has(idx)
        ) {
          foundSolutionsRef.current.add(idx);
          setLogs((prev) => [...prev, `✅ Solution ${idx + 1} found!`]);
        }
      });

      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 500);
  };

  const renderBoard = (boardArr) => {
    const size = boardArr.length;
    return (
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${size}, 40px)`,
          gridTemplateRows: `repeat(${size}, 40px)`,
        }}
      >
        {boardArr.map((row, r) =>
          row.split("").map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`cell ${(r + c) % 2 === 0 ? "white" : "black"}`}
            >
              {cell === "Q" ? "♛" : ""}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>N-Queens Visualizer</h1>
      <div>
        <label>Board size (n): </label>
        <input
          type="number"
          value={n}
          min="4"
          max="12"
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 4 && val <= 12) setN(val);
          }}
        />
        <button onClick={fetchSolutions}>Generate</button>
        <button onClick={startVisualization} disabled={isPlaying}>
          Start Visualization
        </button>
      </div>

      {/* Current step visualization */}
      <div style={{ marginTop: "20px" }}>
        {steps.length > 0 && (
          <>
            <h2>Current Backtracking Step</h2>
            {renderBoard(steps[index])}
          </>
        )}
      </div>

      {/* Simulation log */}
      {logs.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <h3>Simulation Log</h3>
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      )}

      {/* Display found solutions */}
      {solutions.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Found Solutions ({solutions.length})</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {solutions.map((sol, idx) => (
              <div key={idx}>
                <h4>Solution {idx + 1}</h4>
                {renderBoard(sol)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
