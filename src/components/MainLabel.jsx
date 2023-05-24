import logo from "../assets/icon.png";

const MainLabel = () => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2000,
        right: "calc(50vw - 18em)",
        top: "0.25em",
        width: "18em",
        backgroundColor: "rgba(40, 47, 47, 0.7)",
        borderRadius: "5px",
      }}
    >
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
        <p
          style={{
            marginLeft: "-0em",
            marginRight: "0.5em",
            padding: 0,
          }}
          className="title is-4"
        >
          Sensor Dashboard
        </p>
      </figure>
    </div>
  );
};
export default MainLabel;
