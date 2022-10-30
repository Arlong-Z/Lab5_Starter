// explore.js


const select_ = document.querySelector("#voice-select");
const button_ = document.querySelector("button");
const txt_ = document.querySelector("#text-to-speak");
const img_ = document.querySelector("#explore > img");
let output = new SpeechSynthesisUtterance("");;
let voices = [];
// populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

window.addEventListener('DOMContentLoaded', init);

function init() {
  button_.addEventListener('click', speak);
  output.addEventListener('end', reset);
}

function populateVoiceList() {
  if (typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();
  // console.log(voices);

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    select_.appendChild(option);
  }
}

function speak(){
  if (txt_.value !== "") {
    // console.log(select_.selectedOptions[0]);
    // output = new SpeechSynthesisUtterance(txt_.value);
    output.text = (txt_.value);
    const target = select_.selectedOptions[0].getAttribute("data-name");
    
    // console.log(target)
    for (let i = 0; i < voices.length; i++){
      // console.log(voices[i]);
      if (voices[i].name === target){
        output.voice = voices[i];
        break;
      }
    }
    window.speechSynthesis.speak(output);
    img_.src = "assets/images/smiling-open.png";
    img_.alt="Smiling-open face";
  }
}

function reset(){
  console.log("here");
  img_.src = "assets/images/smiling.png";
  img_.alt="Smiling face";
}