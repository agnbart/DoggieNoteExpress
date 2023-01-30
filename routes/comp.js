const express = require('express');
const app = express();
const {
    getCompetitions, getCompetition, createCompetition,
} = require('../controllers/competitionsController');

app.use(express.json());

    app.get('/', async (req, res) => {
        const competitions = await getCompetitions();
        res.send(competitions);
})
    app.get('/:id', async (req, res) => {
        const id = req.params.id;
        const competition = await getCompetition(id);
        res.send(competition);
})
    app.post('/', async (req, res) => {
        const {name, place} = req.body;
        const competition = await createCompetition(name, place);
        res.status(201).send(competition);
    })

module.exports = app;