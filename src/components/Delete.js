import React,{useState, useEffect} from "react";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Delete() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/read')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (idUser) => {
        axios.delete('http://localhost:3001/connect-admin/home/user/delete/'+idUser)
        .then(res => {
            navigate('/connect-admin/home');
        })
        .catch(err => console.log(err));
    }

    return (
    <section className="bg-admin">
        <div className="grid-admin">
        {data.map((user, index) => {
            return(
        <div key={index} className="text-center search">
            <div className="searchAvatar">
                <img src={profil} className="avatar" alt="avatar"/>
            </div>
            <p className="searchFirstname">{user.pseudoUser}</p>
            <p className="searchName">{user.mailUser}</p>
            <div className="searchButton">
                <Btnsm onClick={() => handleDelete(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Supprimer"/>
            </div> 
        </div>
        )})}
        </div>
    </section>
    );
  }
  
export default Delete;