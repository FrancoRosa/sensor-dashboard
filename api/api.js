"use strict";

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const http = require("http");
const https = require("https");

const privateKey = fs.readFileSync("/home/fx/self.key", "utf8");
const certificate = fs.readFileSync("/home/fx/self.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const {
  insertMeasurement,
  updateDevice,
  timestamp,
  getParticleId,
} = require("./supabase");
const { deviceCheck } = require("./trigger");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

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

app.post("/check", async (req, res) => {
  const particleId = await getParticleId(req.body.id);
  const { particle_id } = particleId.data[0];
  const response = await deviceCheck(particle_id);
  res.status(200).json(response);
});

const port = 8765;
const ports = 8766;
server.listen(port, () =>
  console.log(timestamp(), "... listening http on", port)
);
httpsServer.listen(ports, () =>
  console.log(timestamp(), "... listening https on", ports)
);
