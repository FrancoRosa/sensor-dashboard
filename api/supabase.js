const { createClient } = require("@supabase/supabase-js");
const { url, anon } = require("./credentials");

const supabase = createClient(url, anon);
let particles = {};
const positions = {
  particle: 1,
  timestamp: 2,
  lat: 3,
  lng: 4,
  pm1: 5,
  pm25: 6,
  pm4: 100,
  pm10: 7,
  temp: 35,
  hum: 36,
  gas_op1_w: 42,
  gas_op1_r: 43,
  gas_op2_w: 44,
  gas_op2_r: 45,
  noise: 46,
};

const validate = (value) => {
  return parseFloat(value) || 0;
};

const getParticles = async () => {
  return await supabase.from("particles").select("*");
};

const payloadToObject = (payload) => {
  // sample data: "0,340030000d47373432363837,1684867032,49.957066,82.592056,1.30,2.59,7.50,3936,351,47,19,31,19,11,7,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,800,622,624,17.90,36.33,1,998.00,998.00,na,na,na,na,na,na,na"
  const values = payload.split(",");
  const result = {
    id: particles[values[positions.particle]],
    data: {
      lat: values[positions.lat],
      lng: values[positions.lng],
      pm1: values[positions.pm1],
      "pm2.5": values[positions.pm25],
      pm10: values[positions.pm10],
      temp: values[positions.temp],
      hum: values[positions.hum],
      gas_op1_w: validate(values[positions.gas_op1_w]),
      gas_op1_r: validate(values[positions.gas_op1_r]),
      gas_op2_w: validate(values[positions.gas_op2_w]),
      gas_op2_r: validate(values[positions.gas_op2_r]),
      noise: validate(values[positions.noise]),
      updated_at: new Date(parseInt(values[positions.timestamp]) * 1000),
    },
  };
  console.log(result);
  return result;
};

const updateDevice = async (payload) => {
  const { id, data } = payloadToObject(payload);
  return await supabase.from("devices").update(data).eq("id", id);
};

const insertMeasurement = async (payload) => {
  const { id: device_id, data } = payloadToObject(payload);
  return await supabase.from("measurements").insert({ device_id, ...data });
};

getParticles().then(({ data }) => {
  data.forEach((element) => {
    particles[element.particle_id] = element.id;
  });
});

exports.insertMeasurement = insertMeasurement;
exports.updateDevice = updateDevice;
