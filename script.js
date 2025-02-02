// Get references to the DOM elements
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load saved notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note-item");

        // Title of the note
        const noteTitleElement = document.createElement("h3");
        noteTitleElement.textContent = note.title;
        noteTitleElement.onclick = () => toggleContent(noteItem);

        // Content of the note (hidden by default)
        const noteContentElement = document.createElement("p");
        noteContentElement.textContent = note.content;
        noteContentElement.classList.add("note-content");

        // Delete button for the note
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = () => deleteNote(index);

        // Append title, content, and delete button to the note item
        noteItem.appendChild(noteTitleElement);
        noteItem.appendChild(noteContentElement);
        noteItem.appendChild(deleteBtn);

        notesList.appendChild(noteItem);
    });
}

// Toggle visibility of note content(from chat gpt)
function toggleContent(noteItem) {
    const content = noteItem.querySelector(".note-content");
    content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
}

// Add a new note
function addNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
// help of chat gpt 
    if (title && content) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push({ title, content });
        localStorage.setItem("notes", JSON.stringify(notes));

        // Reload notes and reset the form
        loadNotes();
        noteTitle.value = "";
        noteContent.value = "";
    }
}

// Delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); // Remove the note at the specified index
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes(); // Reload notes after deletion
}

// Event listener for adding a note
addNoteBtn.addEventListener("click", addNote);

// Load notes when the page loads
window.onload = loadNotes;
