/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  //const params = url.parse(process.env.DATABASE_URL);
  const password = process.env.PGPASSWORD;
  const user = process.env.POSTGRES_USER;
  const database = process.env.PGDATABASE;
  const port = process.env.PGPORT;
  const host = process.env.PGHOST;
  //params.auth.split(':');

  config = {
    user: user,
    password: password,
    host: host,
    port: port,
    database: database,
    ssl: { rejectUnauthorized: false },
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
// } else {
//   config = {
//     host: '', // Server hosting the postgres database
//     port: '', // env var: PGPORT 
//     database: '', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
