import React, {useState, useEffect} from "react";
import axios from "axios";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';
import ModaleAdminUpdate from "./modales/ModaleAdminUpdate";

function ChoiceUpdate() {
    const [openModaleAdminUpdate, setOpenModaleAdminUpdate] = useState(false);

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/choiceUpdate')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return (
        <section className="bg-admin">
            {openModaleAdminUpdate && <ModaleAdminUpdate closeModal={setOpenModaleAdminUpdate}/>}
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
                        <Btnsm onClick={() => {setOpenModaleAdminUpdate(true)}} type="submit" className="btn" caracteristique="sm" text="Modifier"/>
                    </div> 
                </div>
            )})}
            </div>
            <hr/>
    </section>
    );
  }
  
  export default ChoiceUpdate;