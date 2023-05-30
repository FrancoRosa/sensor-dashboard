import NodeMap from "./NodeMap";
import MainLabel from "./MainLabel";
import { useEffect, useState } from "react";
import { deviceSubscription, getDevices, removeSub } from "../js/api";
import NodeDetails from "./NodeDetails";
import NodeList from "./NodeList";
import Login from "./Login";

const Home = () => {
  const [payload, setPayload] = useState();
  const [devices, setDevices] = useState([]);
  const [active, setActive] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (payload) {
      console.log("...new data", payload.new);
      setDevices(
        devices.map((n) => (n.id === payload.new.id ? payload.new : n))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useEffect(() => {
    getDevices().then((res) => setDevices(res.data));
    const sub = deviceSubscription(setPayload);
    return () => removeSub(sub);
  }, []);

  return (
    <>
      {authenticated ? (
        <>
          <MainLabel />
          <div
            className="container columns"
            style={{
              width: "100vw",
              height: "90vh",
              margin: "1em",
              gap: "0.5em",
            }}
          >
            <NodeList devices={devices} active={active} setActive={setActive} />
            <NodeDetails devices={devices} active={active} />
            <NodeMap devices={devices} setActive={setActive} active={active} />
          </div>{" "}
        </>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </>
  );
};
export default Home;
