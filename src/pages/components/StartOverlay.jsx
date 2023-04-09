import { useRef } from "react";

export default function StartOverlay({ setStartPopUpOpen, onPressHandler }) {
  return (
    <div className="overlay">
      <button
        className="big-red-button"
        onClick={() => {
          setStartPopUpOpen(false);
          onPressHandler();
        }}
      >
        Enter
      </button>
    </div>
  );
}
