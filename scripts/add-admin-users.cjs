const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  console.log("Connected to database. Generating password hashes...");

  const hashDrGpr = await bcrypt.hash("9396653566", 12);
  const hashSeshu = await bcrypt.hash("92466 15282", 12);

  // 1. drgrpkrishna
  const check1 = await pool.query(
    "SELECT id FROM nifs.users WHERE name = $1 OR email = $2",
    ["drgrpkrishna", "drgrpkrishna@nifsindia.net"]
  );
  if (check1.rows.length === 0) {
    await pool.query(
      "INSERT INTO nifs.users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
      ["drgrpkrishna", "drgrpkrishna@nifsindia.net", hashDrGpr, "admin"]
    );
    console.log("Created admin user: drgrpkrishna");
  } else {
    await pool.query(
      "UPDATE nifs.users SET password_hash = $1, role = $2 WHERE id = $3",
      [hashDrGpr, "admin", check1.rows[0].id]
    );
    console.log("Updated admin user: drgrpkrishna");
  }

  // 2. seshu
  const check2 = await pool.query(
    "SELECT id FROM nifs.users WHERE name = $1 OR email = $2",
    ["seshu", "seshu@nifsindia.net"]
  );
  if (check2.rows.length === 0) {
    await pool.query(
      "INSERT INTO nifs.users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
      ["seshu", "seshu@nifsindia.net", hashSeshu, "admin"]
    );
    console.log("Created admin user: seshu");
  } else {
    await pool.query(
      "UPDATE nifs.users SET password_hash = $1, role = $2 WHERE id = $3",
      [hashSeshu, "admin", check2.rows[0].id]
    );
    console.log("Updated admin user: seshu");
  }

  const res = await pool.query("SELECT id, name, email, role FROM nifs.users ORDER BY id");
  console.log("CURRENT USERS IN DATABASE:");
  console.table(res.rows);
  await pool.end();
}

main().catch((err) => {
  console.error("Error creating users:", err);
  process.exit(1);
});

