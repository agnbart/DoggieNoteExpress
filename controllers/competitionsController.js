const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getCompetitions() {
    const [rows] = await pool.query("Select * from Competitions");
    return rows
}

async function getCompetition(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Competitions
    WHERE CompetitionId = ?
    `,[id])
    return (rows[0]);
}

async function createCompetition(name,place) {
    const [result] = await pool.query(
        `INSERT INTO Competitions (name, place)
        VALUES(?,?)`, [name, place])
    const id = result.insertId;
    return getCompetition(id);
}

async function deleteCompetition(id) {
    const [rows] = await pool.query(
        `DELETE FROM Competitions
        WHERE CompetitionId = ?`, [id])
    return rows;
}

async function updateCompetition(name, id) {
    const [result] = await pool.query(
        `UPDATE Competitions
        SET Name = ?
        WHERE CompetitionId = ?`, [name, id])
    return result;
}

module.exports = {
    getCompetitions,
    getCompetition,
    createCompetition,
    deleteCompetition,
    updateCompetition,
}