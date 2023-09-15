import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';
import ModalModifyUser from "./modales/ModaleModifyUser";

function ChoiceUpdate() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/choiceUpdate')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return (
        <section className="bg-admin">
            <div className="grid-admin">
            {data.map((user, key) => {
                return(
                <div className="text-center search">
                    <div className="searchAvatar">
                        <img src={profil} className="avatar" alt="avatar"/>
                    </div>
                    <p className="searchFirstname">{user.pseudoUser}</p>
                    <p className="searchName">{user.mailUser}</p>
                    <div className="searchButton">
                        <Link to={`/connect-admin/home/user/update/${user.idUser}`}><Btnsm type="submit" className="btn" caracteristique="sm" text="Modifier"/></Link>
                    </div> 
                </div>
            )})}
            </div>
            <hr/>
    </section>
    );
  }
  
  export default ChoiceUpdate;