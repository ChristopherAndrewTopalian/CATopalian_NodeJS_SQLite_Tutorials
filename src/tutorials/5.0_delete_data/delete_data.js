// delete_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// PREPARE THE STATEMENT
// Use ? to safely target the exact item to delete
const delete_stmt = db.prepare(`
    DELETE FROM Inventory 
    WHERE part_name = ?
`);

// THE TARGET VARIABLE
// In a real app, this comes from a user clicking a "Delete" button in the UI
const target_item = 'Night Vision Goggles';

// EXECUTE SECURELY
// Pass the variable into .run() to safely bind it to the ?
delete_stmt.run(target_item);

console.log("Item securely deleted from the Military Warehouse database!");

db.close();

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

