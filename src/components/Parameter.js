import React, {useState, useEffect} from "react";
import axios from "axios";
import Btnlg from './btn/Btnlg';
import profil from '../assets/icons/person-fill.svg';
import ModalModifyUser from "./modales/ModaleModifyUser";
import ModaleUserDelete from "./modales/ModaleUserDelete";
import Btnmd from "./btn/Btnmd";

function Parameter() {
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
            </div>
            </div>
        </section>
    );
  }
  
export default Parameter;