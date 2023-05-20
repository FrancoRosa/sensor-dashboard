import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { getTimestamp, toDate, toDateTime } from "../js/helpers";

const NodeDetails = ({ handleDeleteNode }) => {
  const node = useStoreState((state) => state.node);
  const nodes = useStoreState((state) => state.nodes);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [queryDate, setQueryDate] = useState(toDate(getTimestamp()));
  const { id, name, lat, lng, timestamp = Date.now() } = node;

  const fadeOut = () => {
    document.querySelector(".card").classList.add("animate__fadeOutRight");
    setTimeout(() => {
      setShowNodeDetails(false);
    }, 1000);
  };

  const isRecent = (timestamp) => {
    const secondsInDay = 24 * 60 * 60;
    return timestamp > Date.now() / 1000 - secondsInDay;
  };

  return (
    <div
      className="card animate__animated animate__fadeInRight"
      style={{ overflow: "scroll" }}
    >
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p>
              <span className="has-text-weight-semibold">Device Name: </span>
              {name}
            </p>
          </div>
        </div>
        <p className="help is-link" style={{ textAlign: "right" }}>
          Coordinates: {parseFloat(lat).toFixed(5)},{" "}
          {parseFloat(lng).toFixed(5)}
        </p>
        <p className="help is-link" style={{ textAlign: "right" }}>
          RPI ID: {id}
        </p>
        <p
          className={`help ${isRecent(timestamp) ? "is-link" : "is-danger"}`}
          style={{ textAlign: "right" }}
        >
          Last update: {toDateTime(timestamp)}
        </p>
      </div>

      <div className="card-footer">
        <div className="card-footer-item">
          <button onClick={fadeOut} className="button is-link is-outlined">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;
