import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
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
  const [message, setMessage] = useState("");
  const history = useHistory();

  const login = () => {
    if (
      test_user === userContainer.current.value &&
      test_pass === passContainer.current.value
    ) {
      setMessage("");
      setAuthenticated(true);
      console.log("... welcome");
    } else {
      setMessage("Wrong password");
      console.error("... wrong pass");
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
                onFocus={() => setMessage("")}
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
                onFocus={() => setMessage("")}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-footer-item is-flex-direction-column">
            <button className="button" onClick={login}>
              Log in
            </button>
            <p class="help is-danger">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
