const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


  router.put('/:id', rejectUnauthenticated, (req, res) => {
      console.log(req.body);
      const game = req.body.game_id
      const user = req.user.id
      const queryText = `UPDATE user_games SET order_number = 1000 WHERE game_id = $1 AND user_id = $2;`;

      pool.query(queryText, [game, user])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error with editing game', error);
            res.sendStatus(500);
        })
  });

  module.exports = router;