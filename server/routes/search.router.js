const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const searchParams = req.query.search
    const queryText = `SELECT * FROM "games" WHERE "game_title" LIKE '%${searchParams}%`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;