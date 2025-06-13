import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Btnlg from './btn/Btnlg';
import profil from '../assets/icons/person-fill.svg';
import ModalModifyUser from "./modales/ModaleModifyUser";
import ModaleUserDelete from "./modales/ModaleUserDelete";
import Btnmd from "./btn/Btnmd";

function Parameter(props) {
    const [message, setMessage] = useState('');

    // axios.defaults.withCredentials = true;

    // AFFICHER LES DONNEES DE L'UTILISATEUR
    const [user, setUser] = useState('');

     // MODALES
     const [openModalModi, setOpenModalModi] = useState(false);
     const [openModalDel, setOpenModalDel] = useState(false);

    // GESTION DE SESSION
    const [id, setId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      axios.get('http://localhost:3001/session')
      .then(res => {
        if(res.data.valid){
          setId(res.data.idUser);
        }else{
          navigate('/');
        }
      })
      .catch(err => console.log(err))
    },[])

    // RECUPERATION DES DONNEES GRACE A ID
    useEffect(() => {
        const user = localStorage.getItem('idUser');
        axios.get(`http://localhost:3001/myprofile/parameter/${user}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log("error : ", error);
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
                setMessage('Avatar ajouté')
                navigate(`/myprofile/${user}`)
            }else{
                setMessage('Avatar non ajouté')
            }})
        .catch(err => console.log(err))
    }

    return (
        <section>
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
                        <p>#{user.idUser}</p>
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
            </div>
            </div>
        </section>
    );
  }
  
export default Parameter;