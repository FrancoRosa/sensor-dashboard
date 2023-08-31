/* eslint-disable jsx-a11y/anchor-is-valid */
const NodeList = ({ devices, active, setActive }) => {
  return (
    <aside className="column is-one-fifth card">
      <p className="menu-label m-3 has-text-link">Device List</p>
      <ul className="menu-list">
        {devices.map((node, i) => (
          <li
            key={i}
            onClick={() => {
              setActive(node.id);
            }}
            style={{
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
            className="m-2"
          >
            <button
              style={{ width: "100%" }}
              className={`button is-success ${
                node.id !== active && "is-outlined"
              }`}
            >
              {node.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NodeList;
