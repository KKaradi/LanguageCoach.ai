import { useState } from "react";

export default function Toggle({ label, setContinuousConversation }) {
  const [on, setOn] = useState(false);

  function sliderHandler(e) {
    e.stopPropagation();
    setOn(!on);
    setContinuousConversation(!on);
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="toggle">
      <label>{label}</label>
      <div
        onClick={sliderHandler}
        className={"toggleSlider " + (on ? "on" : "")}
      ></div>
    </div>
  );
}
