// insert_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to INSERT data
const sql_insert = `
INSERT INTO Inventory (part_name, quantity, price) 
VALUES 
    ('Night Vision Goggles', 45, 2500.00),
    ('Kevlar Vest', 150, 450.50),
    ('Field Medical Kit', 300, 75.25);
`;

db.exec(sql_insert);
// No commit needed -- writes to disk immediately, as covered earlier

db.close();

console.log("Military Warehouse data inserted successfully!");

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

