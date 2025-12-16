const Database = require('better-sqlite3');
const db = new Database('bil.db');
try {
    const stmt = db.prepare("PRAGMA table_info(person)");
    const info = stmt.all();
    console.log(info);
} catch (error) {
    console.error(error);
}
