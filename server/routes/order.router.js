const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.put('/', rejectUnauthenticated, async (req, res) => {
    const userToUpdate = req.user.id;
    
    const newQueue = req.body;
    console.log('Checking queue:', newQueue);
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        Promise.all(newQueue.map(game => {
            console.log('Checking Game id:', game.game_id);
            console.log('Checking game.id:', game.id);
            const queryText = `UPDATE user_games SET order_number = $1 WHERE game_id = $2 AND user_id = $3;`;
            const queryValues = [game.order_number, game.game_id, userToUpdate];
            pool.query(queryText, queryValues);
        }));
        await client.query('COMMIT')
        res.sendStatus(200);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error with editing order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;