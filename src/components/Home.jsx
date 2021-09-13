import { useStoreActions } from "easy-peasy";
import { useRef } from "react";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="container is-flex is-flex-centered login">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={logo} className="p-4 logo" />
          </figure>
        </div>
        <div className="card-content">Home</div>
      </div>
    </div>
  );
};
export default Home;
