import "./style.css";
import Logo from "../../assets/images/logo.png"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";

export default function Header() {

  const username = localStorage.getItem("username");
  return(
    <header className="header">
      <div className="h-100 d-flex align-items-center">
        <img src={Logo} height={50}/>
        <span className="ms-2">Receitas da dona Naná</span>
      </div>
      
      <div className="h-100 d-flex align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle caret>Olá, {username}!</DropdownToggle>
          <DropdownMenu>
          <Link to="/logout" className="dropdown-item">
            <span>{"Logout"}</span>
          </Link>
        </DropdownMenu>
        </UncontrolledDropdown> 
      </div>
     
      
    </header>
  );
}