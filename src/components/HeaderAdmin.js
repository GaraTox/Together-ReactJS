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

    const handleLogout = () => {
        axios.post('/') // Envoyer une requête POST au serveur Node.js pour déconnecter
          .then(response => {
            // Réponse du serveur
            if (response.status === 200) {
              // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres actions nécessaires
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
                <div className='listCrud'>
                <ul>
                    <Link to="/connect-admin/home/create"><li>CREER</li></Link>
                    <Link to="/connect-admin/home/choiceUpdate"><li>MODIFIER</li></Link>
                    <Link to="/connect-admin/home/delete"><li>SUPPRIMER</li></Link>
                    <Link to="/connect-admin/home/read"><li>AFFICHER</li></Link>
                </ul>
                </div>
                <div className='btnDisconnect'>
                    <p onClick={handleLogout} className="text-danger mt-1 mb-1"><strong>DECONNEXION</strong></p>
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
                    <li onClick={handleLogout} className="text-danger burgerListCrud">DECONNEXION</li>
                </ul>
            </div>
        </div>
    </section>
  );
}
  
  export default HeaderAdmin;