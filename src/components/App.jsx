import { Switch, Redirect, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "../js/model";
import Login from "./Login";
import Home from "./Home";

const store = createStore(model);

const App = () => {
  return (
    <StoreProvider store={store}>
      {/* <Redirect exact from="/" to="/login" /> */}
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/home" component={Home} />
      </Switch>
    </StoreProvider>
  );
};

export default App;
