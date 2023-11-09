import React, {useState, useEffect} from "react";
import axios from "axios";
import profil from '../assets/icons/person-fill.svg';
import searchimg from '../assets/icons/search.svg';
import logo from '../assets/icons/logo.png';
import { Link, useNavigate } from "react-router-dom";
import Btnsm from "./btn/Btnsm";

function HeaderWelcome() {
// SEARCHBAR
const [inputVal, setInputVal] = useState("");
const [tab, setTab] = useState([])

const handleChangeInp = (e) => {
  const value = e.target.value;
  setInputVal(value)
  // console.log(value)
}

useEffect(() => {
  axios.post('http://localhost:3001/data', {pseudoUser: inputVal})
  .then((response) => {
    const resp = response.data;
      if(resp!==""){
        setTab(resp)
        // console.log(tab)
      }
  })
}, [inputVal])

const [followed, setFollowed] = useState(false);

// FOLLOW
const idUser = localStorage.getItem('idUser');
const suivreUtilisateur = (id_Friend) => {
  // Envoyez une requête au serveur Node.js pour suivre un utilisateur
  fetch('/friendship', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_User: idUser, id_Friend}),
  })
    .then(() => {
      console.log('Vous suivez cet utilisateur.');
      setFollowed(true);
      // navigate('/')
    })
    .catch((error) => console.error(error));
};

// UNFOLLOW
const handleUnfollow = (id_Friend) => {
  const idUser = localStorage.getItem('idUser');
  axios.post('/unfollow', { id_User: idUser, id_Friend })
    .then(response => {
      setFollowed(false);
    })
    .catch(error => {
      console.error(error);
    });
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
      // console.log("user =>" + user);
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
                  <input className='inputSearch border-light' type='search' placeholder="Rechercher un ami..."
                    onChange={(e) => {handleChangeInp(e)}} autoComplete="off"/>
                  <button type="submit" className="btnSearch">
                    <img className="imgLoupe mb-1" src={searchimg} alt="loupe"/>
                  </button>
                  <div className="results">
                    <ul>
                    {tab.map((user) => {
                        return(
                          <li className="lisearch" key={user.idUser}>
                            <img className="imgPhoto rounded-circle" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt=""/>
                            {user.pseudoUser}
                            {followed ? (
                              <Btnsm onClick={() => handleUnfollow(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Suivi(e)"/>
                            ) : (
                              <Btnsm onClick={() => suivreUtilisateur(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Suivre"/>
                            )}
                          </li>
                        )
                       })}
                    </ul>
                  </div>
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
                <form className="formBurger" method='GET' action='#'>
                  <input className='inputSearch border-light' type='search' placeholder="Rechercher un ami..."
                    onChange={(e) => {handleChangeInp(e)}} autoComplete="off"/>
                  <button type="submit" className="btnSearch">
                    <img className="imgLoupe mb-1" src={searchimg} alt="loupe"/>
                  </button>
                  <div className="results">
                    <ul className="ulsearch">
                    {tab.map((user) => {
                        return(
                          <li className="lisearch" key={user.idUser}>
                           <img className="imgPhoto rounded-circle" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt=""/>
                            {user.pseudoUser}
                            {followed ? (
                              <Btnsm onClick={() => handleUnfollow(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Suivi(e)"/>
                            ) : (
                              <Btnsm onClick={() => suivreUtilisateur(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Suivre"/>
                            )}
                          </li>
                        )
                       })}
                    </ul>
                  </div>
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