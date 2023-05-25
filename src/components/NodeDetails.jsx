import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { getMeasurements, recordSubscription, removeSub } from "../js/api";
import { isRecent } from "../js/helpers";

import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NodeDetails = ({ handleDeleteNode }) => {
  const node = useStoreState((state) => state.node);
  const [info, setInfo] = useState(node);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [records, setRecords] = useState([]);
  const [data, setData] = useState();

  const plotOptions = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const temperature = {
    labels: records.map((d) => new Date(d.updated_at).toLocaleTimeString("SV")),
    datasets: [
      {
        label: "Temperature",
        data: records.map((d) => d.temp),
        borderColor: "#1abc9c",
        backgroundColor: "#1abc9c 50%",
      },
      {
        label: "Humidity",
        data: records.map((d) => d.hum),
        borderColor: "#FFA500",
        backgroundColor: "#FFA500 50%",
      },
    ],
  };

  const fadeOut = () => {
    document.querySelector(".card").classList.add("animate__fadeOutRight");
    setTimeout(() => {
      setShowNodeDetails(false);
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      setInfo(data.new);
      if (data.new.device_id === node.id) {
        setRecords((r) => {
          r.shift();
          return [...r, data.new];
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    getMeasurements(node.id).then(({ data }) => setRecords(data.reverse()));
    const subs = recordSubscription(setData);
    return () => removeSub(subs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="card animate__animated animate__fadeInRight"
      style={{ overflow: "scroll", width: "80vw" }}
    >
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p>
              <span className="has-text-weight-semibold">{info.name}</span>
            </p>
          </div>
        </div>
        <p className="help is-link" style={{ textAlign: "right" }}>
          Temperature: {info.temp} °C
        </p>
        <p className="help is-link" style={{ textAlign: "right" }}>
          Humidity: {info.hum} %
        </p>
        <Line options={plotOptions} data={temperature} />

        <p className="help is-link" style={{ textAlign: "right" }}>
          Latitude: {info.lat}
        </p>
        <p className="help is-link" style={{ textAlign: "right" }}>
          Longitude: {info.lng}
        </p>
        <p className="help is-link" style={{ textAlign: "right" }}>
          Device id: {info.id}
        </p>
        <p
          className={`help ${
            isRecent(info.updated_at) ? "is-link" : "is-danger"
          }`}
          style={{ textAlign: "right" }}
        >
          Last update: {new Date(info.updated_at).toLocaleString("SV")}
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
