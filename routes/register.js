const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.post('/', async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const id = Math.floor(Math.random() * 1000000);

    try {
        const exisitingUser = db.prepare("SELECT id FROM person WHERE epost = ?").get(email);
        if (exisitingUser) {
            return res.status(400).json({ message: "Epost er allerede i bruk." });
        }
        const stmt = db.prepare("INSERT INTO person (id, etternavn, fornavn, epost, tlf, passord) VALUES (?, ?, ?, ?, ?, ?)");
        stmt.run(id, lastname, firstname, email, phone, hashedPassword);
        res.json({ message: "Registrering vellykket. Du kan nå logge inn." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Noe gikk galt under registreringen." });
    }
});



module.exports = router;