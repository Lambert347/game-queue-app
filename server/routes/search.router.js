const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const searchParams = req.query.search;
    const genreParams = req.query.genre;

    console.log(searchParams);
    console.log(genreParams);

    if (searchParams !== '' && genreParams !== '') {
        const queryText = `SELECT * FROM "games" 
        JOIN "genres_id" ON genres_id.game_id = games.id
        JOIN "genres" ON genres.id = genres_id.genres_id
        WHERE "game_title"
        LIKE '%${searchParams}%' AND "genre_name"
        LIKE '%${genreParams}%';`;
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('Error with search', error);
        })
    }
    else if (searchParams !== '' && genreParams === '') {
        const queryText = `SELECT * FROM "games" 
        JOIN "genres_id" ON genres_id.game_id = games.id
        JOIN "genres" ON genres.id = genres_id.genres_id
        WHERE "game_title"
        LIKE '%${searchParams}%';`;
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('Error with search', error);
        })
    }
    else if (searchParams === '' && genreParams !== '') {
        const queryText = `SELECT * FROM "games" 
        JOIN "genres_id" ON genres_id.game_id = games.id
        JOIN "genres" ON genres.id = genres_id.genres_id
        WHERE "genre_name"
        LIKE '%${genreParams}%';`;
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('Error with search', error);
        })
    }

   
    
})

module.exports = router;