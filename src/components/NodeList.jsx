/* eslint-disable jsx-a11y/anchor-is-valid */
const NodeList = ({ nodes, handleListClick, active, setActive }) => {
  return (
    <aside className="column is-one-fifth card">
      <p className="menu-label m-3 has-text-link">Device List</p>
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
