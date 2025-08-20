import { useEffect, useState } from "react";
import "../App.css";
import deskbell from "../assets/sounds/deskbell.wav";
const PomodoroTimer = ({
  onComplete,
  pomodoro,
  isRunning,
  setIsRunning,
  newTime,
  setNewTime,
  reset,
  isRunningRef,
  playSound,
}) => {
  let totalHrs = pomodoro * 60;

  useEffect(() => {
    if (!isRunning) return;
    //if (newTime < 0) return;
    const interval = setInterval(() => {
      setNewTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
          setIsRunning(false);
          isRunningRef.current = false;
          if (playSound) {
            const audio = new Audio(deskbell);
            audio.play();
          }
          //setNewTime(totalHrs);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);
  useEffect(() => {
    setNewTime(pomodoro * 60);
  }, [pomodoro]);
  function formatTime(newTimeinSeconds) {
    const minutes = Math.floor(newTimeinSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (newTimeinSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const startClick = () => {
    setIsRunning(true);
    isRunningRef.current = true;
  };
  const pauseClick = () => {
    setIsRunning(false);
    isRunningRef.current = false;
  };
  return (
    <>
      <div className="pomodorotimer-box">
        <label className="labelHeader-font">Pomodoro</label>
        <br></br>
        <label className="timer-font">{formatTime(newTime)}</label>
        <br></br>
        <br></br>
        <div className="button-container">
          {isRunning === false ? (
            <button onClick={startClick} className="button-start">
              Start
            </button>
          ) : (
            <button onClick={pauseClick} className="button-pause">
              Pause
            </button>
          )}

          <button onClick={reset} className="button-reset">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
export default PomodoroTimer;
