import "../Css/Header.css";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

function Header() {
    const navigate = useNavigate();

  return (
    <header>
      <div className="headerName">
          <nav onClick={() => navigate("/")} className="headerOptions">
            HOME
          </nav>
      </div>
        <Searchbar />
    </header>
  );
}

export default Header;
