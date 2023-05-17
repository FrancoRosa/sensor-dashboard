import { Route, Switch } from "react-router-dom";
import HomeNavigation from "./HomeNavigation";
import NewNode from "./NewNode";
import Nodes from "./Nodes";
import NodeDetails from "./NodeDetails";
import MainLabel from "./MainLabel";

const Home = () => {
  return (
    <div className="container">
      <div>
        <div>
          <MainLabel />
          <Switch>
            <Route path="/home/nodes" component={Nodes} />
            <Route path="/home/new_node" component={NewNode} />
            <Route path="/home" component={Nodes} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Home;
