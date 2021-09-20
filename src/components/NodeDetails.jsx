import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMeasurements, getMeasurement } from "../js/firebase";
import { arrToCSV, getTimestamp, toDate, toDateTime } from "../js/helpers";

const NodeDetails = () => {
  const node = useStoreState((state) => state.node);
  const nodes = useStoreState((state) => state.nodes);
  const [measurements, setMeasurements] = useState([null, null, null, null]);
  const [report, setReport] = useState(null);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [queryDate, setQueryDate] = useState(toDate(getTimestamp()));
  const pumpsNames = ["Pump 1", "Pump 2", "Pump 3", "Pump 4"];
  const {
    id,
    company,
    contactName,
    contactPhone,
    lastUpdate,
    description,
    address,
  } = node;

  const nodeStatus = nodes.filter((node) => node.id == id)[0];
  const reservoirs = nodeStatus.reservoirs;
  const lastEvent = [nodeStatus.notification];

  useEffect(() => {
    getMeasurement(id, queryDate).then((res) => setMeasurements(res));
  }, [queryDate]);

  const onDownload = () => {
    let currentTime = toDate(getTimestamp());
    let currentStr = currentTime.split(/-|:/).join("");
    let filePrefix = currentStr.replace(" ", "_");
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(report);
    let dlAnchorElem = document.querySelector(".download");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `decon7_${filePrefix}_${id}.csv`);
  };

  const generateReport = () => {
    getAllMeasurements(id).then((res) => {
      const csv = arrToCSV(res);
      setReport(csv);
    });
  };

  const fadeOut = () => {
    document.querySelector(".card").classList.add("animate__fadeOutRight");
    setTimeout(() => {
      setShowNodeDetails(false);
    }, 1000);
  };

  return (
    <div className="card animate__animated animate__fadeInRight">
      <div className="card-header is-flex is-flex-centered">
        <h1 className="title is-5 m-1">Node details</h1>
      </div>
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p>
              <span className="has-text-weight-semibold">Company:</span>{" "}
              {company}
            </p>
            <p>
              <span className="has-text-weight-semibold">Id:</span> {id}
            </p>
            <p>
              <span className="has-text-weight-semibold">Contact:</span>{" "}
              {contactName} - {contactPhone}
            </p>
          </div>
          <div className="column">
            <p>
              <span className="has-text-weight-semibold">Description:</span>{" "}
              {description}
            </p>
            <p>
              <span className="has-text-weight-semibold">Address:</span>{" "}
              {address}
            </p>
            <p>
              <span className="has-text-weight-semibold">Last update:</span>{" "}
              {toDateTime(lastUpdate)}
            </p>
          </div>
        </div>
      </div>
      <div className="card-header is-flex is-flex-centered">
        <h1 className="title is-5 m-1">Reservoirs</h1>
      </div>
      <div className="card-content">
        <div className="columns">
          {pumpsNames.map((pump, i) => (
            <div className="column is-flex is-flex-centered is-flex-direction-column">
              <p>{pump}</p>
              <p
                className={reservoirs[i] ? "has-text-link" : "has-text-danger"}
              >
                {reservoirs[i] ? "Normal" : "Empty"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-header is-flex is-flex-centered">
        <h1 className="title is-5 m-1">Measurements</h1>
      </div>
      <div className="card-content columns">
        <div className="column">
          <div class="field">
            <label class="label">Date:</label>
            <div className="control">
              <input
                onChange={(e) => setQueryDate(e.target.value)}
                value={queryDate}
                type="date"
                className="input is-success control"
              />
            </div>
          </div>
        </div>
        {pumpsNames.map((pump, i) => (
          <div className="column is-flex is-flex-centered is-flex-direction-column">
            <p>{pump}</p>
            <p className="has-text-link">{measurements[i]}</p>
          </div>
        ))}
        <div className="column is-flex is-flex-centered">
          <div className="field">
            <label class="label">Report:</label>

            <a
              onClick={report ? onDownload : generateReport}
              className="button is-link is-outlined download"
            >
              {report ? "Donwload" : "Generate"}
            </a>
          </div>
        </div>
      </div>

      <div className="card-header is-flex is-flex-centered">
        <h1 className="title is-5 m-1">Last Notifications</h1>
      </div>
      <div className="card-content is-flex is-flex-centered">
        <table className="table">
          <thead className="has-text-centered">
            <tr>
              <th className="has-text-centered">Message</th>
              <th className="has-text-centered">Time stamp</th>
            </tr>
          </thead>
          <tbody>
            {lastEvent.map((event) => (
              <tr>
                <td>{event.message}</td>
                <td>{toDateTime(event.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
