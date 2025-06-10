// Array of video songs
const videoSongs = [
	{
		id: "feeling",
		title: "I've Got A Feeling - The Beatles",
		video:
			"../game/videos/I'VE A GOT A FEELING TAKE 1 ｜ THE BEATLES ROOFTOP CONCERT.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 90.9,
	},

	{
		id: "darkness",
		title: "Under Cover of Darkness - The Strokes",
		video: "../game/videos/UCOD.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 46.3,
	},
	{
		id: "Save a Prayer",
		title: "Save a Prayer - Duran Duran",
		video:
			"../game/videos/Duran Duran - Save A Prayer (Official Music Video).mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 62.1,
	},
	{
		id: "backwards",
		title: "Feels Like We Only Go Backwards - Arctic Monkeys",
		video: "../game/videos/FLWOGB.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 117,
	},
	{
		id: "forget",
		title: "Forget Her - Jeff Buckley",
		video: "../game/videos/FHJB.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 39.2,
	},
	{
		id: "paperback",
		title: "Paperback Writer - The Beatles",
		video: "../game/videos/PW.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 80.7,
	},

	{
		id: "rain",
		title: "Rain - The Beatles",
		video: "../game/videos/RTB(2).mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 123.2,
	},
	{
		id: "fake",
		title: "Fake Tales of San Francisco - Arctic Monkeys",
		video: "../game/videos/FTOSF.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 71.2,
	},
	{
		id: "infinity",
		title:
			"Infinity Repeating - Daft Punk feat. Julian Casablancas + The Voidz",
		video: "../game/videos/IF.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 136.7,
	},
	{
		id: "smile",
		title: "Die With a Smile - Bruno Mars, Lady Gaga",
		video: "../game/videos/dwas.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 122.2,
	},
	{
		id: "ego",
		title: "WHY WE FIGHT // EGO ft.Qing Madi",
		video: "../game/videos/why we fight.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 193.3,
	},
	{
		id: "lucy",
		title: "I Really Want to Stay At Your House - Rosa Walton",
		video: "../game/videos/lucy.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 175.3,
	},
	{
		id: "everybody",
		title: "Everybody Here Wants You - Jeff Buckley",
		video: "../game/videos/ehwy.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 34,
	},
	{
		id: "posingin",
		title: "Posing In Bondage - Japanese Breakfast",
		video: "../game/videos/posinginbondage.mp4",
		thumbnail: "../game/images/tv1.webp",
		startTime: 14,
	},
];

function loadTVStrips() {
	const container = document.getElementById("video-tv-strip");
	container.innerHTML = "";
	videoSongs.forEach((song) => {
		const div = document.createElement("div");
		div.className = "tv-container";
		div.innerHTML = `
		<video class="tv-video" preload="metadata" playsinline data-start="${
			song.startTime || 0
		}">
		  <source src="${song.video}" type="video/mp4" />
		  Your browser does not support the video tag.
		</video>
		<img src="${song.thumbnail}" class="tv-image" alt="TV" />
		<a href="../game/index.html?song=${
			song.id
		}" class="tv-click-layer" aria-label="${song.title}"></a>
		<a href="../game/index.html?song=${song.id}" class="tv-label">${song.title}</a>
	  `;
		container.appendChild(div);
	});

	// Setup video hover interaction
	document.querySelectorAll(".tv-container").forEach((container) => {
		const video = container.querySelector(".tv-video");
		const startTime = parseFloat(video.dataset.start) || 0;
		let isHovering = false;
		let hasSeeked = false;

		video.style.visibility = "hidden";

		video.addEventListener("loadedmetadata", () => {
			video.currentTime = startTime;
		});

		video.addEventListener("seeked", () => {
			video.style.visibility = "visible";
			hasSeeked = true;
		});

		container.addEventListener("mouseenter", () => {
			isHovering = true;
			if (video.readyState >= 1 && hasSeeked) {
				video
					.play()
					.catch((err) => console.warn("Autoplay error:", err.message));
			} else {
				video.addEventListener(
					"seeked",
					() => {
						if (isHovering)
							video
								.play()
								.catch((err) =>
									console.warn("Autoplay error (delayed):", err.message)
								);
					},
					{ once: true }
				);
			}
		});

		container.addEventListener("mouseleave", () => {
			isHovering = false;
			video.pause();
			video.currentTime = startTime;
			video.style.visibility = "hidden";
			hasSeeked = false;
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	loadTVStrips();
	loadAudioAlbums(); // assume songs is already defined
});

function loadAudioAlbums() {
	const container = document.getElementById("audio-album-strip");
	container.innerHTML = "";

	if (!window.songs || !Array.isArray(window.songs)) {
		console.warn("No songs array found.");
		return;
	}

	const audioSongs = window.songs.filter(
		(song) => song.file?.endsWith(".mp3") && song.photo
	);

	audioSongs.forEach((song) => {
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
					audio
						.play()
						.catch((err) =>
							console.warn(`Audio play failed for ${song.title}:`, err.message)
						);
				};

				const onSeeked = () => {
					audio.removeEventListener("seeked", onSeeked);
					tryPlay();
				};

				audio.removeEventListener("seeked", onSeeked); // prevent duplicates
				audio.addEventListener("seeked", onSeeked);
			};

			if (audio.readyState >= 1) {
				handlePlay();
			} else {
				audio.addEventListener("loadeddata", handlePlay, { once: true });
			}

			wrapper.addEventListener(
				"mouseleave",
				() => {
					isHovering = false;
					audio.pause();
					audio.currentTime = 0;
				},
				{ once: true }
			);
		});

		wrapper.addEventListener("mouseleave", () => {
			audio.pause();
			audio.currentTime = 0;
		});
	});
}

// ✅ Restore after back navigation
window.addEventListener("pageshow", (event) => {
	if (
		event.persisted ||
		performance.getEntriesByType("navigation")[0].type === "back_forward"
	) {
		console.log("Restoring previews...");
		loadTVStrips();
		loadAudioAlbums();
	}
});
