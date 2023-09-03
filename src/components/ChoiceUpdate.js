import React from "react";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';

function ChoiceUpdate() {
    return (
        <section className="bg-admin">
        <div className="text-center mt-2 search">
            <div className="searchAvatar">
                <img src={profil} className="avatar" alt="avatar"/>
            </div>
            <p className="searchFirstname">Pseudo</p>
            <p className="searchName">Mail</p>
            <div className="searchButton">
                <Btnsm type="submit" className="btn" caracteristique="sm" text="Modifier"/>
            </div> 
        </div>
        <hr/>
    </section>
    );
  }
  
  export default ChoiceUpdate;