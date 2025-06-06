const demoSongs = [
    {
      id: "feeling",
      title: "I've Got A Feeling - The Beatles",
      video: "../game/videos/I'VE A GOT A FEELING TAKE 1 ｜ THE BEATLES ROOFTOP CONCERT.mp4",
      thumbnail: "../game/images/tv1.webp",
      startTime: 70
    },
    {
      id: "rain",
      title: "Rain - The Beatles",
      video: "../game/videos/RTB(2).mp4",
      thumbnail: "../game/images/tv1.webp",
      startTime: 20
    },
    {
      id: "backwards",
      title: "Feels Like We Only Go Backwards - Arctic Monkeys",
      video: "../game/videos/FLWOGB.mp4",
      thumbnail: "../game/images/tv1.webp",
      startTime: 30
    },
    {
      id: "darkness",
      title: "Under Cover of Darkness - The Strokes",
      video: "../game/videos/UCOD.mp4",
      thumbnail: "../game/images/tv1.webp",
      startTime: 120
    },
    {
      id: "everything",
      title: "Everything She Wants - Wham!",
      file: "../game/songs/Everything She Wants.mp3",
      albumArt: "../game/albumart/mib.jpeg",
      startTime: 86.1
    },
    {
      id: "nowhere",
      title: "Nowhere Man - The Beatles",
      file: "../game/songs/Nowhere Man (Remastered 2009).mp3",
      albumArt: "../game/albumart/rs.jpeg",
      startTime: 127.19
    }
  ];
  
  function loadDemoStrip() {
    const strip = document.getElementById("demo-strip");
  
    demoSongs.forEach(song => {
      const div = document.createElement("div");
  
      if (song.video) {
        div.innerHTML = `
          <a href="../game/index.html?song=${song.id}" class="tv-link">
            <div class="tv-container">
              <video class="tv-video" preload="metadata" playsinline data-start="${song.startTime}">
                <source src="${song.video}" type="video/mp4" />
              </video>
              <img src="${song.thumbnail}" class="tv-image" alt="TV" />
              <div class="tv-label">${song.title}</div>
            </div>
          </a>
        `;
      } else {
        div.innerHTML = `
          <a href="../game/index.html?song=${song.id}" class="album-link">
            <div class="album-container">
              <img src="${song.albumArt}" class="album-image" alt="${song.title}" />
              <audio class="hover-audio" preload="auto" src="${song.file}" data-start="${song.startTime || 0}"></audio>
              <div class="album-label">${song.title}</div>
            </div>
          </a>
        `;
      }
  
      strip.appendChild(div);
    });
  
    // Hover behavior for videos
    document.querySelectorAll('.tv-container').forEach(container => {
        const video = container.querySelector('.tv-video');
        const startTime = parseFloat(video.dataset.start) || 0;
      
        // Wait for metadata so we can seek safely
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = startTime;
        });
      
        // Playback on hover
        container.addEventListener('mouseenter', () => {
          video.currentTime = startTime;
          video.play().catch(err => {
            console.warn("Autoplay error:", err.message);
          });
        });
      
        container.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = startTime;
        });
      });
      
  
    // Hover behavior for audio — only after elements exist
    document.querySelectorAll('.album-container').forEach(container => {
      const audio = container.querySelector('audio');
      const startTime = parseFloat(audio.dataset.start) || 0;
      let isHovering = false;
  
      const playAudio = () => {
        if (!isHovering) return;
        audio.currentTime = startTime;
        audio.play().catch(err => {
          console.warn("Audio play failed:", err.message);
        });
      };
  
      container.addEventListener("mouseenter", () => {
        isHovering = true;
        if (audio.readyState >= 1) {
          playAudio();
        } else {
          audio.addEventListener('loadedmetadata', playAudio, { once: true });
        }
      });
  
      container.addEventListener("mouseleave", () => {
        isHovering = false;
        audio.pause();
        audio.currentTime = startTime;
      });
    });
  }
  

  document.querySelectorAll('.album-container').forEach(container => {
    const audio = container.querySelector('audio');
    const startTime = parseFloat(audio.dataset.start) || 0;
    let isHovering = false;
  
    container.addEventListener("mouseenter", () => {
      isHovering = true;
  
      const tryPlay = () => {
        if (!isHovering) return;
        audio.currentTime = startTime;
        audio.play().catch(err => {
          console.warn("Audio play failed:", err.message);
        });
      };
  
      if (audio.readyState >= 1) {
        tryPlay();
      } else {
        audio.addEventListener('loadedmetadata', tryPlay, { once: true });
      }
    });
  
    container.addEventListener("mouseleave", () => {
      isHovering = false;
      audio.pause();
      audio.currentTime = startTime;
    });
  });
  
  
  
  document.addEventListener("DOMContentLoaded", loadDemoStrip);
  