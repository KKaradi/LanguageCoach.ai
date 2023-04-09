export default function RegenerationPopUp({ }) {
  return (
    <div class="overlay">
      <div class="popup">
        <h2>Regenerate</h2>
        <form>
          <textarea className = "userInputFieldPopup" type="text" id="name" name="name" placeholder="Enter a custom prompt or leave blank for a default prompt"/>
        </form>
      </div>
    </div>
  );
}
