import { useState } from "react";

export const SettingsOptions = (props) => {
  const handleChange = (setter, value, target) => {
    if (value === "") {
      setter("");
    }
    const intValue = Number(value);
    if (intValue >= 1 && intValue <= 60) {
      setter(intValue);
    }
    let existingData = localStorage.getItem("pomodoroDetails");
    if (existingData) {
      let pomodoroDetails = JSON.parse(existingData);
      if (target.name === "Pomodoro") {
        pomodoroDetails.pomodoroTimer = Number(value);
      }
      if (target.name === "Short Break") {
        pomodoroDetails.shortBreakTimer = Number(value);
      }
      if (target.name === "Long Break") {
        pomodoroDetails.longBreakTimer = Number(value);
      }
      if (target.name === "soundTickChk") {
        pomodoroDetails.playSound = target.e.checked;
      }
      localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    }
    //else {
    //   let pomodoroTimer = 0;
    //   let shortBreakTimer = 0;
    //   let longBreakTimer = 0;
    //   if (target.name === "Pomodoro") {
    //     pomodoroTimer = Number(value);
    //   }
    //   if (target.name === "Short Break") {
    //     shortBreakTimer = Number(value);
    //   }
    //   if (target.name === "Long Break") {
    //     longBreakTimer = Number(value);
    //   }
    //   let pomodoroDetails = {
    //     pomodoroTimer: pomodoroTimer,
    //     shortBreakTimer: shortBreakTimer,
    //     longBreakTimer: longBreakTimer,
    //     pomodorosCompleted: 0,
    //     shortBreakCompleted: 0,
    //     longBreakCompleted: 0,
    //   };
    //   localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    // }
  };
  const handleKeyDown = (e) => {
    if (["e", "E", ".", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const resetSettings = () => {
    props.setPomodoro(25);
    props.setShortBreak(5);
    props.setLongBreak(15);
    props.setPlaySound(true);
    let existingData = localStorage.getItem("pomodoroDetails");
    if (existingData) {
      let pomodoroDetails = JSON.parse(existingData);
      pomodoroDetails.pomodoroTimer = 25;
      pomodoroDetails.shortBreakTimer = 5;
      pomodoroDetails.longBreakTimer = 15;
      pomodoroDetails.playSound = true;
      localStorage.setItem("pomodoroDetails", JSON.stringify(pomodoroDetails));
    }
  };
  const resetAllData = () => {
    let confirmation = confirm(
      "This action will reset all Pomodoro Completed data. Do you wish to continue?"
    );
    if (confirmation) {
      props.setPomodoro(25);
      props.setShortBreak(5);
      props.setLongBreak(15);
      props.setPlaySound(true);
      let existingData = localStorage.getItem("pomodoroDetails");
      if (existingData) {
        let pomodoroDetails = JSON.parse(existingData);
        props.setCountOfPomodoro(0);
        props.setCountOfShortBreaks(0);
        props.setCountOfLongBreaks(0);
        pomodoroDetails.pomodorosCompleted = 0;
        pomodoroDetails.shortBreakCompleted = 0;
        pomodoroDetails.longBreakCompleted = 0;
        pomodoroDetails.pomodoroTimer = 25;
        pomodoroDetails.shortBreakTimer = 5;
        pomodoroDetails.longBreakTimer = 15;
        pomodoroDetails.playSound = true;
        localStorage.setItem(
          "pomodoroDetails",
          JSON.stringify(pomodoroDetails)
        );
      }
    }
  };
  return (
    <>
      <div className="pomodorotimer-box">
        <div className="timer-container">
          <label className="labelHeader-font">Timer Settings</label>
          <br></br>
          <br></br>
          <form>
            <table width="100%">
              <tbody>
                <tr>
                  <td className="table-tdLabel">
                    {/* <label>Pomodoro : </label> */}
                    Pomodoro :
                  </td>
                  <td className="table-tdText">
                    <input
                      type="number"
                      min={1}
                      max={60}
                      step={1}
                      value={props.pomodoro}
                      className="input-type"
                      id="Pomodoro"
                      onChange={(e) =>
                        handleChange(
                          props.setPomodoro,
                          e.target.value,
                          e.target
                        )
                      }
                      onKeyDown={handleKeyDown}
                      name="Pomodoro"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="table-tdLabel">
                    <label>Short Break : </label>
                  </td>
                  <td className="table-tdText">
                    <input
                      type="number"
                      min={1}
                      max={15}
                      step={1}
                      value={props.shortBreak}
                      id="Short Break"
                      className="input-type"
                      onChange={(e) =>
                        handleChange(
                          props.setShortBreak,
                          e.target.value,
                          e.target
                        )
                      }
                      onKeyDown={handleKeyDown}
                      name="Short Break"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="table-tdLabel">
                    <label>Long Break : </label>
                  </td>
                  <td className="table-tdText">
                    <input
                      type="number"
                      min={1}
                      max={30}
                      step={1}
                      value={props.longBreak}
                      id="Long Break"
                      className="input-type"
                      onChange={(e) =>
                        handleChange(
                          props.setLongBreak,
                          e.target.value,
                          e.target
                        )
                      }
                      onKeyDown={handleKeyDown}
                      name="Long Break"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="table-tdLabel">
                    <input
                      id="soundTickChk"
                      type="checkbox"
                      checked={props.playSound}
                      onChange={props.handleSoundToggle}
                      name="soundTickChk"
                    ></input>
                  </td>
                  <td className="table-tdText">Play sound</td>
                </tr>
              </tbody>
            </table>
          </form>
          <br></br>
          <div className="button-container">
            <button onClick={resetSettings} className="button-reset">
              Reset
            </button>
            <button onClick={resetAllData} className="button-reset">
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
