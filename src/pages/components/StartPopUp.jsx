export default function StartOverlay({
  regenerationPopUpOpen,
  submitHandler,
}) {
  const textbox = useRef(null);

  function onSubmitHandler(e) {
    e.preventDefault();
    submitHandler(textbox.current.value);
    textbox.current.value = "";
  }

  return (
    <div>
      {regenerationPopUpOpen ? (
        <div className="overlay">
          <div className={"popup"}>
            <h2>Regenerate</h2>
            <form onSubmit={onSubmitHandler}>
              <textarea
                ref={textbox}
                type="text"
                placeholder="Enter a custom prompt or leave blank for a default prompt"
              />
              <input className="styledButton" type="submit" value="Send" />
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
