import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      history.push(newMode);
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }



  return { mode, transition, back }
}