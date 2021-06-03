const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM genres ORDER BY genre_name ASC;`;
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error on getting genres', error);
            res.sendStatus(500);
        });
});

module.exports = router;