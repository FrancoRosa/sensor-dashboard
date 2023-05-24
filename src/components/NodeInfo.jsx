const NodeInfo = ({ info }) => {
  const { name, lat, lng, pm1, pm10, temp, hum, updated_at } = info;
  console.log("########");
  console.log(info);
  console.log("########");
  return (
    <div className="has-text-black">
      <div
        className="is-flex is-justify-content-space-around"
        style={{ gap: "2em" }}
      >
        <h1>
          <span className="has-text-weight-semibold">{name}</span>
        </h1>
        <p>
          <span className="has-text-weight-semibold">
            {temp}°C, {hum} %
          </span>
        </p>
      </div>
      <p>
        <span className="has-text-weight-semibold">PM1: </span>
        {pm1}
      </p>
      <p>
        <span className="has-text-weight-semibold">PM2.5: </span>
        {info["pm2.5"]}
      </p>
      <p>
        <span className="has-text-weight-semibold">PM10: </span>
        {pm10}
      </p>
      <p>
        <span className="has-text-weight-semibold">Coordinates: </span>
        {`${lat}, ${lng}`}
      </p>
      <p>
        <span className="has-text-weight-semibold">Updated at: </span>{" "}
        {new Date(updated_at).toLocaleString("SV")}
      </p>
    </div>
  );
};
export default NodeInfo;
