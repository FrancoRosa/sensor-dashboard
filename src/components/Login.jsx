import { useEffect, useState } from "react";
import logo from "../assets/icon.png";
import { getDBLogin } from "../js/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router";

const Login = () => {
  const setUser = useStoreActions((actions) => actions.setUser);
  const authenticated = useStoreState((state) => state.authenticated);
  const setAuthenticated = useStoreActions(
    (actions) => actions.setAuthenticated
  );

  const [message, setMessage] = useState({ style: "", text: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const login = (e) => {
    setLoading(true);
    e.preventDefault();
    const {
      user: { value: user },
      password: { value: password },
    } = e.target.elements;
    getDBLogin(user, password).then(({ data }) => {
      if (data.length > 0) {
        const userData = data[0];
        setAuthenticated(true);
        setUser(userData);
        setMessage({ style: "is-success", text: `... Welcome ${userData.name}!` });
      } else {
        setLoading(false);

        setAuthenticated(false);
        setUser({});
        setMessage({
          style: "is-danger",
          text: "User or password error, try again",
        });
      }
    });
  };

  useEffect(() => {
    if (authenticated === true) {
      setTimeout(() => {
        history.push("/home");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <div className="is-flex is-flex-centered login">
      <form className="card" onSubmit={login}>
        <div className="card-image">
          <figure
            className="image is-flex"
            style={{
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              className="p-4 logo"
              alt="logo"
              style={{ width: "100px" }}
            />
            <p
              style={{
                marginLeft: "-0.5em",
                marginRight: "1em",
              }}
              className="title is-4"
            >
              Sensor Dashboard
            </p>
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
                name="user"
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
                name="password"
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-footer-item is-flex-direction-column">
            <button
              className={`button ${loading && "is-loading"}`}
              disabled={loading}
            >
              Log in
            </button>
            <p class={`help ${message.style}`}>{message.text}</p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
