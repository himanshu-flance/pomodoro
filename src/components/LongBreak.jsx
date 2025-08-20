import { useEffect, useState } from "react";
import deskbell from "../assets/sounds/deskbell.wav";

export const LongBreak = ({
  longBreakComplete,
  longBreak,
  longTimer,
  setLongTimer,
  resetLongTimer,
  longisRunning,
  setLongIsRunning,
  longIsRunningRef,
  playSound,
}) => {
  let hhmmTimer = longBreak * 60;

  useEffect(() => {
    if (!longisRunning) return;
    const interval = setInterval(() => {
      setLongTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setLongIsRunning(false);
          longIsRunningRef.current = false;
          if (longBreakComplete) {
            longBreakComplete();
          }
          if (playSound) {
            const audio = new Audio(deskbell);
            audio.play();
          }
          return 0;
        }
        return (prevTime = prevTime - 1);
      });
    }, 1000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    setLongTimer(longBreak * 60);
  }, [longBreak]);
  const formatTime = (longTimer) => {
    let minutes = Math.floor(longTimer / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (longTimer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const startTimer = () => {
    setLongIsRunning(true);
    longIsRunningRef.current = true;
  };

  const pauseTimer = () => {
    setLongIsRunning(false);
    longIsRunningRef.current = false;
  };
  return (
    <>
      <div className="pomodorotimer-box">
        <label className="labelHeader-font">Long Break</label>
        <br></br>
        <label className="timer-font">{formatTime(longTimer)}</label>
        <br></br>
        <br></br>
        <div className="button-container">
          {longisRunning === false ? (
            <button onClick={startTimer} className="button-start">
              Start
            </button>
          ) : (
            <button onClick={pauseTimer} className="button-pause">
              Pause
            </button>
          )}
          <button onClick={resetLongTimer} className="button-reset">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
