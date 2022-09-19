import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../Auth/store/auth.slice";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const buildNavLinkClassName = (isActive: boolean) => {
    const active = isActive ? styles.active : "";

    return `${styles.navLink} ${active}`;
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navbar_brand}>
          <h1>Expense Manager</h1>
        </div>

        <div className={styles.navbar_routes}>
          <NavLink
            to="./"
            end
            className={({ isActive }) => buildNavLinkClassName(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="./friends"
            className={({ isActive }) => buildNavLinkClassName(isActive)}
          >
            Friends
          </NavLink>
        </div>

        <div className={styles.navbar_actions}>
          <button className="btn btn-danger-invert" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
