import React, {useState} from "react";
import search from '../assets/icons/search.svg';
import logo from '../assets/icons/logo.png';
import { Link } from "react-router-dom";
import axios from "axios";

function HeaderWelcome() {
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

    const handleLogout = () => {
        axios.post('/')
          .then(response => {
            // Réponse du serveur
            if (response.status === 200) {
              window.location.href = '/';
            }
          })
          .catch(error => {
            console.error('Erreur lors de la déconnexion :', error);
          });
      };

  return (
    <section>
        <div className='header'>
            <nav>
                <div className='logo'>
                    <img className='logoTogether' src={logo} alt='logo together'/>
                    <p className="together">Together</p>
                </div>
                <div className='formSearcher'>
                <form className="formSearch" method='GET' action='#'>
                    <input className='inputSearch border-light' type='search' placeholder='Rechercher un ami ...' autoComplete='off'/>
                    <button className="btnSearch" type="submit">
                    <img className="imgLoupe mb-1" src={search} alt="loupe"/>
                    </button>
                </form>
                </div>
                <div className='btnDisconnect'>
                    <Link><p onClick={handleLogout} className="text-danger pt-1"><strong>DECONNEXION</strong></p></Link>
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
                <form className='formBurger' method='GET' action='#'>
                    <input className='inputSearch border-light' type='search' placeholder='Rechercher un ami ...' autoComplete='off'/>
                    <button className="btn btn-outline-light bg bg-light btn_search" type="submit">
                    <img className="mb-1" src={search} alt="loupe"/>
                    </button>
                </form>
                <div className='btn_disconnect_burger'>
                    <p onClick={handleLogout} className="text-danger mt-1 pb-1"><strong>DECONNEXION</strong></p>
                </div>
            </div>
        </div>
    </section>
  );
}
  
  export default HeaderWelcome;