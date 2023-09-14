import React from "react";
import { useSelector } from 'react-redux';
import { setIdUser, setAvatarUser, setPseudoUser, setMailUser } from '../redux/store';
import profil from '../assets/icons/person-circle.svg';

function Parameter() {
    const user = useSelector((state) => state.idUser);
    const pseudo = useSelector((state) => state.PseudoUser);
    const mail = useSelector((state) => state.mailUser);

    return (
        <section>
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
                    </div>
                    <div className="infoPerso">
                        <p>{user}</p>
                        <p>{pseudo}</p>
                        <p>{mail}</p>
                    </div>
                </div>
            </div>
        </section>
    );
  }
  
  export default Parameter;