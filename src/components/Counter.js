import { useState } from "react";

export const Counter = () => {
  //some states
  const [counter, setCounter] = useState(0);
  //some useEffect

  const onClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button type="button" onClick={onClick}>
          Add to counter
        </button>
      </div>
    </div>
  );
};
