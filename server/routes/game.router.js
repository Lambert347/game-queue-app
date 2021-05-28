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

router.get('/:id', (req, res) => {
    const details = req.params.id;
    console.log(details);

    const queryText = `SELECT * FROM "games" 
    JOIN "genres_id" ON genres_id.game_id = games.id
    JOIN "genres" ON genres.id = genres_id.genres_id
    WHERE games.id=$1;`;
    pool.query(queryText, [details])
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error with getting details for game', error);
        res.sendStatus(500);
    })
});



router.post('/', (req, res) => {
    const newGame = req.body;
    const creator_id = req.user.id;
    console.log(newGame);
    console.log(creator_id);

    const queryText = `INSERT INTO "games" ("game_title", "play_time", "developer", "description", "publisher", "image_url", "platform", "creator_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING "id";`;

    pool.query(queryText, [newGame.game_title, newGame.play_time, newGame.developer, newGame.description, newGame.publisher, newGame.image_url, newGame.platform, creator_id])
        .then(result => {
            console.log('New Game id:', result.rows[0].id);
            const gameId = result.rows[0].id;
            const queryGenreText = `INSERT INTO "genres_id" ("game_id", "genres_id")
            VALUES ($1, $2);`;

            pool.query(queryGenreText, [gameId, req.body.genre]).then(result => {
                res.sendStatus(201);
            }).catch(error => {
                console.log('Error with adding genres_id', error);
                res.sendStatus(500);
            })
        }).catch(error =>{
            console.log('Error with adding game', error);
            result.sendStatus(500);
        })
})

module.exports = router;