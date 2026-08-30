// search_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The dynamic variable we want to search for
const search_term = 'Field Medical Kit';

// The SQL command using a '?' placeholder for safety
const sql_search = "SELECT part_name, quantity, price FROM Inventory WHERE part_name = ?;";

// Prepare the statement, then run it, passing our variable directly (no tuple needed)
const stmt = db.prepare(sql_search);
const results = stmt.all(search_term);

console.log(`SEARCH RESULTS FOR: ${search_term.toUpperCase()}`);
for (const row of results) {
    console.log(`Item: ${row.part_name} | Stock: ${row.quantity} | Price: $${row.price}`);
}

if (results.length === 0) {
    console.log("Item not found in the warehouse.");
}

db.close();

/*
SEARCH RESULTS FOR: FIELD MEDICAL KIT
Item: Field Medical Kit | Stock: 300 | Price: $75.25
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

