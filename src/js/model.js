import { action } from "easy-peasy";

const model = {
  authenticated: false,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
  }),
  user: {},
  setUser: action((state, user) => {
    state.user = user;
  }),
  nodes: [],
  setNodes: action((state, nodes) => {
    state.nodes = nodes;
  }),
  node: {},
  setNode: action((state, node) => {
    state.node = node;
  }),
  showNodeDetails: false,
  setShowNodeDetails: action((state, showNodeDetails) => {
    state.showNodeDetails = showNodeDetails;
  }),
};

export default model;
