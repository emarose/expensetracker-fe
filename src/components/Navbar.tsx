import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="d-flex gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/depto">Depto</Link>
        </li>
        <li>
          <Link to="/casa">Casa</Link>
        </li>
        <li>
          <Link to="/french">French</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
