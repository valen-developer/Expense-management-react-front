import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { Signup } from "./Auth/Signup";

function App() {
  return (
    <div className={styles.app + " theme-dark"}>
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />

        <Route path="*" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
