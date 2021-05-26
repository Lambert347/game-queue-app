const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



router.get('/', (req, res) => {
    const query = `SELECT * FROM "games";`;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting games', error);
            res.sendStatus(500);
        })
})

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    const newGame = req.body;
    const creator_id = req.user.id;
    console.log(newGame);
    console.log(creator_id);

    const queryText = `INSERT INTO "games" ("game_title", "play_time", "developer", "description", "publisher", "image_url", "platform", "creator_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

    pool.query(queryText, [newGame.game_title, newGame.play_time, newGame.developer, newGame.description, newGame.publisher, newGame.image_url, newGame.platform, creator_id])
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('Error with adding a game', error);
            res.sendStatus(500);
        })
})

module.exports = router;