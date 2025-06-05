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
  setTimeout(() => {
    video.pause();
    video.currentTime = startTime;
  }, 10000); // 5000ms = 5 seconds

  // Array of video songs
const videoSongs = [
  {
    id: "feeling",
    title: "I've Got A Feeling - The Beatles",
    video: "../game/videos/I'VE A GOT A FEELING TAKE 1 ｜ THE BEATLES ROOFTOP CONCERT.mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "forget",
    title: "Forget Her - Jeff Buckley",
    video: "../game/videos/FHJB.mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "paperback",
    title: "Paperback Writer - The Beatles",
    video: "../game/videos/PW.mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "rain",
    title: "Rain - The Beatles",
    video: "../game/videos/RTB(2).mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "darkness",
    title: "Under Cover of Darkness - The Strokes",
    video: "../game/videos/The Strokes - Under Cover of Darkness (Official Video).mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "fake",
    title: "Fake Tales of San Francisco - Arctic Monkeys",
    video: "../game/videos/Arctic Monkeys - Fake Tales Of San Francisco (Official Video).mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "backwards",
    title: "Feels Like We Only Go Backwards - Arctic Monkeys",
    video: "../game/videos/FLWOGB.mp4",
    thumbnail: "../game/images/tv1.webp"
  },
  {
    id: "infinity",
    title: "Infinity Repeating - Daft Punk",
    video: "../game/videos/Daft Punk - Infinity Repeating (2013 Demo) (feat. Julian Casablancas+The Voidz).mp4",
    thumbnail: "../game/images/tv1.webp"
  }
];

// Load the TVs dynamically
function loadTVStrips() {
  const container = document.getElementById("video-tv-strip");
  videoSongs.forEach(song => {
    const div = document.createElement("div");
    div.className = "tv-container";

    div.innerHTML = `
      <video class="tv-video" preload="metadata" playsinline>
        <source src="${song.video}#t=5,15" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src="${song.thumbnail}" class="tv-image" alt="TV" />
      <a href="../game/index.html?song=${song.id}" class="tv-click-layer" aria-label="${song.title}"></a>
      <a href="../game/index.html?song=${song.id}" class="tv-label">${song.title}</a>
    `;

    container.appendChild(div);
  });

  // Add hover playback
  document.querySelectorAll('.tv-container').forEach(container => {
    const video = container.querySelector('.tv-video');
    container.addEventListener('mouseenter', () => {
      video.currentTime = 5; // start later
      video.play();
    });
    container.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 5;
    });
  });
}

document.addEventListener("DOMContentLoaded", loadTVStrips);

  