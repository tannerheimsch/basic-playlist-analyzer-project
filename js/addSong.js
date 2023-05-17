/*
 * Creates and appends a new input set for a song, including fields for song name, duration, and genre.
 * This function is triggered when the user clicks the "Add Song" button.
 */

function addInputSet() {
  var inputSet = document.createElement('div');
  inputSet.innerHTML = `
    <label for="songName">Song Name:</label>
    <input class="songName" type="text" />

    <label for="songDuration">Duration <small>(MM:SS)</small>:</label>
    <input class="songDuration" type="text" />

    <label for="songGenre">Genre:</label>
    <select class="songGenre">
      <option value="">- Select Genre -</option>
      <option value="Blues">Blues</option>
      <option value="Country">Country</option>
      <option value="Electronic">Electronic</option>
      <option value="Hip Hop">Hip Hop</option>
      <option value="Jazz">Jazz</option>
      <option value="Metal">Metal</option>
      <option value="Pop">Pop</option>
      <option value="R&B">R&B (Rhythm and Blues)</option>
      <option value="Reggae">Reggae</option>
      <option value="Rock">Rock</option>
      <option value="Soul">Soul</option>
      <option value="Other">Other</option>
    </select>
    <br>
  `;

  // Append the input set to the parent element
  var inputSetContainer = document.getElementById('input_set');
  inputSetContainer.appendChild(inputSet);
}