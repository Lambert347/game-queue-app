const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gameRouter = require('./routes/game.router');
const queueRouter = require('./routes/queue.router');
const searchRouter = require('./routes/search.router');
const genreRouter = require('./routes/genre.router');
const editRouter = require('./routes/edit.router');
const noteRouter = require('./routes/note.router');
const orderRouter = require('./routes/order.router');
const endRouter = require('./routes/end.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/user_games', queueRouter);
app.use('/api/search', searchRouter);
app.use('/api/genres', genreRouter);
app.use('/api/edit', editRouter);
app.use('/api/note', noteRouter);
app.use('/api/order', orderRouter);
app.use('/api/end', endRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
