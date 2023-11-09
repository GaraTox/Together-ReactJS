import React,{ useState, useEffect } from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';
import profil from '../assets/icons/person.svg';

function Delete() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/read')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const deleteNews = (idUser) => {
        fetch(`/connect-admin/home/user/delete/${idUser}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'Actualité supprimée avec succès') {
              setUser(user.filter((user) => user.idUser !== idUser));
              setMessage('Compte supprimé avec succès');
            }
          });
      };
      
    return (
    <section className="bg-admin">
        <div className="grid-admin">
        {data.map((user, index) => {
            return(
        <div key={index} className="text-center search mt-2">
            <div className="searchAvatar">
                <img className="avatar border border-dark rounded-circle" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt="photo de profil"/>
            </div>
            <p className="searchFirstname">{user.pseudoUser}</p>
            <p className="searchName">{user.mailUser}</p>
            <div className="searchButton">
                <Btnsm onClick={() => deleteNews(user.idUser)} type="submit" className="btn" caracteristique="sm" text="Supprimer"/>
                {message && <p className="text-success">{message}</p>}
            </div> 
        </div>
        )})}
        </div>
    </section>
    );
  }
  
export default Delete;