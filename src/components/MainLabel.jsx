import logo from "../assets/icon.png";

const MainLabel = () => {
  return (
    <div className="is-flex is-justify-content-center card">
      <figure
        className="image is-flex"
        style={{
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          className="p-4 logo"
          alt="logo"
          style={{ width: "70px" }}
        />
        <p className="title is-4">Sensor Dashboard</p>
      </figure>
    </div>
  );
};
export default MainLabel;
