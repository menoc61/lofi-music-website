import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { RootState, useAppSelector } from "../../store/store";
import ModifierBoard from "../ModifierBoard";
import RainToggleButton from "../RainToggleButton";
import Footer from "../../layout/Footer";

import "./Home.scss";

const Home = () => {
  const [timerStart, setTimerStart] = useState(false);
  const daynight = useAppSelector((state: RootState) => state.mode);
  const rain = useAppSelector((state: RootState) => state.rain);

  const { mode } = daynight;
  const { rainMode } = rain;

  const combineMode = `${mode}-${rainMode}`;

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 0);

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => setTimerStart(false),
    });

  const setTimerHandler = (hour: number, minute: number, second: number) => {
    const time = new Date();
    const setupTimer = hour * 3600 + second + minute * 60;
    time.setSeconds(time.getSeconds() + setupTimer);
    restart(time);
  };

  const renderVideo = (videoType: string, condition: boolean) => {
    return (
      <video
        className={combineMode === videoType ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src={`/assets/video/${videoType}.mp4`} type="video/mp4" />
      </video>
    );
  };

  return (
    <>
      {/* Night Videos */}
      {renderVideo("night-clear", combineMode === "night-clear")}
      {renderVideo("night-rain", combineMode === "night-rain")}
      {/* Day Videos */}
      {renderVideo("day-clear", combineMode === "day-clear")}
      {renderVideo("day-rain", combineMode === "day-rain")}

      <RainToggleButton />
      <ModifierBoard
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        isRunning={isRunning}
        pause={pause}
        resume={resume}
        restart={restart}
        setTimerHandler={setTimerHandler}
        setTimerStart={setTimerStart}
        timerStart={timerStart}
      />
      <Footer />
    </>
  );
};

export default Home;
