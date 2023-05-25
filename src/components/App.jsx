import { StoreProvider, createStore } from "easy-peasy";
import model from "../js/model";
import Home from "./Home";

const store = createStore(model);

const App = () => {
  return (
    <StoreProvider store={store}>
      <Home />
    </StoreProvider>
  );
};

export default App;
