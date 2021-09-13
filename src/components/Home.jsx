import { Route, Switch } from "react-router-dom";
import HomeNavigation from "./HomeNavigation";
import Nodes from "./NewNode";
import NewNode from "./Nodes";

const Home = () => {
  return (
    <div className="container">
      <div className="columns m-4">
        <HomeNavigation />
        <div className="column p-4">
          <Switch>
            <Route path="/home/nodes" component={Nodes} />
            <Route path="/home/new" component={NewNode} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Home;
