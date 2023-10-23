import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./styles.css";

const NavBar: React.FC = () => {
  const { loggedIn, logOut } = useAuth();

  const handleLogout = () => {
    // Remove from sessionStorage
    // Dispatch logout action to Redux to update the state
    logOut();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {loggedIn ? (
        <div>
          <Link to="/my-books">My Books</Link>
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
