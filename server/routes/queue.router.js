const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log(req.user.id);
    const queryText = `SELECT game_title, image_url, user_id, game_id, note, is_complete, play_time, platform, is_hidden FROM "games" 
    JOIN "user_games" ON "user_games".game_id = "games".id
    WHERE user_id = ${req.user.id};`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting user games', error);
            res.sendStatus(500);
        })
})

module.exports = router;