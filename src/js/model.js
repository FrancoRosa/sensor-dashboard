import { action } from "easy-peasy";

export default {
  authenticated: false,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
  }),
};
