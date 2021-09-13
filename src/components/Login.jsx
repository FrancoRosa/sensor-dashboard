import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import logo from "../assets/logo.png";

const Login = () => {
  const test_user = "user";
  const test_pass = "pass";

  const authenticated = useStoreState((state) => state.authenticated);
  const setAuthenticated = useStoreActions(
    (actions) => actions.setAuthenticated
  );
  const userContainer = useRef("");
  const passContainer = useRef("");
  const history = useHistory();

  const login = () => {
    if (
      test_user === userContainer.current.value &&
      test_pass === passContainer.current.value
    ) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    if (authenticated) {
      history.push("/home");
    }
  }, [authenticated]);

  return (
    <div className="is-flex is-flex-centered login">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={logo} className="p-4 logo" />
          </figure>
        </div>
        <div className="card-content">
          <div className="field">
            <label className="label">User</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="User"
                ref={userContainer}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                ref={passContainer}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-footer-item">
            <button className="button" onClick={login}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
