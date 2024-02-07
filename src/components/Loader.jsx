import styles from "./Loader.module.css";

function Loader() {
  return (
    <p className="error">
      <span>🚫 درحال بارگذاری</span>
      {message}
    </p>
  );
}

export default Loader;
