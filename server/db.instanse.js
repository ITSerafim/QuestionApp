const sqlite = require('sqlite3').verbose();

module.exports = new sqlite.Database(`${process.env.DB_PATH}.sqlite`);

