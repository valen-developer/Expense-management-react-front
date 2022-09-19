import { Outlet } from "react-router-dom";

import styles from "./Auth.module.scss";

export const Auth = () => {
  return (
    <div className={styles.auth__wrapper}>
      <Outlet />
    </div>
  );
};
