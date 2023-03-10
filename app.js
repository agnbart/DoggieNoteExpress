const express = require('express');
const {competitionsRouter} = require("./routes/competitions");

require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/competitions', competitionsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000,'localhost',() => {
    console.log(`Server running on 3000`);
})