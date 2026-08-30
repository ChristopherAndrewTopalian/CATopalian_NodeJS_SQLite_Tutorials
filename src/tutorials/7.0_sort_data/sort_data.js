// sort_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to SELECT data and sort it
const sql_sort = "SELECT part_name, quantity, price FROM Inventory ORDER BY quantity ASC;";

// Prepare and fetch the results
const stmt = db.prepare(sql_sort);
const results = stmt.all();

console.log("CRITICAL REORDER LIST (LOWEST STOCK FIRST)");
for (const row of results) {
    console.log(`Item: ${row.part_name} | Stock: ${row.quantity} | Unit Cost: $${row.price}`);
}

db.close();

/*
CRITICAL REORDER LIST (LOWEST STOCK FIRST)
Item: Kevlar Vest | Stock: 100 | Unit Cost: $450.5
Item: Field Medical Kit | Stock: 300 | Unit Cost: $75.25
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

