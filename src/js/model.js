import { action } from "easy-peasy";

const nodesInit = [
  {
    info: {
      id: "",
      company: "",
      address: "",
      contactName: "",
      contactPhone: "",
      description: "",
      lat: "",
      lng: "",
    },
    reservoirs: [],
    notification: {},
  },
];

export default {
  authenticated: false,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
  }),
  nodes: nodesInit,
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
