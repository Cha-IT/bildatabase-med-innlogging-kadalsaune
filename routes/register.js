const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
})

router.post('/', async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;

    //const id = Math.floor(Math.random() * 1000000);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    try {
        const existingUser = db.prepare("SELECT id FROM person WHERE epost = ?").get(email);
        if (existingUser) {
            return res.status(400).json({ message: "Eposten er allerede registrert." });
        }
        const stmt = db.prepare("INSERT INTO person (fornavn, etternavn, epost, tlf, passord) VALUES (?, ?, ?, ?, ?)");
        stmt.run(firstname, lastname, email, phone, hashedPassword);
        res.json({ message: "Registrering vellykket. Du kan nå logge inn." });
    } catch (err) {
        console.error(err);
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(400).json({ message: "Eposten er allerede registrert." });
        } else {
            res.status(500).json({ message: "En feil oppstod under registrering." });
        }
    }
});

module.exports = router;