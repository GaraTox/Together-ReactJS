import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../assets/icons/logo2.png';

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
            localStorage.clear();
          } else {
            // Gérez les erreurs de déconnexion
            console.error('Erreur lors de la déconnexion');
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
      };

      const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const users = localStorage.getItem('idUser');
    useEffect(() => {
      const user = localStorage.getItem('idUser');
      console.log("user =>" + user);
      axios.get(`http://localhost:3001/myprofile/${user}`)
      .then((response) => {
          setUser(response.data);
      })
      .catch((error) => {
          console.log("========L22 mon gars===========");
          console.log("error : ", error);
          console.log("Error user : " + user);
      })
  }, [])
  useEffect(() => {
      const user = localStorage.getItem('idUser');
      axios.get(`http://localhost:3001/avatar/${user}`)
      .then(res => {
          setData(res.data[0])
      })
      .catch(err => console.log(err));
  }, [])


  return (
    <section>
        <div className='header'>
            <nav className="navAdmin">
                  <div className='logo'>
                    <Link to={`/myprofile/${users}`}><img className='logoTogether' src={logo} alt='logo together'/></Link>
                    <p className="together">Together</p>
                  </div>
                <div className='listCrud'>
                <ul>
                    <Link to="/connect-admin/home/user" className="burgerListCrud"><li>UTILISATEURS</li></Link>
                    <Link to="/connect-admin/home/post" className="burgerListCrud"><li>PUBLICATIONS</li></Link>
                </ul>
                </div>
                <div className='btnDisconnect'>
                    <p onClick={handleLogout} className="text-danger mt-1 mb-1 btnDisc"><strong>DECONNEXION</strong></p>
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