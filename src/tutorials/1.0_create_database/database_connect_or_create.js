// database_connect_or_create.js

const { DatabaseSync } = require('node:sqlite');

// Connect to the database (it creates the file automatically if it doesn't exist)
const db = new DatabaseSync('military_warehouse.db');

// SQL command to CREATE a table named Inventory
const sql_command = `
CREATE TABLE IF NOT EXISTS Inventory (
    id INTEGER PRIMARY KEY,
    part_name TEXT,
    quantity INTEGER,
    price REAL
);
`;
// REAL is a data type for a floating point number, aka decimal numbers.

// Execute directly on the database object -- no cursor needed
db.exec(sql_command);

db.close();

console.log("Military Warehouse Database and Table created successfully!");

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

