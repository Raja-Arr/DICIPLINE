let seconds = 24* 60;
let timer;

// START TIMER
function startTimer() {
    clearInterval(timer);
    timer = setInterval(function (){
        if (seconds > 0) {
            seconds--;
            updateTime();
        } else {
            clearInterval(timer);
            alert("Time is up!");
        }
    }, 1000);
}

// Reset Timer
function resetTimer() {
    clearInterval(timer);
    seconds = 24 * 60;
    updateTime();
}
// UPDATE TIMER
function updateTime() {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;

  document.getElementById("time").textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0");
}

// ADD NOTE
function addNote() {
    let text = prompt("Write your note:");
    if (text === null || text.trim() === "") {
        return;
    }
    let note = document.createElement("label");
    note.className = "note-item";
    note.innerHTML = `
        <input type="checkbox" onchange="updateProgress">
        <span>${text}</span>
        <button class="edit-btn" onclick="editNote(this)">
            EDIT
        </button>
    `;
    document.getElementById("notes").appendChild(note);
    updateProgress();
}

// EDIT NOTE 
function editNote(button) { 
  let note = button.parentElement; 
  let textElement = note.querySelector("span"); 
  let newText = prompt("Edit your note:", textElement.textContent); 
  if (newText === null) { 
    return; 
  } 
  if (newText.trim() === "") { 
    return; 
  } 
  textElement.textContent = newText; 
}

// UPDATE PROGRESS
function updateProgress() {
    let checkboxes = document.querySelectorAll(
        ".note-item input[type='checkbox']"
    );
    let total = checkboxes.length;
    let completed = document.querySelectorAll(
        ".note-item input[type='checkbox']:checked"
    ).length;
    if (total === 0) {
        document.getElementById("progress-text").textContent = "0%";
        document.getElementById("progress-fill").style.width = "0%";
        return;
    }
    let progress = Math.round((completed / total) * 100);
    document.getElementById("progress-text").textContent =
        progress + "%";
    document.getElementById("progress-fill").style.width =
        progress + "%";
}
const card = document.querySelector(".note-container");

card.addEventListener("mousemove", function (event) {

    const rect = card.getBoundingClientRect();

    // Posisi mouse di dalam card
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Tentukan titik tengah
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Hitung rotasi
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.01, 1.01, 1.01)
    `;
});
