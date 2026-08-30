// seed_data_uniform.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// Recreate the table so we start clean
db.exec("DROP TABLE IF EXISTS Inventory");
db.exec(`
CREATE TABLE IF NOT EXISTS Inventory (
    id INTEGER PRIMARY KEY,
    part_name TEXT,
    quantity INTEGER,
    delivery_date TEXT
);
`);

// Same 10 items as the Python version, every date normalized
// to ISO format (YYYY-MM-DD) -- uniform text that sorts and
// compares correctly with plain SQL.
db.exec(`
INSERT INTO Inventory (part_name, quantity, delivery_date) 
VALUES 
    ('Kevlar Vest', 150, '2025-11-15'),
    ('Night Vision Goggles', 45, '2026-02-10'),
    ('Field Medical Kit', 300, '2026-08-24'),
    ('Combat Boots', 220, '2026-01-05'),
    ('Tactical Radio', 60, '2025-12-01'),
    ('MRE Case', 500, '2026-03-22'),
    ('Ammunition Crate', 80, '2026-01-30'),
    ('First Aid Pouch', 175, '2026-02-14'),
    ('Portable Generator', 12, '2025-10-09'),
    ('Camouflage Netting', 95, '2026-04-02');
`);

console.log("Military Warehouse inventory seeded with 10 uniform-date items successfully!");

db.close();

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

