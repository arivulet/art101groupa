// darkmode.js
document.addEventListener("DOMContentLoaded", () => {
	const toggleBtn = document.getElementById("daynite");
  
	// Check localStorage for saved theme
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "dark") {
	  document.body.classList.add("darkmode");
	}
  
	toggleBtn.addEventListener("click", () => {
	  const isDark = document.body.classList.toggle("darkmode");
	  localStorage.setItem("theme", isDark ? "dark" : "light");
	});
  });
  