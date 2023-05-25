import { Route, Switch } from "react-router-dom";
// import HomeNavigation from "./HomeNavigation";
import NewNode from "./NewNode";
import Nodes from "./Nodes";
// import NodeDetails from "./NodeDetails";
import MainLabel from "./MainLabel";
import { useEffect, useState } from "react";
import { deviceSubscription, removeSub } from "../js/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const Home = () => {
  const [payload, setPayload] = useState();
  const nodes = useStoreState((state) => state.nodes);
  const setNodes = useStoreActions((actions) => actions.setNodes);

  useEffect(() => {
    if (payload) {
      console.log(payload.new);
      setNodes(nodes.map((n) => (n.id === payload.new.id ? payload.new : n)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useEffect(() => {
    const sub = deviceSubscription(setPayload);
    return () => removeSub(sub);
  }, []);

  return (
    <div className="container" style={{ width: "100vw" }}>
      <MainLabel />
      <Switch>
        <Route path="/home/nodes" component={Nodes} />
        <Route path="/home/new_node" component={NewNode} />
        <Route path="/home" component={Nodes} />
      </Switch>
    </div>
  );
};
export default Home;
