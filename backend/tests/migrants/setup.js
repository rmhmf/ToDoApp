import db from "../../services/db";
import bcrypt from "bcrypt";

async function createTableTasks() {
  try {
    await db.query(`CREATE TABLE tasks( 
      id SERIAL PRIMARY KEY,
	    title TEXT NOT NULL,
	    content TEXT NOT NULL,
	    date DATE,
	    userid INTEGER REFERENCES users(id)
    );`);
  } catch (err) {
    console.log("Error happened in create table tasks", err);
  }
}

async function createTableUsers() {
  try {
    await db.query(`CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      birthday DATE
    );`);
  } catch (err) {
    console.log("Error happened in creating table users", err);
  }
}

async function addUsers() {
  const SALT_ROUND = parseInt(process.env.SALT_ROUND);

  try {
    const pass1 = await bcrypt.hash("654321", SALT_ROUND);
    const pass2 = await bcrypt.hash("123456", SALT_ROUND);
    const result = await db.query("SELECT * FROM users");
    await db.query(
      `INSERT INTO users(email, password) 
        VALUES
        ('r.mohammadifarsani@gmail.com', $1),
        ('admin@admin.com', $2);`,
      [pass1, pass2]
    );
  } catch (err) {
    console.log("Error happened in adding user", err);
  }
}

async function setup() {
  await createTableUsers();
  await createTableTasks();
  await addUsers();
}

export default setup;
