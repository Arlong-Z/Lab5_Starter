// expose.js

window.addEventListener('DOMContentLoaded', init);

const body = document.querySelector('body');
const { top, bottom, left, right } = body.getBoundingClientRect();
// const img = document.querySelector('#explore');
console.log({top, bottom,left,right});
const jsConfetti = new JSConfetti();
jsConfetti.x = ((left+right) / 2) / window.innerWidth;
jsConfetti.y = ((top+bottom) / 2) / window.innerWidth

function init() {
  document.querySelector('.hidden').volume = 50 / 100;
  document.getElementById('horn-select').addEventListener('change', select_photo);
  document.querySelector('button').addEventListener('click', play_audio);
  document.getElementById('volume').addEventListener('input', change_volume);
}

function select_photo(event) {
  const ouput = document.querySelector('#expose > img');
  const link = 'assets/images/' + event.target.value + '.svg';
  ouput.src = link;
  const play = document.getElementsByClassName('hidden')[0];
  play.src = 'assets/audio/' + event.target.value  + '.mp3';
  play.type = 'audio/mpeg'
}

function play_audio(){
  const aud = document.getElementsByClassName('hidden')[0];
  // console.log(aud);
  const current = document.getElementById('horn-select');
  if (current.value != "select"){
    aud.load();
    aud.play();
  }
  if (current.value == 'party-horn'){
    jsConfetti.addConfetti();
  }
}

function change_volume(){
  const play = document.getElementsByClassName('hidden')[0];
  play.volume = this.value / 100;
  const img = document.querySelector('#volume-controls > img');
  if (this.value == 0) {
    img.src = "assets/icons/volume-level-0.svg";
    img.alt = "Volume level 0";
  }
  else if (this.value < 33) {
    img.src = "assets/icons/volume-level-1.svg";
    img.alt = "Volume level 1";
  }
  else if (this.value < 67) {
    img.src = "assets/icons/volume-level-2.svg";
    img.alt = "Volume level 2";
  }
  else {
    img.src = "assets/icons/volume-level-3.svg";
    img.alt = "Volume level 3";
  }
}