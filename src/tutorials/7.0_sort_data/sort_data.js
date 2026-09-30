// sort_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// THE VARIABLES
// In a real app, these come from a user clicking a column header in the UI
const user_sort_column = 'quantity';
const user_sort_direction = 'ASC';

// THE WHITELIST (SECURITY CHECK)
// We explicitly define exactly what words are allowed in our SQL
const allowed_columns = ['id', 'part_name', 'quantity', 'price'];
const allowed_directions = ['ASC', 'DESC'];

// If the user's input isn't in our allowed list, we force a safe default
const safe_column = allowed_columns.includes(user_sort_column) ? user_sort_column : 'quantity';
const safe_direction = allowed_directions.includes(user_sort_direction.toUpperCase()) ? user_sort_direction.toUpperCase() : 'ASC';

// SECURE STRING TEMPLATING
// Because we sanitized the variables through our whitelist, 
// it is now 100% safe to inject them directly into the SQL string!
const sql_sort = `
    SELECT part_name, quantity, price 
    FROM Inventory 
    ORDER BY ${safe_column} ${safe_direction};
`;

const stmt = db.prepare(sql_sort);
const results = stmt.all(); // No variables passed here for sorting!

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

