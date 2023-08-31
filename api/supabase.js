const { createClient } = require("@supabase/supabase-js");
const { url, anon } = require("./credentials");

const supabase = createClient(url, anon, { auth: { persistSession: false } });
const positions = {
  47: {
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
  },
  21: {
    particle: 0,
    timestamp: 1,
    lat: 2,
    lng: 3,
    pm1: 4,
    pm25: 5,
    pm4: 6,
    pm10: 7,
    pm05num: 8,
    pm1num: 9,
    pm25num: 10,
    pm4num: 11,
    pm10num: 12,
    part_size: 13,
    temp: 14,
    hum: 15,
    gas_op1_w: 16,
    gas_op1_r: 17,
    gas_op2_w: 18,
    gas_op2_r: 19,
    noise: 46,
  },
};

const validate = (value) => {
  return parseFloat(value) || 0;
};

const payloadToObject = (payload) => {
  // sample data:
  // 0,340030000d47373432363837,1684867032,49.957066,82.592056,1.30,2.59,7.50,3936,351,47,19,31,19,11,7,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,800,622,624,17.90,36.33,1,998.00,998.00,na,na,na,na,na,na,na
  // e00fce68c9677c2fe1029d34,946598400,0.000000,0.000000,3.21,3.40,3.41,3.41,0.00,0.00,0.00,0.00,0.00,0.00,25.6,49.8,462,420,330,300,4085
  const values = payload.split(",");
  const len = values.length;
  const result = {
    id: values[positions[len].particle],
    data: {
      lat: values[positions[len].lat],
      lng: values[positions[len].lng],
      pm1: values[positions[len].pm1],
      "pm2.5": values[positions[len].pm25],
      pm10: values[positions[len].pm10],
      temp: values[positions[len].temp],
      hum: values[positions[len].hum],
      gas_op1_w: validate(values[positions[len].gas_op1_w]),
      gas_op1_r: validate(values[positions[len].gas_op1_r]),
      gas_op2_w: validate(values[positions[len].gas_op2_w]),
      gas_op2_r: validate(values[positions[len].gas_op2_r]),
      noise: validate(values[positions[len].noise]),
      updated_at: new Date(),
    },
  };
  return result;
};

const updateDevice = async (payload) => {
  const { id, data } = payloadToObject(payload);
  return await supabase.from("devices").update(data).eq("particle_id", id);
};

const insertMeasurement = async (payload) => {
  const { id: particle_id, data } = payloadToObject(payload);
  return await supabase.from("measurements").insert({ particle_id, ...data });
};

const timestamp = () => {
  return new Date().toLocaleString("sv");
};

exports.insertMeasurement = insertMeasurement;
exports.updateDevice = updateDevice;
exports.timestamp = timestamp;
