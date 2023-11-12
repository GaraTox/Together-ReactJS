import React, {useState, useEffect} from "react";
import axios from "axios";
import Btnlg from './btn/Btnlg';
import profil from '../assets/icons/person-fill.svg';
import ModalModifyUser from "./modales/ModaleModifyUser";
import ModaleUserDelete from "./modales/ModaleUserDelete";
import Btnmd from "./btn/Btnmd";

function Parameter(props) {
    // NETTOYER REACT DEVTOOL
    // useEffect(() => {
    //     localStorage.clear();
    // })

    // AFFICHER LES DONNEES DE L'UTILISATEUR
    const [user, setUser] = useState('');

     // MODALES
     const [openModalModi, setOpenModalModi] = useState(false);
     const [openModalDel, setOpenModalDel] = useState(false);

    // RECUPERATION DES DONNEES GRACE A ID
    useEffect(() => {
        const user = localStorage.getItem('idUser');
        // console.log("user =>" + user);
        axios.get(`http://localhost:3001/myprofile/parameter/${user}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log("========L24===========");
            console.log("error : ", error);
            console.log("Error user : " + user);
        })
    }, [])

    // AVATAR
    const [file, setFile] = useState();
    const [data, setData] = useState([]);
    const handleFile = (event) => {
        setFile(event.target.files[0])
    }
    useEffect(() => {
        const user = localStorage.getItem('idUser');
        axios.get(`http://localhost:3001/avatar/${user}`)
        .then(res => {
            setData(res.data[0])
        })
        .catch(err => console.log(err));
    }, [])
    const handleUpload = () => {
        const user = localStorage.getItem('idUser');
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`http://localhost:3001/upload/${user}`, formdata)
        .then(res => 
            {if(res.data.Status === "Success"){
                console.log('Success for avatar')
            }else{
                console.log('Failed for avatar')
            }})
        .catch(err => console.log(err))
    }

    // WEATHER
    const [state, setState] = useState({ icon: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
  
    useEffect(() => {
      if (city) {
        updateWeather();
      }
    }, [city]);
  
    const updateWeather = () => {
      const APIKEY = "19efad4825a8fc6b7271f1f4c07ede57";
  
      setLoading(true);
      setError(null);
  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
        .then((response) => {
          setState({
            icon: response.data.weather[0].icon
          });
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setError("Ville non trouvée. Veuillez vérifier le nom de la ville.");
          } else {
            setError("Erreur lors de la récupération des données météorologiques.");
          }
          console.error("Erreur", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    return (
        <section className="bg-user">
            {openModalModi && <ModalModifyUser closeModal={setOpenModalModi}/>}
            {openModalDel && <ModaleUserDelete closeModal={setOpenModalDel}/>}
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto rounded-circle" src={data.avatarUser ? `http://localhost:3001/images/${data.avatarUser}` : profil} alt=""/>
                        <p className="choiceAvatar">Choisissez un avatar</p>
                        <input type="file" name="avatar" onChange={handleFile}/>
                        <Btnmd onClick={handleUpload} className="btn" caracteristique="md" text="Ajouter l'avatar"/>
                    </div>
                    {user ? (
                    <div className="infoPerso">
                        <p>ID: {user.idUser}</p>
                        <p>{user.pseudoUser}</p>
                        <p>{user.mailUser}</p>
                    </div>
                    ) : (
                    <p>Chargement</p>
                    )}
                </div>
                <div className="mode">
                <div className="btnDelete">
                    <Btnlg onClick={() => {setOpenModalModi(true)}}  className="btn" caracteristique="lg" text="Modifier votre profil"/>
                    <Btnlg onClick={() => {setOpenModalDel(true)}} className="btn" caracteristique="lg mt-3" text="Supprimer ce compte"/>
                </div>
                <div className="weather">
                    <label>Entrez le nom de la ville :
                        <input className="inputWeather" type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                    </label>
                    <p>{city && `A ${city}, il fait :`}
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                    <>
                    {state.icon && (
                        <img src={`https://openweathermap.org/img/w/${state.icon}.png`} alt="weather" />
                    )}
                    <button onClick={updateWeather}>Mettre à jour</button>
                    {error && city && <div style={{ color: 'red' }}>{error}</div>}
                    </>
                    )}
                    </p>
                </div>
            </div>
            </div>
        </section>
    );
  }
  
export default Parameter;