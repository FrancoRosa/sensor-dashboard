import { supabase } from "../js/supabase";

export const getDBLogin = async (user, pass) => {
  return await supabase
    .from("users")
    .select("name, role, active")
    .like("name", user)
    .like("pass", pass);
};

export const getDevices = async () => {
  return await supabase.from("devices").select("*");
};
