import { Route, Switch } from "react-router-dom";
import HomeNavigation from "./HomeNavigation";
import NewNode from "./NewNode";
import Nodes from "./Nodes";

const Home = () => {
  return (
    <div className="container">
      <div className="columns m-4">
        <HomeNavigation />
        <div className="column p-4">
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
