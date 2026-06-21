// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

function getWinningTeamName() {
  const waterCount = parseInt(
    document.getElementById("waterCount").textContent,
  );
  const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
  const powerCount = parseInt(
    document.getElementById("powerCount").textContent,
  );

  if (waterCount >= zeroCount && waterCount >= powerCount) {
    return "Team Water Wise";
  }

  if (zeroCount >= waterCount && zeroCount >= powerCount) {
    return "Team Net Zero";
  }

  return "Team Renewables";
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Increment count
  count++;
  console.log("Total check-ins: ", count);

  // Update attendance display
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const greeting = document.getElementById("greeting");

  if (count >= maxCount) {
    const winningTeamName = getWinningTeamName();
    greeting.innerHTML = `Congratulations! The check-in goal is complete. ${winningTeamName} takes the win!`;
  } else {
    const message = `Hello, ${name}! You're checked in with ${teamName}.`;
    greeting.textContent = message;
  }

  form.reset();
});
