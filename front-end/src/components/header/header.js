import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">Recycling & Canada</Link>
      <Link to="/waste-management">Waste Management</Link>
      <Link to="/challenges">Challenges</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/contact">Contact Us</Link>
    </header>
  );
};

export default Header;
