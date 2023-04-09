
import StyledContainer from "./StyledContainer.jsx";
import Toggle from "./Toggle.jsx"

export default function ChatSetting({visibleElm}) {
    const {visibleId, setVisibleId} = visibleElm;

    function toggleDropdown() {
        setVisibleId(visibleId===2?0:2);
      }
    
    return (
        <div className={"dropdownList " + (visibleId===2 ? "expanded" : "")}>
          <div onClick={toggleDropdown} className="dropdownToggle">
            <StyledContainer>
              <img id="flagIcon" src='setting.svg' alt="setting icon" />
            </StyledContainer>
            <div className="optionList">
                <StyledContainer> 
                <Toggle label='Continuous Conversation'/>
                </StyledContainer>
            </div>
          </div>
        </div>
    );

}