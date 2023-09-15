import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/icons/logo.png';

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

    const handleLogout = async () => {
        try {
          // Effectuez une requête GET vers la route de déconnexion côté serveur
          const response = await fetch('/logout', {
            method: 'GET',
            credentials: 'include', // Inclut les cookies dans la requête
          });
    
          if (response.status === 200) {
            // La déconnexion a réussi, vous pouvez rediriger l'utilisateur ou effectuer d'autres actions nécessaires
            window.location.href = '/'; // Redirection vers la page de connexion
          } else {
            // Gérez les erreurs de déconnexion
            console.error('Erreur lors de la déconnexion');
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
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
                    <Link to="/connect-admin/home/user" className="burgerListCrud"><li>UTILISATEURS</li></Link>
                    <Link to="/connect-admin/home/post" className="burgerListCrud"><li>PUBLICATIONS</li></Link>
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
                    <Link to="/connect-admin/home/user" className="burgerListCrud"><li>UTILISATEURS</li></Link>
                    <Link to="/connect-admin/home/post" className="burgerListCrud"><li>PUBLICATIONS</li></Link>
                    <li onClick={handleLogout} className="text-danger burgerListCrud">DECONNEXION</li>
                </ul>
            </div>
        </div>
    </section>
  );
}
  
  export default HeaderAdmin;