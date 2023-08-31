const axios = require("axios");

const deviceCheck = async (device_id) => {
  const functionName = "CLI";
  const accessToken = "8e0a8e4609b38c332b873829ada9016ac71529b6";
  const apiUrl = `https://api.particle.io/v1/devices/${device_id}/${functionName}`;

  const postData = {
    arg: "device-check",
    access_token: accessToken,
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Set the content type here
    },
  };

  let response;
  try {
    response = await axios.post(apiUrl, postData, config);
  } catch (error) {
    response = error.response.data;
  }
  return response;
};

exports.deviceCheck = deviceCheck;
