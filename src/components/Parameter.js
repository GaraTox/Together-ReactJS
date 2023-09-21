import React from "react";
import profil from '../assets/icons/person-circle.svg';
import { useSelector } from 'react-redux';

function Parameter() {
    // NETTOYER REACT DEVTOOL
    // useEffect(() => {
    //     localStorage.clear();
    // })

    const idUser = useSelector(state => state.idUser);
    const pseudoUser = useSelector(state => state.pseudoUser);
    const mailUser = useSelector(state => state.mailUser);

    return (
        <section>
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
                    </div>
                    <div className="infoPerso">
                        <p>{idUser}</p>
                        <p>{pseudoUser}</p>
                        <p>{mailUser}</p>
                    </div>
                </div>
            </div>
        </section>
    );
  }
  
export default Parameter;