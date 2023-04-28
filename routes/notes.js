const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET route for retrieving notes
notes.get("/", (req, res) => {
    readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post("/", (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`Note added successfully 🚀`);
    } else {
        res.errored("Error in adding note");
    }
});

// DELETE route for removing note
notes.delete("/:id", async (req, res) => {
    const allNotes = await readFromFile("./db/notes.json").then(data => JSON.parse(data));
    const remainingNotesArr = allNotes.filter(note => note.id !== req.params.id)

    writeToFile("./db/notes.json", remainingNotesArr);
    res.status(200).end();
});

module.exports = notes;