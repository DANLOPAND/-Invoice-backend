import style from "./Header.module.scss";
import logo from "../../assets/logo.jpg";

const Header = () => {
  return (
    <div className={style.Header} >
    <img src={logo} alt="Logo" />
      <h2>AIMEDGE</h2>
    </div>
  );
};

export default Header;
