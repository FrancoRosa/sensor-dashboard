import { action } from "easy-peasy";

const nodesInit = [
  {
    id: "0000-0001",
    company: "J.P Morgan",
    description: "Cleaning products",
    lat: 29.87456,
    lng: -96.1234,
    address: "Lucas St. 404",
    contactPhone: "64353545",
    contactName: "Marcos",
    lastUpdate: Math.floor(Date.now() / 1000),
  },
  {
    id: "0000-0002",
    company: "CocaCola",
    description: "Purify products",
    lat: 29.3234,
    lng: -96.4234,
    address: "Lucas St. 404",
    contactPhone: "64353545",
    contactName: "Luke",
    lastUpdate: Math.floor(Date.now() / 1000) - 10 * 60,
  },
  {
    id: "0000-0003",
    company: "Texaco",
    description: "Oil removers",
    lat: 29.2234,
    lng: -96.4234,
    address: "Lucas St. 404",
    contactPhone: "64353545",
    contactName: "Peter",
    lastUpdate: Math.floor(Date.now() / 1000) - 12 * 60,
  },
];

export default {
  authenticated: false,
  setAuthenticated: action((state, authenticated) => {
    state.authenticated = authenticated;
  }),
  nodes: nodesInit,
};
