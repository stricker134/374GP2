const sqlite3 = require('sqlite3');

let sqlite = new sqlite3.Database('./db/savoyDB.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error(err.message);
	} else console.log('Connected to DB');
});

module.exports = sqlite;