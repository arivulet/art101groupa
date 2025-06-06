document.querySelectorAll('.tv-container').forEach(container => {
    const video = container.querySelector('.tv-video');
    const startTime = parseFloat(video.dataset.start) || 0;

    let isReady = false;

    // When the video has loaded metadata, mark it as ready
    video.addEventListener('loadedmetadata', () => {
      isReady = true;
    });

    container.addEventListener('mouseenter', () => {
      if (!isReady) {
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = startTime;
          video.play();
        }, { once: true });
      } else {
        video.currentTime = startTime;
        video.play();
      }
    });

    container.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = startTime;
    });
  });

  // Array of video songs
const videoSongs = [
  {
    id: "feeling",
    title: "I've Got A Feeling - The Beatles",
    video: "../game/videos/I'VE A GOT A FEELING TAKE 1 ｜ THE BEATLES ROOFTOP CONCERT.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: "90.93",  // 165.8
  },
 
  {
    id: "darkness",
    title: "Under Cover of Darkness - The Strokes",
    video: "../game/videos/UCOD.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: 46.3
  },
  {
    id: "backwards",
    title: "Feels Like We Only Go Backwards - Arctic Monkeys",
    video: "../game/videos/FLWOGB.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: "129.8"
  },
  {
    id: "forget",
    title: "Forget Her - Jeff Buckley",
    video: "../game/videos/FHJB.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: "39"
  },
  {
    id: "paperback",
    title: "Paperback Writer - The Beatles",
    video: "../game/videos/PW.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: "80.78"
  },
 
  {
    id: "rain",
    title: "Rain - The Beatles",
    video: "../game/videos/RTB(2).mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: "28.5"
  },
  {
    id: "fake",
    title: "Fake Tales of San Francisco - Arctic Monkeys",
    video: "../game/videos/FTOSF.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: 71.2
  },
  {
    id: "infinity",
    title: "Infinity Repeating - Daft Punk feat. Julian Casablancas + The Voidz",
    video: "../game/videos/IF.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: 136.7
  }, 
  { 
    id: "smile",
    title: "Die With a Smile - Bruno Mars, Lady Gaga",
    video: "../game/videos/dwas.mp4",
    thumbnail: "../game/images/tv1.webp",
    startTime: 122.2
  }
  
  
];

// Load the TVs dynamically
function loadTVStrips() {
  
  const container = document.getElementById("video-tv-strip");
  videoSongs.forEach(song => {
    const div = document.createElement("div");
    div.className = "tv-container";

    div.innerHTML = `
      <video class="tv-video" preload="metadata" playsinline data-start="${song.startTime || 0}">
        <source src="${song.video}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src="${song.thumbnail}" class="tv-image" alt="TV" />
      <a href="../game/index.html?song=${song.id}" class="tv-click-layer" aria-label="${song.title}"></a>
      <a href="../game/index.html?song=${song.id}" class="tv-label">${song.title}</a>
    `;

    container.appendChild(div);
  });

  document.querySelectorAll('.tv-container').forEach(container => {
    const video = container.querySelector('.tv-video');
    const startTime = parseFloat(video.dataset.start) || 0;
  
    let isHovering = false;
    let hasSeeked = false;
  
    // Hide video frame until it's seeked to startTime
    video.style.visibility = "hidden";
  
    // After metadata loads, set preview frame
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = startTime;
    });
  
    // Once seeked to correct frame, show it
    video.addEventListener('seeked', () => {
      video.style.visibility = "visible";
      hasSeeked = true;
    });
  
    container.addEventListener('mouseenter', () => {
      isHovering = true;
  
      if (video.readyState >= 1 && hasSeeked) {
        video.play().catch(err => console.warn("Autoplay error:", err.message));
      } else {
        // In case seek hasn't happened yet
        video.addEventListener("seeked", () => {
          if (isHovering) {
            video.play().catch(err => console.warn("Autoplay error (delayed):", err.message));
          }
        }, { once: true });
      }
    });
  
    container.addEventListener('mouseleave', () => {
      isHovering = false;
      video.pause();
      video.currentTime = startTime;
      video.style.visibility = "hidden"; // re-hide until properly seeked again
      hasSeeked = false;
    });
  });
  
  
}

document.addEventListener("DOMContentLoaded", () => {
  loadTVStrips();
  loadAudioAlbums(); // Add this line
});


function loadAudioAlbums() {
  const container = document.getElementById("audio-album-strip");

  if (!window.songs || !Array.isArray(songs)) {
    console.warn("No songs array found.");
    return;
  }

  const audioSongs = songs.filter(song => song.file?.endsWith(".mp3") && song.photo);

  audioSongs.forEach(song => {
    const div = document.createElement("div");
    div.className = "album-container";

    div.innerHTML = `
      <div class="album-art-wrapper">
        <a href="../game/index.html?song=${song.id}">
          <img src="${song.albumArt}" class="album-image" alt="${song.title}" />
        </a>
        <audio class="hover-audio" preload="auto" src="${song.file}"></audio>
      </div>
      <a href="../game/index.html?song=${song.id}" class="album-label">${song.title}</a>
    `;

    container.appendChild(div);

    const wrapper = div.querySelector(".album-art-wrapper");
    const audio = div.querySelector(".hover-audio");

    wrapper.addEventListener("mouseenter", () => {
      let isHovering = true;
    
      const handlePlay = () => {
        const startTime = parseFloat(song.startTime) || 0;
        audio.currentTime = startTime;
        
    
        const tryPlay = () => {
          if (!isHovering) return;
          audio.play().catch(err => {
            console.warn(`Audio play failed for ${song.title}:`, err.message);
          });
        };
    
        // Wait for seek before playing
        const onSeeked = () => {
          audio.removeEventListener('seeked', onSeeked);
          tryPlay();
        };
    
        audio.addEventListener('seeked', onSeeked);
      };
    
      if (audio.readyState >= 1) {
        handlePlay();
      } else {
        audio.addEventListener("loadeddata", handlePlay, { once: true });
      }
    
      wrapper.addEventListener("mouseleave", () => {
        isHovering = false;
        audio.pause();
        audio.currentTime = 0;
      }, { once: true });
    });
    

    wrapper.addEventListener("mouseleave", () => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
  
  document.addEventListener("click", () => {
    document.userHasInteracted = true;
  }, { once: true });
  
}
