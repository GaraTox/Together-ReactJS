import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import profil from '../assets/icons/person-circle.svg';
import plus from '../assets/icons/plus.svg';

function Parameter() {
    const idUser = useSelector((state) => state.idUser);
    const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/profil/${idUser}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
    console.log(idUser);
  }, [idUser]);

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
                        <p>{data.idUser}</p>
                        <p>{data.pseudoUser}<img src={plus} alt="plus"/></p>
                        <p>{data.mailUser} <img src={plus} alt="plus"/></p>
                    </div>
                </div>
            </div>
        </section>
    );
  }
  
  export default Parameter;