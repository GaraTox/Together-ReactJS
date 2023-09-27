import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import profil from '../assets/icons/person-circle.svg';
// import { useSelector } from 'react-redux';

function Parameter() {
    // NETTOYER REACT DEVTOOL
    // useEffect(() => {
    //     localStorage.clear();
    // })

    const {idUser} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(localStorage.getItem('idUser'));
        axios.get(`http://localhost:3001/myprofile/parameter/${idUser}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [idUser])

    // const idUser = useSelector((state) => state.idUser);
    // const pseudoUser = useSelector((state) => state.pseudoUser);
    // const mailUser = useSelector((state) => state.mailUser);

    return (
        <section>
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                {user ? (
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
                    </div>
                    <div className="infoPerso">
                        <p>{user.pseudoUser}</p>
                        <p>{user.mailUser}</p>
                    </div>
                </div>
                ) : (
                    <p>Chargement ma couille</p>
                )}
            </div>
        </section>
    );
  }
  
export default Parameter;