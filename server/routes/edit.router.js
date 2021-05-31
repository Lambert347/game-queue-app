const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id);
    const queryText = `UPDATE "user_games" SET "is_complete"=true 
    WHERE user_games.game_id=$1 AND user_games.user_id=$2;`;
    pool.query(queryText, [req.params.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error with editing game', error);
            res.sendStatus(500);
        })
});