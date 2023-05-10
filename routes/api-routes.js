const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

router.get('/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
    res.json(dbJson);
});

router.post('/notes', (req, res) => {
    console.log('Request body:', req.body);
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
    console.log('Existing notes:', dbJson);
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    console.log('New note:', newNote);
    dbJson.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    console.log('Notes after adding new note:', dbJson);
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
    const updatedNotes = dbJson.filter((note) => note.id !== req.params.id);
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotes));
    res.json({ message: 'Note deleted.' });
});

module.exports = router;