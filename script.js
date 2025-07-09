// Variables

const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
let voices = [];


// Functions

//To generate the option for the voices and languages
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

// This will change the voices based on seleceted model
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
}

// It will start the Speech
function resetSpeak(startspeech = true) {
  speechSynthesis.cancel();
  if (startspeech) {
    speechSynthesis.speak(msg);
  }
}

// This changes the pitch and speed of the voice
function setOptions() {
  msg[this.name] = this.value;
  resetSpeak(false);
}

// EventListener
voicesDropdown.addEventListener("change", setVoice);
msg.text = document.querySelector("[name='text']").value;
options.forEach((data) => data.addEventListener("change", setOptions));
speechSynthesis.addEventListener("voiceschanged", populateVoices);
speakButton.addEventListener("click", resetSpeak);
stopButton.addEventListener("click", () => speechSynthesis.cancel());