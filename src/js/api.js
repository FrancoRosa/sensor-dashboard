import { supabase } from "../js/supabase";

export const getDeviceCheck = async (particle_id) => {
  const apiUrl =
    "https://oghvngfrgyvomtcawowg.supabase.co/functions/v1/check-device";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHZuZ2ZyZ3l2b210Y2F3b3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQyNDAzNDMsImV4cCI6MTk5OTgxNjM0M30.88or3bhFkeU3r1B3PqItgBTDUVARDFmLmxDMi9oHBWc";

  const config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ particle_id }),
  };

  let response = await fetch(apiUrl, config);
  return await response.json();
};

export const getDBLogin = async (user, pass) => {
  return await supabase
    .from("users")
    .select("name, role, active")
    .like("name", user)
    .like("pass", pass);
};

export const getDevices = async () => {
  return await supabase
    .from("devices")
    .select("*")
    .order("name", { ascending: true });
};

export const getMeasurements = async (id) => {
  return await supabase
    .from("measurements")
    .select("*")
    .eq("device_id", id)
    .order("id", { ascending: false })
    .limit(100);
};

export const deviceSubscription = (handler) => {
  return supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "devices" },
      (payload) => {
        handler(payload);
      }
    )
    .subscribe();
};

export const recordSubscription = (handler) => {
  return supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "measurements" },
      (payload) => {
        console.log("...record sub");
        handler(payload);
      }
    )
    .subscribe();
};

export const removeSub = (sub) => {
  supabase.removeChannel(sub);
};
