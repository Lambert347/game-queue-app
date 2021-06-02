const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.put('/', async (req, res) => {
    const userToUpdate = req.user.id;
    
    const newQueue = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        Promise.all(newQueue.map(game => {
            const queryText = `UPDATE user_games SET id = $1 WHERE game_id = $2 AND user_id = $3;`;
            const queryValues = [game.id, game.game_id, userToUpdate];
            pool.query(queryText, queryValues);
        }));
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error with editing order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
    
    
    // const queryText = `UPDATE user_games SET game_id = $3 WHERE user_games.id = $1 AND user_id = $2;`;

    
    
    // pool.query(queryText, [newQueue.game_id, newQueue.id, userToUpdate])
    // .then(result => {
    //     res.sendStatus(200);
    // })
    // .catch((error) => {
    //     console.log('Error with updating database for user queue', error);
    //     res.sendStatus(500);
    // })
});

module.exports = router;