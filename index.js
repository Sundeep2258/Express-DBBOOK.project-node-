const express = require("express");

const { open } = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,

      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.messege}`);
    process.exit(1);
  }
};

intializeDBAndServer();

app.get("/book/", async (request, response) => {
  const getBookQuery = `
  SELECT * 
  FROM books 
  ORDER BY book_id`;
  const bookArray = await db.all(getBookQuery);
  response.send(bookArray);
});
