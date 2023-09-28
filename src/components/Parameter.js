import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import profil from '../assets/icons/person-circle.svg';
import Btnlg from './btn/Btnlg';
import ModalModifyUser from "./modales/ModaleModifyUser";
import ModaleUserDelete from "./modales/ModaleUserDelete";

function Parameter() {
    // NETTOYER REACT DEVTOOL
    // useEffect(() => {
    //     localStorage.clear();
    // })
    
    const {idUser} = useParams();
    const [user, setUser] = useState('');

     // MODALE
     const [openModalModi, setOpenModalModi] = useState(false);
     const [openModalDel, setOpenModalDel] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('idUser');
        console.log("user =>" + user);
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

    // const idUser = useSelector((state) => state.idUser);
    // const pseudoUser = useSelector((state) => state.pseudoUser);
    // const mailUser = useSelector((state) => state.mailUser);

    return (
        <section>
            {openModalModi && <ModalModifyUser closeModal={setOpenModalModi}/>}
            {openModalDel && <ModaleUserDelete closeModal={setOpenModalDel}/>}
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
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