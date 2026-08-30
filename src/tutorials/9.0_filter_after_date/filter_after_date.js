// filter_after_date.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// NOTE: no DROP TABLE / CREATE TABLE / INSERT here --
// this assumes seed_data_uniform.js has already been run
// and Inventory is already populated with the 10 items.

// The dynamic date we want to filter by
const target_date = '2026-01-01';

// SQL command to find everything delivered AFTER the target date
const sql_filter = "SELECT part_name, quantity, delivery_date FROM Inventory WHERE delivery_date > ?;";

const stmt = db.prepare(sql_filter);
const results = stmt.all(target_date);

console.log(`--- SHIPMENTS RECEIVED AFTER ${target_date} ---`);
for (const row of results) {
    console.log(`Item: ${row.part_name} | Stock: ${row.quantity} | Delivered: ${row.delivery_date}`);
}

db.close();

/*
--- SHIPMENTS RECEIVED AFTER 2026-01-01 ---
Item: Night Vision Goggles | Stock: 45 | Delivered: 2026-02-10
Item: Field Medical Kit | Stock: 300 | Delivered: 2026-08-24
Item: Combat Boots | Stock: 220 | Delivered: 2026-01-05
Item: MRE Case | Stock: 500 | Delivered: 2026-03-22
Item: Ammunition Crate | Stock: 80 | Delivered: 2026-01-30
Item: First Aid Pouch | Stock: 175 | Delivered: 2026-02-14
Item: Camouflage Netting | Stock: 95 | Delivered: 2026-04-02
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting

