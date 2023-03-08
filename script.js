const VOICERSS_API_KEY = '41f1f7119b5c4e00bf3d5325e013eee9';
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Programming';

const buttonElement = document.querySelector('#button');
const audioElement = document.querySelector('#audio')

// Toggles the button to opposite of current state
function toggleButton() {
  buttonElement.disabled = !buttonElement.disabled;
}

// VoiceRSS Javascript SDK

async function getJoke() {
  let joke = '';

  try {
    const response = await fetch(JOKE_API_URL);
    const jokeObj = await response.json();
    
    if (jokeObj.setup) {
      joke = `${jokeObj.setup}. ${jokeObj.delivery}`;
    } else {
      joke = jokeObj.joke;
    }
    getSpeech(joke);
  } catch (err) {
    console.error('error fetching joke:', err);
  }
}

function getSpeech(joke) {
  VoiceRSS.speech({
    key: VOICERSS_API_KEY,
    // src: 'Hello, my friend!',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

async function runApp() {
  await getJoke();
  toggleButton();
}

buttonElement.addEventListener('click', runApp);
audioElement.addEventListener('ended', toggleButton);