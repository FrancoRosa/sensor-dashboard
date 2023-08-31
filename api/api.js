"use strict";

const express = require("express");
const cors = require("cors");
const http = require("http");
const { insertMeasurement, updateDevice, timestamp } = require("./supabase");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.post("/", async (req, res) => {
  const { data } = req.body;
  let message = "supabase error";
  message = await insertMeasurement(data);
  await updateDevice(data);
  console.log(timestamp(), data);
  res.status(200).json({ message });
});

app.get("/", (req, res) => {
  const message = "particle webhook waiting for events";
  res.status(200).json({ message });
});

const port = 8765;
server.listen(port, () => console.log(timestamp(), "... listening on", port));
