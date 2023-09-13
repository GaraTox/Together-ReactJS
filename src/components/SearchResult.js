import React from "react";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';

function SearchResult() {
    return (
    <section>
        <div className="grid-admin">

        <div className="text-center bg bg-light search">
            <div className="searchAvatar">
                <img src={profil} className="avatar" alt="avatar"/>
            </div>
            <p className="searchFirstname">Pseudo</p>
            <p className="searchName">Adresse mail</p>
            <div className="searchButton">
                <Btnsm type="submit" className="btn" caracteristique="sm" text="Ajouter"/>
            </div>
        </div>
 
        </div>
        <hr/>
    </section>
    );
  }
  
  export default SearchResult;