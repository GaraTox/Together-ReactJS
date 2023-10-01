import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import search from '../assets/icons/search.svg';
import logo from '../assets/icons/logo.png';
import { Link } from "react-router-dom";

function HeaderWelcome() {
// SEARCHBAR
  //   const [query, setQuery] = useState('');
  //   const navigate = useNavigate();

  //   const handleSearch = async () => {
  //   try {
  //     const response = await fetch(`/search?query=${query}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Redirigez l'utilisateur vers la page des résultats avec les données de recherche
  //       navigate('/myprofile/resultsearch', { results: data });
  //     } else {
  //       console.error('Erreur lors de la recherche');
  //     }
  //   } catch (error) {
  //     console.error('Erreur réseau :', error);
  //   }
  // };
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

    // DECONNEXION
    const handleLogout = async () => {
        try {
          const response = await fetch('/logout', {
            method: 'GET',
            credentials: 'include', // Inclut les cookies dans la requête
          });
    
          if (response.status === 200) {
            window.location.href = '/'; // Redirection vers la page de connexion
            localStorage.clear();
          } else {
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
                    <Link to="/myprofile"><img className='logoTogether' src={logo} alt='logo together'/></Link>
                    <p className="together">Together</p>
                </div>
                <div className='formSearcher'>
                <form className="formSearch" method='GET' action='#'>
                    <input className='inputSearch border-light' type='search' 
                    // value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    placeholder='Rechercher un ami ...' autoComplete='off'/>
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
                    <input className='inputSearch border-light' type='search'
                    placeholder='Rechercher un ami ...' autoComplete='off'/>
                    <button className="btn btn_search" type="submit">
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