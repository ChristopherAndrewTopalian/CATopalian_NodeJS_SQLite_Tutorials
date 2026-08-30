# CODE BOOK

---

## Section: 1.0_create_database

### `database_connect_or_create.js`

```javascript
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
```

---

## Section: 2.0_insert_data

### `insert_data.js`

```javascript
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
// No commit needed -- writes to disk immediately

db.close();

console.log("Military Warehouse data inserted successfully!");

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting
```

---

## Section: 3.0_read_data

### `read_data.js`

```javascript
// read_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to SELECT data
const sql_select = "SELECT part_name, price FROM Inventory WHERE quantity > 100;";

// Prepare and fetch the results
const stmt = db.prepare(sql_select);
const results = stmt.all();

// Loop through the results (returned as plain JS objects)
for (const row of results)
{
    console.log(`Item: ${row.part_name} | Price: $${row.price}`);
}

db.close();

/*
Item: Kevlar Vest | Price: $450.5
Item: Field Medical Kit | Price: $75.25
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting
```

---

## Section: 4.0_update_data

### `update_data.js`

```javascript
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
```

---

## Section: 5.0_delete_data

### `delete_data.js`

```javascript
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
```

---

## Section: 6.0_search_data

### `search_data.js`

```javascript
// search_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The dynamic variable we want to search for
const search_term = 'Field Medical Kit';

// The SQL command using a '?' placeholder for safety
const sql_search = "SELECT part_name, quantity, price FROM Inventory WHERE part_name = ?;";

// Prepare the statement, then run it, passing our variable directly (no tuple needed)
const stmt = db.prepare(sql_search);
const results = stmt.all(search_term);

console.log(`SEARCH RESULTS FOR: ${search_term.toUpperCase()}`);

for (const row of results)
{
    console.log(`Item: ${row.part_name} | Stock: ${row.quantity} | Price: $${row.price}`);
}

if (results.length === 0)
{
    console.log("Item not found in the warehouse.");
}

db.close();

/*
SEARCH RESULTS FOR: FIELD MEDICAL KIT
Item: Field Medical Kit | Stock: 300 | Price: $75.25
*/

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherAndrewTopalian
// https://github.com/ChristopherTopalian
// https://sites.google.com/view/CollegeOfScripting
```

---

## Section: 7.0_sort_data

### `sort_data.js`

```javascript
// sort_data.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The SQL command to SELECT data and sort it
const sql_sort = "SELECT part_name, quantity, price FROM Inventory ORDER BY quantity ASC;";

// Prepare and fetch the results
const stmt = db.prepare(sql_sort);
const results = stmt.all();

console.log("CRITICAL REORDER LIST (LOWEST STOCK FIRST)");

for (const row of results)
{
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
```

---

## Section: 8.0_seed_data_uniform

### `seed_data_uniform.js`

```javascript
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

// every date normalized
// to ISO format (YYYY-MM-DD) - uniform text that sorts and
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
```

---

## Section: 9.0_filter_after_date

### `filter_after_date.js`

```javascript
// filter_after_date.js

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('military_warehouse.db');

// The dynamic date we want to filter by
const target_date = '2026-01-01';

// SQL command to find everything delivered AFTER the target date
const sql_filter = "SELECT part_name, quantity, delivery_date FROM Inventory WHERE delivery_date > ?;";

const stmt = db.prepare(sql_filter);
const results = stmt.all(target_date);

console.log(`SHIPMENTS RECEIVED AFTER ${target_date}`);

for (const row of results)
{
    console.log(`Item: ${row.part_name} | Stock: ${row.quantity} | Delivered: ${row.delivery_date}`);
}

db.close();

/*
SHIPMENTS RECEIVED AFTER 2026-01-01
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
```

---
