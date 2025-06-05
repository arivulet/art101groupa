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
  