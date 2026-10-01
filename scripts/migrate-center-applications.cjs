require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sql = fs.readFileSync('migrations/center-applications.sql', 'utf8');

async function run() {
  await pool.query(sql);
  console.log('Executed migrations/center-applications.sql successfully');
  const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='nifs' AND table_name='center_applications'");
  console.log('Columns:', res.rows);
  await pool.end();
}

run().catch((err) => {
  console.error('Migration failed:', err);
  pool.end();
});

