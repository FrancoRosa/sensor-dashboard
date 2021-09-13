import { action } from "easy-peasy";

export default {
  authenticated: true,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
  }),
};
