import db from "../../services/db";

async function dropTables() {
  try {
    await db.query("DROP TABLE IF EXISTS tasks CASCADE;");
    await db.query("DROP TABLE IF EXISTS users CASCADE;");
  } catch (err) {
    console.log("Error happened in dropTables", err);
  }
}

export default dropTables;
