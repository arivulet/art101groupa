const songs = [
	{
    id: "glue",
		title: "Glue Song (feat Clario)",
		lyrics:
			"I've never known someone like you,Tangled in love, stuck by you, from the glue Don't forget to kiss me or else you'll have to miss me I guess I'm stuck forever by the glue, oh, and you",
	},
	{
    id: "smile",
		title: "Die With a Smile",
		lyrics:
			"If the world was ending, I'd wanna be next to you If the party was over and our time on Earth was through I'd wanna hold you just for a while and die with a smile If the world was ending, I'd wanna be next to you",
		file: "songs/Lady Gaga, Bruno Mars - Die With A Smile (Official Audio).mp3",
	},
	{
    id: "feeling",
		title: "I've Got A Feeling - The Beatles",
		lyrics:
			"I've got a feeling, a feeling deep inside, oh yeah. Oh yeah. That's right. I've got a feeling, a feeling I can't hide, oh no. Oh no! Oh no. Yeah! Yeah! I've got a feeling. Oh please believe me, I'd hate to miss the train, oh yeah, yeah, oh yeah. And if you leave me, I won't be late again, oh no. Oh no! Oh no! Yeah, yeah! I've got a feeling.  I've got a feeling. All these years I've been wandering around, wondering how come nobody told me all that I was looking for was somebody who looked like you!  I've got a feeling that keeps me on my toes, oh yeah.  Oh yeah!  I've got a feeling, I think that everybody knows, oh yeah, oh yeah! Oh yeah! Yeah! I've got a feeling yeah! Everybody had a hard year. Everybody had a good time. Everybody had a wet dream. Everybody saw the sunshine. Oh yeah, oh yeah, oh yeah. Everybody had a good year. Everybody let their hair down. Everybody pulled their socks up, yeah. Everybody put their foot down, oh yeah. I've got a feeling, a feeling deep inside, oh yeah.  Everybody had a wet dream, oh yeah. Everybody saw the sunshine. I've got a feeling, a feeling I can hide, oh no. Everybody pulled their socks up, oh no no. Everybody put their foot down, oh! Yeah! I've got a feeling. I've got a feeling, oh yeah. I've got a feeling.  ",
		file: "songs/I've Got A Feeling (Remastered 2009).mp3",
		photo: "images/rooftopconcert.jpeg",
    photoSize: "650px"
	},
	{
    id: "nature",
		title: "Child of Nature (Esher Demo) - The Beatles",
		lyrics: 
      "On the road to Rishikesh, I was dreaming more or less. And the dream I had was true, yes the dream I had was true.  I'm just a child of nature, I don't need much to set me free.",
		file: "songs/Child Of Nature (Esher Demo).mp3",
		photo: "images/ontheroad.jpg",
	},
	{
    id: "forget",
		title: "Forget Her - Jeff Buckley",
		lyrics:
			"While this town is busy sleeping, all the noise has died away, I walk the streets to stop my weeping cause she will never change her way. But don't fool yourself, she was heartache from the moment that you met her. Ah, my heart feels so still as I try to find the will To forget her somehow. Oh, I think I've forgotten her now.",
		file: "songs/Jeff Buckley - Forget Her.mp3",
		photo: "img/jeff-buckley.jpg",
  
	},
  {
    id: "what",
    title: "What Ever Happened - The Strokes",
    lyrics: 
     "I wanna be forgotten and I don't wanna be reminded. You say please don't make this harder. No I won't yet.  I wanna be beside her. She wanna be admired, you say please don't make this harder. No I won't yet. Oh dear is it really all true? Did they offend us and they want it to sound true? Top ten ideas for countdown shows, whose culture is this and does anybody know? I wait and tell myself, life ain't chess, but no one comes in and yes, you're alone. You don't miss me, I know. Oh Tennessee what did you write? ",
    file: "songs/What Ever Happened_.mp3",
    photo: "images/strokes2.jpg"






  }
];

let currentIndex = 0;

function renderLyrics(lyrics) {
  const container = document.getElementById("lyrics-display");
  container.innerHTML = "";

  for (let char of lyrics) {
    const span = document.createElement("span");
    span.innerHTML = char === " " ? "&nbsp;" : char;
    container.appendChild(span);
  }
}



function loadSongByIndex(index) {
	if (index < 0 || index >= songs.length) {
		console.warn("Invalid song index:", index);
		return;
	}
	currentIndex = 0;
	const song = songs[index];

	function renderLyrics(lyrics) {
    const container = document.getElementById("lyrics-display");
    container.innerHTML = "";
  
    for (let char of lyrics) {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space
      container.appendChild(span);
    }
  }
  
  

	if (song.file) {
		$("#player").attr("src", song.file).show();
	} else {
		$("#player").removeAttr("src").hide();
	}
  
 


	if (song.photo) {
		$("#song-photo").attr("src", song.photo).show();
	} else {
		$("#song-photo").hide();
	}

  $("#song-photo")
  .attr("src", song.photo)
  .css("max-width", song.photoSize || "450px"); // default size fallback

	const audio = $("#player")[0];
	audio.load();
	audio.play();

	$("#song-title").css("color", "white");
	$("#lyrics-display").focus();
}

function handleTyping(event) {
	const lyricsSpans = document.querySelectorAll("#lyrics-display span");
	if (currentIndex >= lyricsSpans.length) return;

	const expectedChar = lyricsSpans[currentIndex].textContent;
	const typedChar = event.key;

	if (event.ctrlKey || event.altKey || event.metaKey) return;
	if (typedChar.length !== 1 && event.key !== "Backspace") return;

	if (event.key === "Backspace") {
		if (currentIndex > 0) {
			currentIndex--;
			lyricsSpans[currentIndex].classList.remove("correct", "incorrect");
		}
		event.preventDefault();
		return;
	}

	if (typedChar === expectedChar) {
		lyricsSpans[currentIndex].classList.add("correct");
		lyricsSpans[currentIndex].classList.remove("incorrect");
	} else {
		lyricsSpans[currentIndex].classList.add("incorrect");
		lyricsSpans[currentIndex].classList.remove("correct");
	}

	currentIndex++;
	event.preventDefault();
}

window.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);

  const songId = urlParams.get("song");

if (songId) {
  const song = songs.find(s => s.id === songId);
  if (song) {
    loadSong(song);
  } else {
    console.warn("Song not found for id:", songId);
  }
} else {
  // fallback to random song
  loadSong(songs[Math.floor(Math.random() * songs.length)]);
}


function loadSong(song) {
	currentIndex = 0;
	renderLyrics(song.lyrics);

	$("#song-title").html("<h2>" + song.title + "</h2>");
	$("#typing-container").css("display", "block");

	if (song.file) {
		$("#player").attr("src", song.file).show();
	} else {
		$("#player").removeAttr("src").hide();
	}

	if (song.photo) {
		$("#song-photo")
			.attr("src", song.photo)
			.css("max-width", song.photoSize || "450px")
			.show();
	} else {
		$("#song-photo").hide();
	}

	const audio = $("#player")[0];
	audio.load();
	audio.play();

	$("#song-title").css("color", "white");
	$("#lyrics-display").focus();
}

	$("#lyrics-display").on("keydown", handleTyping);


  function handleTyping(event) {
    const lyricsSpans = document.querySelectorAll("#lyrics-display span");
    if (currentIndex >= lyricsSpans.length) return;
  
    const expectedChar = lyricsSpans[currentIndex].textContent;
    const typedChar = event.key;
  
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (typedChar.length !== 1 && event.key !== "Backspace") return;
  
    if (event.key === "Backspace") {
      if (currentIndex > 0) {
        currentIndex--;
        lyricsSpans[currentIndex].classList.remove("correct", "incorrect");
      }
      event.preventDefault();
      updateProgress();
      return;
    }
  
    if (typedChar === expectedChar) {
      lyricsSpans[currentIndex].classList.add("correct");
      lyricsSpans[currentIndex].classList.remove("incorrect");
    } else {
      lyricsSpans[currentIndex].classList.add("incorrect");
      lyricsSpans[currentIndex].classList.remove("correct");
    }
  
    currentIndex++;
    event.preventDefault();
  
    function autoScrollCurrent() {
      const lyricsSpans = document.querySelectorAll("#lyrics-display span");
      const currentSpan = lyricsSpans[currentIndex - 1];
      if (currentSpan) {
        currentSpan.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    }
    
    
    lyricsSpans[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center" // 👈 this is crucial for horizontal scroll
    });
    
  }
  
  function updateProgress() {
    const progress = (currentIndex / document.querySelectorAll("#lyrics-display span").length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }
  
  
});
