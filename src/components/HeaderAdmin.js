import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/icons/logo.png';
import axios from "axios";

function HeaderAdmin() {
    // CHANGE BURGER CLASS
    const [burgerLogo, setburgerLogo] = useState("burger-bar unclicked");
    const [menuClass, setmenuClass] = useState("menu hidden");
    const [menuClick, setmenuClick] = useState(false);

    // TOGGLE MENU CHANGE
    const displayMenu = () => {
        if(!menuClick){
            setburgerLogo("burger-bar clicked");
            setmenuClass("menu visible");
        }else{
            setburgerLogo("burger-bar unclicked");
            setmenuClass("menu hidden");
        }
        setmenuClick(!menuClick);
    }

    const handleDelete = () => {
        axios.get('http://localhost:3001/')
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err))
    }

  return (
    <section>
        <div className='header'>
            <nav>
                <div className='logo'>
                    <img className='logoTogether' src={logo} alt='logo together'/>
                    <p className="together">Together</p>
                </div>
                <div className='listCrud'>
                <ul>
                    <Link to="/connect-admin/home/create"><li>CREER</li></Link>
                    <Link to="/connect-admin/home/choiceUpdate"><li>MODIFIER</li></Link>
                    <Link to="/connect-admin/home/delete"><li>SUPPRIMER</li></Link>
                    <Link to="/connect-admin/home/read"><li>AFFICHER</li></Link>
                </ul>
                </div>
                <div className='btnDisconnect'>
                    <p onClick={handleDelete} className="text-danger mt-1 mb-1"><strong>DECONNEXION</strong></p>
                </div>
                <div className='burger'>
                    <div className='burger-menu' onClick={displayMenu}>
                        <div className={burgerLogo}></div>
                        <div className={burgerLogo}></div>
                        <div className={burgerLogo}></div>
                    </div>
                </div>
            </nav>
            <div className={menuClass}>
                <ul>
                    <Link className="burgerListCrud" to="/connect-admin/home/create"><li>CREER</li></Link>
                    <Link className="burgerListCrud" to="/connect-admin/home/choiceUpdate"><li>MODIFIER</li></Link>
                    <Link className="burgerListCrud" to="/connect-admin/home/delete"><li>SUPPRIMER</li></Link>
                    <Link className="burgerListCrud" to="/connect-admin/home/read"><li>AFFICHER</li></Link>
                    <li onClick={handleDelete} className="text-danger burgerListCrud">DECONNEXION</li>
                </ul>
            </div>
        </div>
    </section>
  );
}
  
  export default HeaderAdmin;