import { Link } from "react-router-dom";

function Navbar() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
  <span className="navbar-brand">
    IntellMeet
  </span>

  <div>
    <span className="text-white me-3">
      {user?.name}
    </span>

    <button
      className="btn btn-danger"
      onClick={logout}
    >
      Logout
    </button>
  </div>
</nav>
    );
}

export default Navbar;