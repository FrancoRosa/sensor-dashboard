import { action } from "easy-peasy";

export default {
  authenticated: false,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
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
