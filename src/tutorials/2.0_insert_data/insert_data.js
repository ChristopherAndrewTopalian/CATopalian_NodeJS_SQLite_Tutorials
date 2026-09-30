// insert_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// PREPARE THE STATEMENT
// Use ? as placeholders for the actual data
const insert_stmt = db.prepare(`
    INSERT INTO Inventory (part_name, quantity, price) 
    VALUES (?, ?, ?)
`);

// THE DATA
// In a real app, this would come from a user interface or an API
const new_inventory = [
    ['Night Vision Goggles', 45, 2500.00],
    ['Kevlar Vest', 150, 450.50],
    ['Field Medical Kit', 300, 75.25]
];

// EXECUTE SECURELY
// Loop through the array and bind the variables to the ? placeholders
for (const item of new_inventory) {
    insert_stmt.run(item[0], item[1], item[2]);
}

db.close();

console.log("Military Warehouse data securely inserted!");

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

