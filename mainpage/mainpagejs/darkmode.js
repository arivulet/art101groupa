function toggleDarkMode() {
	$("body").toggleClass("darkmode");

	// Save preference in localStorage
	const isDarkMode = $("body").hasClass("darkmode");
	localStorage.setItem("darkMode", isDarkMode);
}

// Check for saved preference on page load
function checkDarkModePreference() {
	const savedDarkMode = localStorage.getItem("darkMode") === "true";
	if (savedDarkMode) {
		$("body").addClass("darkmode");
	}
}

// Initialize when the DOM is fully loaded
$(document).ready(function () {
	checkDarkModePreference();

	// Bind the toggle function to a button click
	$("#daynite").click(toggleDarkMode);
});
