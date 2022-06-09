const fs = require("fs");
const cocktails = require("./db/cocktails.json");
const express = require("express");
const app = express();
const PORT = 3001;

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//route for create, read, update, delete

// Create
// POST /api/cocktails
app.post("/api/cocktails", (req, res) => {
  // take new cocktail info
  let drink = req.body;
  // readfiles
  fs.readFile("./db/cocktails.json", (err, cocktails) => {
    if (err) throw err;
    const cocktailArray = JSON.parse(cocktails);
    cocktailArray.push(drink);
    console.log(cocktailArray);
    // write cocktail into database
    fs.writeFile(
      "./db/cocktails.json",
      JSON.stringify(cocktailArray, null, 2),
      "utf8",
      (err) => {
        if (err) return console.err;
        res.json(drink);
      }
    );
  });

  // return a copy of new cocktail from .json
});
// Read
//GET /api/cocktails - get me all the cocktails filterable by query parameters
app.get("/api/cocktails", (req, res) => {
  res.json(cocktails);
});
//GET /api/cocktails/:id

app.get("/api/cocktails/:id", (req, res) => {
  const index = req.params.id;
  res.json(cocktails[index]);
});

// Update
// PUT /api/cocktails/:id

// Delete
// DELETE /api/cocktails/:id

app.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`);
});
