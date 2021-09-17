import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTimestamp, toDate, toDateTime } from "../js/helpers";

const NodeDetails = () => {
  const node = useStoreState((state) => state.node);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [queryDate, setQueryDate] = useState(toDate(getTimestamp()));
  const recipes = ["Recipe 1", "Recipe 2", "Recipe 3"];
  const pumpsNames = ["Pump 1", "Pump 2", "Pump 3", "Pump 4"];
  const reservoirs = [true, false, true, true];

  const calibrations = [
    {
      id: 0,
      config: [
        { id: 0, pulses: 0, timeout: 0 },
        { id: 1, pulses: 0, timeout: 0 },
        { id: 2, pulses: 0, timeout: 0 },
        { id: 3, pulses: 0, timeout: 0 },
      ],
    },
    {
      id: 1,
      config: [
        { id: 0, pulses: 0, timeout: 0 },
        { id: 1, pulses: 0, timeout: 0 },
        { id: 2, pulses: 0, timeout: 0 },
        { id: 3, pulses: 0, timeout: 0 },
      ],
    },
    {
      id: 2,
      config: [
        { id: 0, pulses: 0, timeout: 0 },
        { id: 1, pulses: 0, timeout: 0 },
        { id: 2, pulses: 0, timeout: 0 },
        { id: 3, pulses: 0, timeout: 0 },
      ],
    },
  ];

  const lastEvents = [
    { message: "Check pump1", time: getTimestamp() - 124 },
    { message: "Check pump2", time: getTimestamp() - 1234 },
    { message: "Check pump2", time: getTimestamp() - 4234 },
    { message: "Check pump1", time: getTimestamp() - 9234 },
  ];

  const dailyMeasurements = [
    { reservoirs: [123, 534, 345, 467], date: "2021-09-09" },
    { reservoirs: [83, 234, 245, 367], date: "2021-09-07" },
    { reservoirs: [53, 134, 145, 167], date: "2021-09-02" },
    { reservoirs: [23, 34, 45, 1], date: "2021-09-01" },
  ];

  const {
    id,
    company,
    contactName,
    contactPhone,
    lastUpdate,
    description,
    address,
  } = node;
  return (
    <div className="card">
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
            <p className="has-text-link">
              {dailyMeasurements[0].reservoirs[i]}
            </p>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button
            onClick={() => setShowNodeDetails(false)}
            className="button is-link is-outlined"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;
