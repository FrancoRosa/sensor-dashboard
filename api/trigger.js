const deviceCheck = async (device_id) => {
  const functionName = "CLI";
  const accessToken = "8e0a8e4609b38c332b873829ada9016ac71529b6";
  const apiUrl = `https://api.particle.io/v1/devices/${device_id}/${functionName}`;

  const postData = new URLSearchParams({
    arg: "device-check",
    access_token: accessToken,
  });

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
  };

  let response;
  try {
    response = await fetch(apiUrl, config);
    response = await response.json();
  } catch (error) {
    response = error.message || "An error occurred.";
  }
  return response;
};

deviceCheck("e00fce68f3974f341ff3b687").then((res) => console.log(res));
