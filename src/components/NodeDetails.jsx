import { useEffect, useState } from "react";
import { isRecent } from "../js/helpers";
import { getDeviceCheck } from "../js/api";

const NodeDetails = ({ devices, active }) => {
  const [device, setDevice] = useState();
  const [status, setStatus] = useState({ style: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setStatus({ style: "", text: "" });
    setLoading(true);
    getDeviceCheck(device.id)
      .then((res) => {
        console.log(res);
        if ("error" in res) {
          setStatus({ style: "has-text-danger", text: "Offline" });
        } else {
          setStatus({ style: "has-text-success", text: "Online" });
        }
        setLoading(false);
      })
      .catch((err) => {
        setStatus({ style: "has-text-warning", text: "Particle server issue" });

        console.log(err.response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    const target = devices.find((d) => d.id === active);
    setDevice(target);
    setStatus({ style: "", text: "" });
  }, [devices, active]);

  return (
    <div className="column is-two-fifths card">
      {device && (
        <div className="card-content">
          <h1 className="title is-3 has-text-centered">{device.name}</h1>
          <p className="has-text-link" style={{ textAlign: "right" }}>
            Temperature: {device.temp} °C
          </p>
          <p className="has-text-link" style={{ textAlign: "right" }}>
            Humidity: {device.hum} %
          </p>
          <hr style={{ border: "solid 1px white" }} />
          <div className="is-flex is-justify-content-space-between">
            <p className="has-text-link" style={{ textAlign: "right" }}>
              PM1: {device.pm1}
            </p>
            <p className="has-text-link" style={{ textAlign: "right" }}>
              PM2.5: {device["pm2.5"]}
            </p>
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p className="has-text-link" style={{ textAlign: "right" }}>
              PM4: {device.pm4}
            </p>
            <p className="has-text-link" style={{ textAlign: "right" }}>
              PM10: {device.pm10}
            </p>
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p className="has-text-link" style={{ textAlign: "right" }}>
              GAS1R: {device.gas_op1_r}
            </p>
            <p className="has-text-link" style={{ textAlign: "right" }}>
              GAS1W: {device.gas_op1_w}
            </p>
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p className="has-text-link" style={{ textAlign: "right" }}>
              GAS2R: {device.gas_op2_r}
            </p>
            <p className="has-text-link" style={{ textAlign: "right" }}>
              GAS2W: {device.gas_op2_w}
            </p>
          </div>

          <hr style={{ border: "solid 1px white" }} />
          <p className="has-text-link" style={{ textAlign: "right" }}>
            Latitude: {device.lat}
          </p>
          <p className="has-text-link" style={{ textAlign: "right" }}>
            Longitude: {device.lng}
          </p>
          <hr style={{ border: "solid 1px white" }} />
          <p className="has-text-link" style={{ textAlign: "right" }}>
            Device id: {device.id}
          </p>
          <p
            className={
              isRecent(device.updated_at) ? "has-text-link" : "has-text-danger"
            }
            style={{ textAlign: "right" }}
          >
            Last update: {new Date(device.updated_at).toLocaleString("SV")}
          </p>

          <div className="is-flex is-flex-centered is-flex-direction-column m-4">
            <button
              disabled={loading}
              onClick={handleCheck}
              className={`button is-outlined ${loading && "is-loading"}`}
            >
              Check device
            </button>
            <p
              className={`has-text-link m-2 ${status.style}`}
              style={{ textAlign: "right" }}
            >
              {status.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeDetails;
