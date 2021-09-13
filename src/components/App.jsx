import { Switch, Redirect, Route } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import model from '../js/model'

const store = createStore(model)

const App = () => {
  return (
    <StoreProvider store={store}>
    <Redirect exact from="/" to="/login" />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/config" component={Config} />
          <Route path="/calibrate" component={Calibrate} /> */}
        </Switch>
      </div>
    </StoreProvider>
  );
}

export default App;
