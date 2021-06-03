const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('Body:', req.body.note);
    console.log('params:', req.body.id);
    console.log('User id:', req.user.id);
   
    const queryText = `UPDATE "user_games" SET "note" = $1
    WHERE user_games.game_id = $2 AND user_games.user_id = $3;`;
    pool.query(queryText, [req.body.note, req.body.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error with adding a note', error);
            res.sendStatus(500);
        })
 })

 module.exports = router;