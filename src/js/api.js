import { supabase } from "../js/supabase";

export const getDeviceCheck = async (id) => {
  const url = "https://mandor.pe:8766/check";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
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
