import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import logo from "../assets/logo.png";
import { getCredentials } from "../js/firebase";

const Login = () => {
  const setAuthenticated = useStoreActions(
    (actions) => actions.setAuthenticated
  );
  const userContainer = useRef("");
  const passContainer = useRef("");
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState("");
  const history = useHistory();

  const login = () => {
    if (
      credentials.user === userContainer.current.value &&
      credentials.password === passContainer.current.value
    ) {
      setMessage("");
      setAuthenticated(true);
      history.push("/home");
      console.log("... welcome");
    } else {
      setMessage("Wrong password");
      console.error("... wrong pass");
    }
  };

  useEffect(() => {
    getCredentials().then((res) => {
      setCredentials(res);
    });
  }, []);

  return (
    <div className="is-flex is-flex-centered login">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={logo} className="p-4 logo" alt="logo" />
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
