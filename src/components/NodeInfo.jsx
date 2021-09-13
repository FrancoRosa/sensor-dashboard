import { Link } from "react-router-dom";
import { toDateTime } from "../js/helpers";

const NodeInfo = ({ info }) => {
  const {
    id,
    company,
    contactName,
    contactPhone,
    lastUpdate,
    description,
    address,
  } = info;
  return (
    <div className="has-text-black">
      <h1>
        <span className="has-text-weight-semibold">Company:</span> {company}
      </h1>
      <p>
        <span className="has-text-weight-semibold">Contact:</span> {contactName}{" "}
        - {contactPhone}
      </p>
      <p>
        <span className="has-text-weight-semibold">Description:</span>{" "}
        {description}
      </p>
      <p>
        <span className="has-text-weight-semibold">Address:</span> {address}
      </p>
      <p>
        <span className="has-text-weight-semibold">Last update:</span>{" "}
        {toDateTime(lastUpdate)}
      </p>
    </div>
  );
};
export default NodeInfo;
