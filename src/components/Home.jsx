import NodeMap from "./NodeMap";
import MainLabel from "./MainLabel";
import { useEffect, useState } from "react";
import { deviceSubscription, getDevices, removeSub } from "../js/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import NodeDetails from "./NodeDetails";
import NodeList from "./NodeList";

const Home = () => {
  const [payload, setPayload] = useState();
  const nodes = useStoreState((state) => state.nodes);
  const setNodes = useStoreActions((actions) => actions.setNodes);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState({});
  const [active, setActive] = useState({});
  const handleListClick = () => {
    console.log("listClick");
  };
  const handleDeleteNode = () => {
    console.log("nodeDelete");
  };

  useEffect(() => {
    if (payload) {
      console.log(payload.new);
      setNodes(nodes.map((n) => (n.id === payload.new.id ? payload.new : n)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useEffect(() => {
    getDevices().then((res) => setDevices(res.data));
    const sub = deviceSubscription(setPayload);
    return () => removeSub(sub);
  }, []);

  return (
    <>
      <MainLabel />
      <div
        className="container columns"
        style={{ width: "100vw", height: "90vh", margin: "1em", gap: "0.5em" }}
      >
        <NodeList
          nodes={devices}
          handleListClick={handleListClick}
          active={active}
          setActive={setActive}
        />
        <NodeDetails handleDeleteNode={handleDeleteNode} />
        <NodeMap devices={devices} />
      </div>
    </>
  );
};
export default Home;
