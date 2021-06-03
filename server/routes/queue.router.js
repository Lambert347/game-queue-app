const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT game_title, image_url, user_id, game_id, note, is_complete, play_time, platform, is_hidden, description, user_games.id, order_number
    FROM "games" 
    JOIN "user_games" ON "user_games".game_id = "games".id
    WHERE user_id = ${req.user.id}
    ORDER BY user_games.order_number ASC;`

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting user games', error);
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const game = req.body.game_id;
    const user_id = req.user.id;
    const queryText = `INSERT INTO "user_games" ("user_id", "game_id")
    VALUES ($1, $2 )
    RETURNING "id";`;

    pool.query(queryText, [user_id, game])
        .then(result => {
            console.log('New queue item id:', result.rows[0].id);
            const order = result.rows[0].id;
            const queryOrderText = `UPDATE "user_games" SET "order_number" = $1;`;
            pool.query(queryOrderText, [order]).then(result => {
                res.sendStatus(201);
            }).catch(error => {
                console.log('Error with updating order in add', error)
                res.sendStatus(500);
            })
        })
        // .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('Error with adding a game', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', rejectUnauthenticated,(req, res) => {
    console.log(req.params.id);
    console.log(req.user.id);

    const queryText = `DELETE FROM "user_games" WHERE user_id = ${req.user.id} AND game_id = ${req.params.id};`;
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
})

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



module.exports = router;