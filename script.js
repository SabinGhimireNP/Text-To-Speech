
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
  // console.log(voices);
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  // console.log("Hello");
}
function resetSpeak(startOver = true) {
  if (startOver) {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }
}
function stopSpeak() {}

function setOptions() {
  msg[this.name] = this.value;
  // resetSpeak();
}

function changeOptions() {
  // options[1].value
  if (this.name === "pitch") msg.pitch = this.value;
  // console.log(msg);
}

options.forEach((option) => option.addEventListener("change", changeOptions));
voicesDropdown.addEventListener("change", setVoice);
msg.text = document.querySelector("[name='text']").value;
options.forEach((data) => data.addEventListener("change", setOptions));
speechSynthesis.addEventListener("voiceschanged", populateVoices);
speakButton.addEventListener("click", resetSpeak);
stopButton.addEventListener("click", () => speechSynthesis.cancel());
// console.log(msg);
