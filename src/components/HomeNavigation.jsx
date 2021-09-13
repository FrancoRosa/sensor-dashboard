import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalize } from "../js/helpers";

const HomeNavigation = () => {
  const options = ["nodes", "new"];
  const { mode } = useParams();
  const [selection, setSelection] = useState(mode ? mode : options[0]);

  return (
    <div className="menu column is-one-fifth">
      <p className="menu-label has-text-link">
        <a>Home</a>
      </p>
      <ul className="menu-list">
        {options.map((option) => (
          <li>
            <Link
              className={option == selection && "is-active"}
              onClick={() => setSelection(option)}
              to={`/home/${option}`}
            >
              {capitalize(option)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeNavigation;
