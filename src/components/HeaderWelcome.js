import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import search from '../assets/icons/search.svg';
import logo from '../assets/icons/logo.png';
import { Link } from "react-router-dom";

function HeaderWelcome() {
// SEARCHBAR
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
    try {
      const response = await fetch(`/search?search=${query}`);
      if (response.ok) {
        const data = await response.json();
        // Redirigez l'utilisateur vers la page des résultats avec les données de recherche
        navigate('/myprofile/resultsearch', { results: data });
      } else {
        console.error('Erreur lors de la recherche');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };
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
            <nav>
                <div className='logo'>
                    <Link to={`/myprofile/${users}`}><img className='logoTogether' src={logo} alt='logo together'/></Link>
                    <p className="together">Together</p>
                </div>
                <div className='formSearcher'>
                <form className="formSearch" method='GET' action='#'>
                    <input className='inputSearch border-light' type='search' 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Rechercher un ami ...' autoComplete='off'/>
                    <button onClick={handleSearch} className="btnSearch" type="submit">
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
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder='Rechercher un ami ...' autoComplete='off'/>
                    <button onClick={handleSearch} className="btn btn_search" type="submit">
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