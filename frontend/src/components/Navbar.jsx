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
        <nav>
            <Link to="/dashboard">
                Dashboard
            </Link>

            {" | "}

            <span>
                {user?.name}
            </span>

            {" | "}

            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;