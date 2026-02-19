import { useState } from "react";

function View() {
  const [counter, setCounter] = useState(0);

  function handleCounterChange(operation) {
    switch (operation) {
      case "+":
        setCounter((counter) => counter + 1);
        break;
      case "-":
        setCounter((counter) => counter - 1);
        break;
      case "reset":
        setCounter(0);
        break;
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3">
        <button onClick={() => handleCounterChange("+")}>+</button>
        <button onClick={() => handleCounterChange("-")}>-</button>
        <button onClick={() => handleCounterChange("reset")}>Reset</button>
      </div>

      <div> Counter: {counter}</div>
    </div>
  );
}

export default View;
