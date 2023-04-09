/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import StyledContainer from "./StyledContainer.jsx";

const languageToIconMap = {
  English: "/flags_icons/gb.svg",
  Chinese: "/flags_icons/cn.svg",
  Spanish: "/flags_icons/es.svg",
  French: "/flags_icons/fr.svg",
};

export default function Dropdown({ currentLanguage, languageHandler }) {
  const [isVisible, setIsVisible] = useState(false);

  const LANGUAGE_OPTIONS = [
    { language: "English", icon: "/flags_icons/gb.svg" },
    { language: "Chinese", icon: "/flags_icons/cn.svg" },
    { language: "Spanish", icon: "/flags_icons/es.svg" },
    { language: "French", icon: "/flags_icons/fr.svg" },
  ];

  function toggleDropdown() {
    setIsVisible(!isVisible);
  }

  return (
    <div className={"languageDropdown " + (isVisible ? "expanded" : "")}>
      <div onClick={toggleDropdown} className="currentOption">
        <StyledContainer>
          <img id="flagIcon" src={languageToIconMap[currentLanguage]} alt="language icon" />
        </StyledContainer>
      </div>
      <div className="optionList">
        {LANGUAGE_OPTIONS.map((l) => (
          <StyledContainer key = {l.language} clickHandler={() => languageHandler(l.language)}>
            <span >{l.language}</span>
            <img id="flagIcon" src={l.icon} alt="language icon" />
          </StyledContainer>
        ))}
      </div>
    </div>
  );
}
