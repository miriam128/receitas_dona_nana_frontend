import "./style.css";
import Logo from "../../assets/images/logo.png"

export default function Header() {

  const username = localStorage.getItem("username");
  return(
    <header className="header">
      <div className="h-100 d-flex align-items-center">
        <img src={Logo} height={50}/>
        <span className="ms-2">Receitas da dona Naná</span>
      </div>
      
      <div className="h-100 d-flex align-items-center"> 
        <span className="">Olá, {username}!</span>
      </div>
     
      
    </header>
  );
}