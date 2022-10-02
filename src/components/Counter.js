export const Counter = () => {
  //some logic
  //some states
  //some useEffect

  const onClick = () => {
    console.log("button clicked - counter up by 1");
  };

  return (
    <div>
      <div>Counter display</div>
      <div>
        <button type="button" onClick={onClick}>
          Add to counter
        </button>
      </div>
    </div>
  );
};
