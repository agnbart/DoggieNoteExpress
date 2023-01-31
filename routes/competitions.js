const express = require('express');
const {
    getCompetitions,
    getCompetition,
    createCompetition,
    deleteCompetition,
    updateCompetition
} = require('../controllers/competitionsController');

const competitionsRouter = express.Router();

competitionsRouter
.get('/', async (req, res) => {
        const competitions = await getCompetitions();
        res.send(competitions);
    })
    .get('/:id', async (req, res) => {
        const id = req.params.id;
        const competition = await getCompetition(id);
        res.send(competition);
    })

    .post('/', async (req, res) => {
        const {name, place} = req.body;
        const competition = await createCompetition(name, place);
        res.status(201).send(competition);
    })

    .delete('/:id', async (req, res) => {
        const id = req.params.id;
        const competition = await deleteCompetition(id);
        res.status(200).send(competition);
    })

    .put('/:id', async (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const competition = await updateCompetition(name, id)
        res.status(200).send(id)
    })

module.exports = {
    competitionsRouter,
}