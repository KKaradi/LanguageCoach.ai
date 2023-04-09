export default function RegenerationPopUp({onSubmitHandler}) {
  return (
    <div className="overlay">
      <div className="popupClosed" >
        <h2>Regenerate</h2>
        <form onSubmit={onSubmitHandler}>
          <textarea type="text" placeholder="Enter a custom prompt or leave blank for a default prompt"/>
          <input className="styledButton" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}
