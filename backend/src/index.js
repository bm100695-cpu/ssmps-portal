const { Client } = require('pg');

// ⚠️ Yahan apni Neon wali connection string paste karein quotes ' ' ke andar
const connectionString = 'MONGODB_URI=mongodb+srv://bm100695_db_user:WkC7kwiGH9C2nzqy@YOUR-CLUSTER.mongodb.net/school_management';

// 👇 YAHAN MAINE CHANGE KIYA HAI (SSL add kiya hai Neon DB ke liye) 👇
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
// 👆 ---------------------------------------------------------------- 👆

async function testDatabase() {
  try {
    await client.connect();
    console.log("✅ PostgreSQL Database se successfully connect ho gaya!\n");

    await client.query(`
      CREATE TABLE IF NOT EXISTS my_test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        role VARCHAR(100)
      )
    `);

    await client.query(`
      INSERT INTO my_test_table (name, role) 
      VALUES ('Brijesh', 'Full Stack Developer')
    `);

    const result = await client.query('SELECT * FROM my_test_table');
    
    console.log("👇 Yeh raha aapka Data 👇");
    console.table(result.rows); 

  } catch (error) {
    console.error("❌ Error aaya:", error.message);
  } finally {
    await client.end();
  }
}

testDatabase();