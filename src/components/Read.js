import React, { useState } from "react";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';
import { useEffect } from "react";
import axios from "axios";

function Read() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/read')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return (
    <section className="bg-admin">
        <div className="grid-admin">
        {data.map((user, key) => {
            return(
            <div key={key} className="text-center search">
                <div className="searchAvatar">
                    <img src={profil} className="avatar" alt="avatar"/>
                </div>
                <p className="searchFirstname">{user.pseudoUser}</p>
                <p className="searchName">{user.mailUser}</p>
                <div className="searchButton">
                    <Btnsm type="submit" className="btn" caracteristique="sm" text={user.roleUser}/>
                </div> 
            </div>        
        )})}
        </div>
    </section>
    );
  }
  
export default Read;