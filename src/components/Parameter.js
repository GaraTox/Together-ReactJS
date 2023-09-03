import React from "react";
import profil from '../assets/icons/person-circle.svg';
import plus from '../assets/icons/plus.svg';

function Parameter() {
    return (
        <section>
            <div className="blocParametre">
                <p className=" text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
                        <img className="imgPlus" src={plus} alt="plus"/>
                    </div>
                    <div className="infoPerso">
                        <p>ID</p>
                        <p>Pseudo <img src={plus} alt="plus"/></p>
                        <p>Adresse mail <img src={plus} alt="plus"/></p>
                    </div>
                </div>
            </div>
        </section>
    );
  }
  
  export default Parameter;