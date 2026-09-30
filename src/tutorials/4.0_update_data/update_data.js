// update_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// PREPARE THE STATEMENT
// Use ? for both the new value and the search condition!
const update_stmt = db.prepare(`
    UPDATE Inventory 
    SET quantity = ? 
    WHERE part_name = ?
`);

// THE VARIABLES
// In a real app, a user might submit a form to update stock levels
const new_quantity = 100;
const target_item = 'Kevlar Vest';

// EXECUTE SECURELY
// CRITICAL RULE: You must pass the variables into .run() in the 
// EXACT same order that the ? placeholders appear in the SQL string!
update_stmt.run(new_quantity, target_item);

console.log("Military Warehouse inventory securely updated!");

db.close();

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

