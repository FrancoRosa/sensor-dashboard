/* eslint-disable jsx-a11y/anchor-is-valid */
const NodeList = ({ nodes, handleListClick, active, setActive }) => {
  return (
    <aside
      className="menu"
      style={{
        width: "15em",
        height: "calc(100vh - 3.5em)",
        backgroundColor: "rgb(40 47 47 / 94%)",
        position: "absolute",
        top: "0.25em",
        left: "0.25em",
        overflow: "scroll",
        borderRadius: "5px",
      }}
    >
      <p className="menu-label m-3 has-text-link">List of Nodes</p>
      <ul className="menu-list">
        {nodes.map((node, i) => (
          <li
            key={i}
            onClick={() => {
              setActive(node);
              handleListClick(node);
            }}
            style={{
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
            className="m-2"
          >
            <a href="#" className={node.id === active.id && "is-active"}>
              {node.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NodeList;
