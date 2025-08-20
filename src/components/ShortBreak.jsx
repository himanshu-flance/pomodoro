import { useEffect, useState } from "react";
import deskbell from "../assets/sounds/deskbell.wav";

export const ShortBreak = ({
  shotBreakComplete,
  shortBreak,
  isShortRunning,
  setIsShortRunning,
  shortTimer,
  setShortTimer,
  resetShortBreak,
  isShortRunningRef,
  playSound,
}) => {
  let hrsMinute = shortBreak * 60;
  useEffect(() => {
    if (!isShortRunning) return;
    if (shortTimer === 0) return;
    const interval = setInterval(() => {
      setShortTimer((prevState) => {
        if (prevState <= 1) {
          clearInterval(interval);
          setIsShortRunning(false); // ✅ Add this line to stop the timer
          isShortRunningRef.current = false;
          if (shotBreakComplete) {
            shotBreakComplete();
          }
          if (playSound) {
            const audio = new Audio(deskbell);
            audio.play();
          }
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    setShortTimer(shortBreak * 60);
  }, [shortBreak]);
  const calculateTime = (timerhrs) => {
    let minutes = Math.floor(timerhrs / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (timerhrs % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const startShortBreak = () => {
    setIsShortRunning(true);
    isShortRunningRef.current = true;
  };
  const pauseShortBreak = () => {
    setIsShortRunning(false);
    isShortRunningRef.current = false;
  };

  return (
    <>
      <div className="pomodorotimer-box">
        <label className="labelHeader-font">Short Break</label>
        <br></br>
        <label className="timer-font">{calculateTime(shortTimer)}</label>
        <br></br>
        <br></br>
        <div className="button-container">
          {isShortRunning === false ? (
            <button onClick={startShortBreak} className="button-start">
              Start
            </button>
          ) : (
            <button onClick={pauseShortBreak} className="button-pause">
              Pause
            </button>
          )}

          <button onClick={resetShortBreak} className="button-reset">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
