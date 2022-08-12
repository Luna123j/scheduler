import React, { useState } from "react";


function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, condition = false) {
    if (condition) {
      setHistory(prev => [...(prev.slice(0, -1)),newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);

  };

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...(prev.slice(0, -1))]);
    }
  }

  return { transition, mode, back };
}

export { useVisualMode };