// update_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to UPDATE existing data
const sql_update = `
UPDATE Inventory 
SET quantity = 100 
WHERE part_name = 'Kevlar Vest';
`;

// Execute the change - no commit needed, writes immediately
db.exec(sql_update);

console.log("Military Warehouse inventory updated successfully!");

db.close();

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

