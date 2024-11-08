import setup from "./migrants/setUp";
import dropTables from "./migrants/drop";
import db from "../services/db";

beforeAll(async () => {});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await dropTables();
});

afterAll(async () => {
  await db.end();
});
