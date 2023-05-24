"use strict";

const express = require("express");
const cors = require("cors");
const http = require("http");
const { insertMeasurement, updateDevice } = require("./supabase");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.post("/", (req, res) => {
  const { data } = req.body;
  let message;
  insertMeasurement(data).then(({ statusMessage }) => {
    message = statusMessage;
  });
  updateDevice(data);

  res.status(200).json({ message });
});

app.get("/", (req, res) => {
  console.log(req.body);
  const message = "particle webhook waiting for events";
  res.status(200).json({ message });
});

const port = 8765;
server.listen(port, () => console.log("... listening on", port));
