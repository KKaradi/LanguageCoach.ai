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

export default function Dropdown({ currentLanguage, languageHandler, visibleElm }) {
  const {visibleId, setVisibleId} = visibleElm;


  function toggleDropdown() {
    setVisibleId(visibleId===1?0:1);
  }

  return (
    <div className={"dropdownList settings " + (visibleId===1 ? "expanded" : "")}>
      <div onClick={toggleDropdown} className="dropdownToggle">
        <StyledContainer>
          <img id="flagIcon" src={languageToIconMap[currentLanguage]} alt="language icon" />
        </StyledContainer>
        <div className="optionList">
            {Object.keys(languageConfig).map((l) => (
            <StyledContainer key = {l} clickHandler={() => languageHandler(l)}>
                <span >{l}</span>
                <img id="flagIcon" src={languageToIconMap[l]} alt="language icon" />
            </StyledContainer>
            ))}
        </div>
      </div>
    </div>
  );
}
