const songs = [
  {
    title: "Glue Song (feat Clario)",
    lyrics: "I've never known someone like you,Tangled in love, stuck by you, from the glue Don't forget to kiss me or else you'll have to miss me I guess I'm stuck forever by the glue, oh, and you"
  },
  {
    title: "Die With a Smile",
    lyrics: "If the world was ending, I'd wanna be next to you If the party was over and our time on Earth was through I'd wanna hold you just for a while and die with a smile If the world was ending, I'd wanna be next to you",
    file: "songs/Lady Gaga, Bruno Mars - Die With A Smile (Official Audio).mp3"
  },
  {
    title: "I've Got A Feeling - The Beatles", 
    lyrics: "I've got a feeling, a feeling deep inside, oh yeah. Oh yeah. That's right. I've got a feeling, a feeling I can't hide, oh no. Oh no! Oh no. Yeah. Yeah. I've got a feeling. Oh please believe me, I'd hate to miss the train, oh yeah, yeah, oh yeah. And if you leave me, I won't be late again, oh no. Oh no. ",
    file: "songs/I've Got A Feeling (Remastered 2009).mp3"
  },

  { 
    title: "Child of Nature (Esher Demo) - The Beatles",
    lyrics: "On the road to Rishikesh, I was dreaming more or less.  And the dream I had was true, yes the dream I had was true.  I'm just a child of nature, I don't need much to set me free.", 
    file: "songs/Child Of Nature (Esher Demo).mp3"


  }

];

let currentIndex = 0;

function renderLyrics(lyrics) {
  const container = document.getElementById("lyrics-display");
  container.innerHTML = '';
  for (let char of lyrics) {
    const span = document.createElement('span');
    span.textContent = char;
    container.appendChild(span);
  }
}

// Typing input logic and span coloring inspired with help from ChatGPT (OpenAI)

function loadRandomSong() {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  currentIndex = 0;

 
  renderLyrics(randomSong.lyrics);

  $("#song-title").append("<h2>" + randomSong.title + "</h2>")
  
  
  $("#typing-container").css("display", "block")

  $("#player").attr("src", randomSong.file);
  const audio = $("#player")[0];
  audio.load(); 
  audio.play();
  
  // Set focus on the lyrics container so it receives keyboard input
  const lyricsDisplay = document.getElementById("lyrics-display");


$("#song-title").css("color", "white") 

  lyricsDisplay.focus();
}

function handleTyping(event) {
  const lyricsSpans = document.querySelectorAll('#lyrics-display span');
  if (currentIndex >= lyricsSpans.length) return;

  const expectedChar = lyricsSpans[currentIndex].textContent;
  const typedChar = event.key;

  // Allow navigation keys without effect
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  // Only process printable characters or backspace
  if (typedChar.length !== 1 && event.key !== "Backspace") return;

  if (event.key === "Backspace") {
    if (currentIndex > 0) {
      currentIndex--;
      lyricsSpans[currentIndex].classList.remove('correct', 'incorrect');
    }
    event.preventDefault();
    return;
  }

  if (typedChar === expectedChar) {
    lyricsSpans[currentIndex].classList.add('correct');
    lyricsSpans[currentIndex].classList.remove('incorrect');
  } else {
    lyricsSpans[currentIndex].classList.add('incorrect');
    lyricsSpans[currentIndex].classList.remove('correct');
  }

  currentIndex++;
  event.preventDefault();
}

window.addEventListener("DOMContentLoaded", () => {
  const mode = new URLSearchParams(window.location.search).get("mode");
  const randomButton = document.getElementById("randomsongb");

  if (mode === "random") {
    loadRandomSong();
  }



  // Listen on the lyrics-display container for typing
  const lyricsDisplay = $('#lyrics-display').on('keydown', handleTyping);
  lyricsDisplay.addEventListener('keydown', handleTyping);

  console.log("game.js loaded");
});


