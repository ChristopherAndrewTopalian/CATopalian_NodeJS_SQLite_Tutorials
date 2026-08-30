// delete_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to DELETE existing data
const sql_delete = `
DELETE FROM Inventory 
WHERE part_name = 'Night Vision Goggles';
`;

// Execute the change - no commit needed, writes immediately
db.exec(sql_delete);

console.log("Item successfully deleted from the Military Warehouse database!");

db.close();

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

