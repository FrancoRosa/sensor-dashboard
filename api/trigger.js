const axios = require("axios");

const functionName = "device-check";
const deviceId = "e00fce68fbaff8280babc8e9";
const accessToken = "8e0a8e4609b38c332b873829ada9016ac71529b6";
const apiUrl = `https://api.particle.io/v1/devices/${deviceId}/${functionName}`;

const postData = {
  arg: "device-check",
  access_token: accessToken,
};

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // Set the content type here
  },
};
axios
  .post(apiUrl, postData, config)
  .then((response) => {
    console.log("Success:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
