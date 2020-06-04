import express from "express";

var app = express();

// GET
app.get("/users", (request, response) => {
  response.json(["Frango", "Maromba", "Jota", "Clei Clei"]);
});

app.listen(3333);
