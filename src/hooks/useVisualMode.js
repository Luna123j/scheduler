import { useState } from "react";

//custom hook
function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //depend on the condition decide witch history state to use
  function transition(newMode, condition = false) {

    if (condition) {
      setHistory(prev => [...(prev.slice(0, -1)),newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);

  };

  //send state back to the last state
  function back() {
    
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...(prev.slice(0, -1))]);
    }
  }

  return { transition, mode, back };
}

export { useVisualMode };