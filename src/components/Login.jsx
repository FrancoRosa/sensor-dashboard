import { useState } from "react";
import logo from "../assets/icon.png";
import { getDBLogin } from "../js/api";

const Login = ({ setAuthenticated }) => {
  const [message, setMessage] = useState({ style: "", text: "" });
  const [loading, setLoading] = useState(false);

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
        setMessage({
          style: "is-success",
          text: `... Welcome ${userData.name}!`,
        });
        setTimeout(() => {
          setAuthenticated(true);
        }, 1000);
      } else {
        setLoading(false);
        setAuthenticated(false);
        setMessage({
          style: "is-danger",
          text: "User or password error, try again",
        });
      }
    });
  };

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
            <p className={`help ${message.style}`}>{message.text}</p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
