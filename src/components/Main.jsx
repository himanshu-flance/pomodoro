import { useState } from "react";
import { LongBreak } from "./LongBreak";
import PomodoroTimer from "./pomodorotimer";
import { ShortBreak } from "./ShortBreak";
import { SettingsOptions } from "./SettingsOptions";
import { useRef, useEffect } from "react";

export const Main = () => {
  // UI states for showing sections
  const [showPomodoro, setShowPomodoro] = useState(true);
  const [showShortBreak, setShowShortBreak] = useState(false);
  const [showLongBreak, setShowLongBreak] = useState(false);
  const [showSettings, setShowSetting] = useState(false);

  // Counters for tracking completed sessions
  const [countOfPomodoro, setCountOfPomodoro] = useState(0);
  const [countOfShortBreaks, setCountOfShortBreaks] = useState(0);
  const [countOfLongBreaks, setCountOfLongBreaks] = useState(0);

  // Timer durations
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  // Timer status
  const [isRunning, setIsRunning] = useState(false);
  let totalHrs = pomodoro * 60;
  const [newTime, setNewTime] = useState(totalHrs);

  let hhmmTimer = longBreak * 60;
  const [longTimer, setLongTimer] = useState(hhmmTimer);
  const [longisRunning, setLongIsRunning] = useState(false);

  let hrsMinute = shortBreak * 60;
  const [shortTimer, setShortTimer] = useState(hrsMinute);
  const [isShortRunning, setIsShortRunning] = useState(false);

  // Refs to track timer state across re-renders
  const isRunningRef = useRef(false);
  const isShortRunningRef = useRef(false);
  const longIsRunningRef = useRef(false);

  // User preference: play sound toggle
  const [playSound, setPlaySound] = useState(true);

  // Load initial data from localStorage
  useEffect(() => {
    let existingData = localStorage.getItem("pomodoroDetails");
    if (!existingData) {
      let pomodoroDetails = {
        pomodoroTimer: pomodoro,
        shortBreakTimer: shortBreak,
        longBreakTimer: longBreak,
        pomodorosCompleted: countOfPomodoro,
        shortBreakCompleted: countOfShortBreaks,
        longBreakCompleted: countOfLongBreaks,
        playSound: playSound,
      };
      localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    } else {
      let pomodoroDetails = JSON.parse(existingData);
      setPomodoro(pomodoroDetails.pomodoroTimer);
      setShortBreak(pomodoroDetails.shortBreakTimer);
      setLongBreak(pomodoroDetails.longBreakTimer);
      setCountOfPomodoro(pomodoroDetails.pomodorosCompleted);
      setCountOfShortBreaks(pomodoroDetails.shortBreakCompleted);
      setCountOfLongBreaks(pomodoroDetails.longBreakCompleted);
      setPlaySound(pomodoroDetails.playSound);
      //localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    }
  }, []);

  // Sync running states with refs
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    isShortRunningRef.current = isShortRunning;
  }, [isShortRunning]);

  useEffect(() => {
    longIsRunningRef.current = longisRunning;
  }, [longisRunning]);

  // Fallback to default values if user clears input
  const checkandSetEmptyValues = () => {
    if (pomodoro === "") {
      setPomodoro(25);
    }
    if (shortBreak === "") {
      setShortBreak(5);
    }
    if (longBreak === "") {
      setLongBreak(15);
    }
  };

  // Toggle sound preference and store it
  const handleSoundToggle = (e) => {
    const playSoundStatus = e.target.checked;
    setPlaySound(e.target.checked);
    let existingData = localStorage.getItem("pomodoroDetails");
    if (existingData) {
      let pomodoroDetails = {
        pomodoroTimer: pomodoro,
        shortBreakTimer: shortBreak,
        longBreakTimer: longBreak,
        pomodorosCompleted: countOfPomodoro,
        shortBreakCompleted: countOfShortBreaks,
        longBreakCompleted: countOfLongBreaks,
        playSound: playSoundStatus,
      };
      localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    }
  };

  // Pomodoro button click handler
  const pomodoroClickHandle = (skipConfirm = false) => {
    var statusOfLongTimer = longisRunning;
    var statusOfShortTimer = isShortRunning;
    if (skipConfirm) {
      resetLongTimer();
      resetShortBreak();
      checkandSetEmptyValues();
      setShowPomodoro(true);
      setShowShortBreak(false);
      setShowLongBreak(false);
      setShowSetting(false);
      return; // ✅ Exit early to skip confirmation
    }

    //if (statusOfLongTimer || statusOfShortTimer) {
    //if (!skipConfirm && (longisRunning || isShortRunning || isRunning)) {
    if (
      !skipConfirm &&
      (longIsRunningRef.current ||
        isShortRunningRef.current ||
        isRunningRef.current)
    ) {
      var confirmation = confirm(
        "The Pomodoro timer is running. This action will reset it. Do you want to continue?"
      );
      if (confirmation) {
        if (statusOfLongTimer) {
          resetLongTimer();
        }
        if (statusOfShortTimer) {
          resetShortBreak();
        }
        checkandSetEmptyValues();
        setShowPomodoro(true);
        setShowShortBreak(false);
        setShowLongBreak(false);
        setShowSetting(false);
      }
    } else {
      resetLongTimer();
      resetShortBreak();
      checkandSetEmptyValues();
      setShowPomodoro(true);
      setShowShortBreak(false);
      setShowLongBreak(false);
      setShowSetting(false);
    }
  };

  // Short Break button click handler
  const shortBreakClickHandle = (skipConfirm = false) => {
    var statusofTimer = isRunning;
    var statusOfLongTimer = longisRunning;
    //if (!skipConfirm && (statusofTimer || statusOfLongTimer)) {
    //if (!skipConfirm && (isRunning || longisRunning || isShortRunning)) {
    if (
      !skipConfirm &&
      (longIsRunningRef.current ||
        isShortRunningRef.current ||
        isRunningRef.current)
    ) {
      var confirmation = confirm(
        "The timer is running. This action will reset it. Do you want to continue?"
      );
      if (confirmation) {
        if (isRunning) {
          reset();
        }
        if (longisRunning) {
          resetLongTimer();
        }
        checkandSetEmptyValues();
        setShowPomodoro(false);
        setShowShortBreak(true);
        setShowLongBreak(false);
        setShowSetting(false);
      }
    } else {
      reset();
      resetLongTimer();
      checkandSetEmptyValues();
      setShowPomodoro(false);
      setShowShortBreak(true);
      setShowLongBreak(false);
      setShowSetting(false);
    }
  };

  // Long Break button click handler
  const longBreakClickHandle = (skipConfirm = false) => {
    var statusofTimer = isRunning;
    var statusOfShortTimer = isShortRunning;
    //if (!skipConfirm && (statusofTimer || statusOfShortTimer)) {
    //if (!skipConfirm && (isRunning || longisRunning || isShortRunning)) {
    if (
      !skipConfirm &&
      (longIsRunningRef.current ||
        isShortRunningRef.current ||
        isRunningRef.current)
    ) {
      var confirmation = confirm(
        "The timer is running. This action will reset it. Do you want to continue?"
      );
      if (!confirmation) return;
      reset();
      resetShortBreak();
      resetLongTimer();
      if (confirmation) {
        if (statusofTimer) {
          reset();
        }
        if (statusOfShortTimer) {
          resetShortBreak();
        }
        checkandSetEmptyValues();
        setShowPomodoro(false);
        setShowShortBreak(false);
        setShowLongBreak(true);
        setShowSetting(false);
      }
    } else {
      reset();
      resetShortBreak();
      checkandSetEmptyValues();
      setShowPomodoro(false);
      setShowShortBreak(false);
      setShowLongBreak(true);
      setShowSetting(false);
    }
  };

  // Called when a Pomodoro completes
  const calcuteCount = () => {
    const newCount = countOfPomodoro + 1;
    setCountOfPomodoro(newCount);
    let pomodoroDetails = {
      pomodoroTimer: pomodoro,
      shortBreakTimer: shortBreak,
      longBreakTimer: longBreak,
      pomodorosCompleted: newCount,
      shortBreakCompleted: countOfShortBreaks,
      longBreakCompleted: countOfLongBreaks,
      playSound: playSound,
    };
    localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    if (newCount % 4 === 0) {
      longBreakClickHandle(true);
    } else {
      shortBreakClickHandle(true);
    }
  };

  // Called when a Short Break completes
  const shortBreakComplete = () => {
    const newCount = countOfShortBreaks + 1;
    setCountOfShortBreaks(newCount);
    let pomodoroDetails = {
      pomodoroTimer: pomodoro,
      shortBreakTimer: shortBreak,
      longBreakTimer: longBreak,
      pomodorosCompleted: countOfPomodoro,
      shortBreakCompleted: newCount,
      longBreakCompleted: countOfLongBreaks,
      playSound: playSound,
    };
    localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    pomodoroClickHandle(true);
  };

  // Called when a Long Break completes
  const longBreakComplete = () => {
    const newCount = countOfLongBreaks + 1;
    setCountOfLongBreaks(newCount);
    let pomodoroDetails = {
      pomodoroTimer: pomodoro,
      shortBreakTimer: shortBreak,
      longBreakTimer: longBreak,
      pomodorosCompleted: countOfPomodoro,
      shortBreakCompleted: countOfShortBreaks,
      longBreakCompleted: newCount,
      playSound: playSound,
    };
    localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    pomodoroClickHandle(true);
  };

  // Settings button click handler
  const settingsClickHandle = () => {
    var statusofTimer = isRunning;
    var statusOfShortTimer = isShortRunning;
    var statusOfLongTimer = longisRunning;
    if (statusofTimer || statusOfShortTimer || statusOfLongTimer) {
      var confirmation = confirm(
        "The timer is running. This action will reset it. Do you want to continue?"
      );
      if (confirmation) {
        if (statusofTimer) {
          reset();
        }
        if (statusOfShortTimer) {
          resetShortBreak();
        }
        if (statusOfLongTimer) {
          resetLongTimer();
        }
        setShowPomodoro(false);
        setShowShortBreak(false);
        setShowLongBreak(false);
        setShowSetting(true);
      }
    } else {
      reset();
      resetShortBreak();
      resetLongTimer();
      setShowPomodoro(false);
      setShowShortBreak(false);
      setShowLongBreak(false);
      setShowSetting(true);
    }
  };

  // Utility to reset all timers
  const reset = () => {
    setNewTime(totalHrs);
    setIsRunning(false);
    isRunningRef.current = false;
  };
  const resetLongTimer = () => {
    setLongTimer(hhmmTimer);
    setLongIsRunning(false);
    longIsRunningRef.current = false;
  };
  const resetShortBreak = () => {
    setShortTimer(hrsMinute);
    setIsShortRunning(false);
    isShortRunningRef.current = false;
  };

  // JSX: Buttons to switch views and conditionally render timers or settings
  return (
    <>
      {/* Navigation buttons */}
      <button
        onClick={() => pomodoroClickHandle(false)}
        className={showPomodoro === true ? "selected-Item" : ""}
      >
        🍅Pomodoro
      </button>
      &nbsp;&nbsp;
      <button
        onClick={() => shortBreakClickHandle(false)}
        className={showShortBreak === true ? "selected-Item" : ""}
      >
        🌿Short Break
      </button>
      &nbsp;&nbsp;
      <button
        onClick={() => longBreakClickHandle(false)}
        className={showLongBreak === true ? "selected-Item" : ""}
      >
        🌴Long Break
      </button>
      &nbsp;&nbsp;
      <button
        onClick={settingsClickHandle}
        className={showSettings === true ? "selected-Item" : ""}
      >
        ⚙️ Settings
      </button>
      <br></br>
      <br></br>
      {/* Conditional rendering based on selected view */}
      {showPomodoro === true ? (
        <PomodoroTimer
          onComplete={calcuteCount}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          pomodoro={pomodoro}
          newTime={newTime}
          setNewTime={setNewTime}
          reset={reset}
          isRunningRef={isRunningRef}
          playSound={playSound}
        ></PomodoroTimer>
      ) : (
        ""
      )}
      {showShortBreak === true ? (
        <ShortBreak
          shotBreakComplete={shortBreakComplete}
          shortBreak={shortBreak}
          isShortRunning={isShortRunning}
          setIsShortRunning={setIsShortRunning}
          shortTimer={shortTimer}
          setShortTimer={setShortTimer}
          resetShortBreak={resetShortBreak}
          isShortRunningRef={isShortRunningRef}
          playSound={playSound}
        ></ShortBreak>
      ) : (
        ""
      )}
      {showLongBreak === true ? (
        <LongBreak
          longBreakComplete={longBreakComplete}
          longBreak={longBreak}
          longTimer={longTimer}
          setLongTimer={setLongTimer}
          resetLongTimer={resetLongTimer}
          longisRunning={longisRunning}
          setLongIsRunning={setLongIsRunning}
          longIsRunningRef={longIsRunningRef}
          playSound={playSound}
        ></LongBreak>
      ) : (
        ""
      )}
      {showSettings === true ? (
        <SettingsOptions
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          playSound={playSound}
          setPlaySound={setPlaySound}
          handleSoundToggle={handleSoundToggle}
          countOfPomodoro={countOfPomodoro}
          setCountOfPomodoro={setCountOfPomodoro}
          countOfShortBreaks={countOfShortBreaks}
          setCountOfShortBreaks={setCountOfShortBreaks}
          countOfLongBreaks={countOfLongBreaks}
          setCountOfLongBreaks={setCountOfLongBreaks}
        ></SettingsOptions>
      ) : (
        ""
      )}
      <br></br>
      {/* Summary display */}
      <div>
        {countOfPomodoro > 0 ? "🍅Pomodoros Completed: " + countOfPomodoro : ""}
        <br></br>
        {countOfShortBreaks > 0
          ? "🌿Short Breaks Completed: " + countOfShortBreaks
          : ""}
        <br></br>
        {countOfLongBreaks > 0
          ? "🌴Long Breaks Completed: " + countOfLongBreaks
          : ""}
      </div>
    </>
  );
};
