import React, { useEffect, useState } from "react";
import "./Typist.css";

/**
 * Minimal stand-in for react-typist, which is unmaintained and does not
 * support React 18+. Types `children` out one character at a time, then
 * leaves a blinking cursor behind.
 */
function Typist({ children, className = "", avgTypingDelay = 70 }) {
  const text = String(children);
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    // Vary the delay a little so it reads as typing rather than a metronome.
    const delay = avgTypingDelay * (0.5 + Math.random());
    const timer = setTimeout(() => setCount((n) => n + 1), delay);
    return () => clearTimeout(timer);
  }, [count, done, avgTypingDelay]);

  useEffect(() => {
    setCount(0);
  }, [text]);

  return (
    <span className={`Typist ${className}`.trim()}>
      {text.slice(0, count)}
      <span className={done ? "Cursor Cursor--blinking" : "Cursor"}>|</span>
    </span>
  );
}

export default Typist;
