/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import StyledContainer from "./StyledContainer.jsx";
import {languageConfig} from "../utils/language-config.js"

const languageToIconMap = {
  English: "/flags_icons/gb.svg",
  Chinese: "/flags_icons/cn.svg",
  Spanish: "/flags_icons/es.svg",
  French: "/flags_icons/fr.svg",
  Japanese: "flags_icons/jp.svg"
};

export default function Dropdown({ currentLanguage, languageHandler }) {
  const [isVisible, setIsVisible] = useState(false);


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
        {Object.keys(languageConfig).map((l) => (
          <StyledContainer key = {l} clickHandler={() => languageHandler(l)}>
            <span >{l}</span>
            <img id="flagIcon" src={languageToIconMap[l]} alt="language icon" />
          </StyledContainer>
        ))}
      </div>
    </div>
  );
}
