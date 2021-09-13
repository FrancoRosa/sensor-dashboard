import { action } from "easy-peasy";

export default {
  user: "",
  setUser: action((state, user) => {
    state.user = user;
  }),

  pass: "",
  setPass: action((state, pass) => {
    state.pass = pass;
  }),
};
