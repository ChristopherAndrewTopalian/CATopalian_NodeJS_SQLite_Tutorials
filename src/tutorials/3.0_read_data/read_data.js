// read_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// PREPARE THE STATEMENT
// Use ? for the filter condition!
const sql_select = "SELECT part_name, price FROM Inventory WHERE quantity > ?;";
const stmt = db.prepare(sql_select);

// THE FILTER VARIABLE
// In a real app, this would come from a user's UI slider or input box
const min_quantity = 100;

// EXECUTE SECURELY
// Pass the variable into .all() to safely bind it to the ?
const results = stmt.all(min_quantity);

// Loop through the results
for (const row of results)
{
    console.log(`Item: ${row.part_name} | Price: $${row.price}`);
}

db.close();

/*
Item: Kevlar Vest | Price: $450.5
Item: Field Medical Kit | Price: $75.25
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

