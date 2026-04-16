import { useEffect, useState } from "react";
import "./style.css";

function getClock() {
  const currentTime = new Date();
  const currentClock = {
    hours: currentTime.getHours().toString().padStart(2, "0"),
    minutes: currentTime.getMinutes().toString().padStart(2, "0"),
    seconds: currentTime.getSeconds().toString().padStart(2, "0"),
  };

  return currentClock;
}

function Clock() {
  const [clock, setClock] = useState(getClock());
  const [isClockStopped, setClockStopped] = useState(false);

  function handleIsClockStopped(bool) {
    if (!bool) {
      setClock(getClock());
    }

    setClockStopped(bool);
  }

  useEffect(() => {
    if (!isClockStopped) {
      const interval = setInterval(() => {
        setClock(getClock());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isClockStopped]);

  return (
    <div className="flex flex-col gap-5">
      <span className={`text-3xl ${isClockStopped ? "stopped-btn" : ""}`}>
        {clock.hours}:{clock.minutes}:{clock.seconds}
      </span>
      <div className="flex gap-3">
        <button
          className={isClockStopped && "inactive-btn"}
          onClick={() => handleIsClockStopped(true)}
        >
          Stop
        </button>
        <button
          className={!isClockStopped && "inactive-btn"}
          onClick={() => handleIsClockStopped(false)}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default Clock;
