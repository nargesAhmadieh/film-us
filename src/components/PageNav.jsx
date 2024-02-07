import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/about">درباره ما</NavLink>
        </li>
        <li>
          <NavLink to="/">خانه</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
