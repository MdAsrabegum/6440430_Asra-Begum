// ==============================
// 1. Initialization
// ==============================
console.log("Welcome to the Community Event Portal");

window.addEventListener("DOMContentLoaded", () => {
  alert("Page is fully loaded");
  displayEvents();
  setupGeolocationButton();
  setupClearPreferences();
});

// ==============================
// 2. Event Data
// ==============================
const events = [
  { name: "Art Festival", date: "2025-06-10", seats: 10, category: "Art" },
  { name: "Cleanup Day", date: "2023-01-01", seats: 5, category: "Cleanup" },
  { name: "Book Exchange", date: "2025-07-20", seats: 0, category: "Book" },
  { name: "Food Drive", date: "2025-07-10", seats: 50, category: "Food" },
  { name: "Community Walk", date: "2025-07-10", seats: 50, category: "Walk" }
];

// ==============================
// 3. Display Events
// ==============================
function displayEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = "";

  events.forEach(event => {
    const isUpcoming = new Date(event.date) > new Date();
    const hasSeats = event.seats > 0;

    if (isUpcoming && hasSeats) {
      const li = document.createElement("li");
      li.className = "event-card";
      li.innerHTML = `
        <strong>${event.name}</strong> - ${event.date} (${event.seats} seats left)
        <button onclick="register('${event.name}')">Register</button>
      `;
      list.appendChild(li);
    }
  });

  updateDropdown();
}

// ==============================
// 4. Update Dropdown
// ==============================
function updateDropdown() {
  const dropdown = document.getElementById("eventDropdown");
  if (!dropdown) return;

  dropdown.innerHTML = "<option value=''>Select an event</option>";

  events
    .filter(e => new Date(e.date) > new Date() && e.seats > 0)
    .forEach(e => {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = e.name;
      dropdown.appendChild(option);
    });
}

// ==============================
// 5. Register
// ==============================
function register(eventName) {
  const event = events.find(e => e.name === eventName);
  if (!event || event.seats <= 0) {
    alert("Registration failed. No seats available.");
    return;
  }
  event.seats--;
  alert(`Registered for ${eventName}!`);
  displayEvents();
}

// ==============================
// 6. Constructor + Prototype
// ==============================
function Event(name, date, seats) {
  this.name = name;
  this.date = date;
  this.seats = seats;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

// ==============================
// 7. Arrays & ES6
// ==============================
const eventArray = [
  new Event("Baking Workshop", "2025-06-30", 15),
  new Event("Rock Concert", "2025-07-10", 50)
];

const displayCards = eventArray.map(e => `Event: ${e.name} on ${e.date}`);
console.log(displayCards);

// ==============================
// 8. Keyboard Event
// ==============================
document.addEventListener("keydown", e => {
  if (e.key === "Enter") console.log("Search triggered!");
});

// ==============================
// 9. Form Handling
// ==============================
const form = document.getElementById("regForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = form.querySelector("#username");
    const email = form.querySelector("#email");
    const event = form.querySelector("#eventDropdown");
    const message = document.getElementById("message");

    if (!username.value || !email.value || !event.value) {
      message.textContent = "All fields are required.";
      return;
    }

    submitRegistration({
      name: username.value,
      email: email.value,
      event: event.value
    });
  });
}

// ==============================
// 10. Simulated Async Registration
// ==============================
function submitRegistration(user) {
  const messageBox = document.getElementById("message");
  messageBox.textContent = "Submitting...";

  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        messageBox.textContent = "Registration successful!";
        console.log("Response:", data);
      })
      .catch(err => {
        messageBox.textContent = "Submission error.";
        console.error(err);
      });
  }, 1500);
}

// ==============================
// 11. Geolocation
// ==============================
function setupGeolocationButton() {
  const findBtn = document.getElementById("findNearbyBtn");
  if (!findBtn) return;

  findBtn.addEventListener("click", () => {
    console.log("Locating...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported.");
    }
  });
}

function showPosition(position) {
  const lat = position.coords.latitude.toFixed(5);
  const lon = position.coords.longitude.toFixed(5);
  document.getElementById("locationResult").textContent = `Latitude: ${lat}, Longitude: ${lon}`;
}

function showError(error) {
  const result = document.getElementById("locationResult");
  const messages = {
    1: "Permission denied.",
    2: "Position unavailable.",
    3: "Request timed out."
  };
  result.textContent = messages[error.code] || "Unknown error.";
}

// ==============================
// 12. Clear Preferences
// ==============================
function setupClearPreferences() {
  const clearBtn = document.getElementById("clearBtn");
  if (!clearBtn) return;

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    alert("Preferences cleared.");
    const eventType = document.getElementById("eventType");
    const feeDisplay = document.getElementById("feeDisplay");
    if (eventType) eventType.value = "";
    if (feeDisplay) feeDisplay.textContent = "";
  });
}

// ==============================
// 13. jQuery Enhancements
// ==============================
$(document).ready(function () {
  $("#registerBtn").click(() => alert("jQuery Click!"));

  // Only apply jQuery animation to elements after they're added
  setTimeout(() => {
    $(".event-card").fadeOut(2000);
  }, 5000);
});
