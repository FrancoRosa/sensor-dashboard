import { Route, Switch } from "react-router-dom";
// import HomeNavigation from "./HomeNavigation";
import NewNode from "./NewNode";
import Nodes from "./Nodes";
// import NodeDetails from "./NodeDetails";
import MainLabel from "./MainLabel";
import { supabase } from "../js/supabase";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const devices = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "devices" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();
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
