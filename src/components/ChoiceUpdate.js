import React, {useState, useEffect} from "react";
import axios from "axios";
import profil from '../assets/icons/person.svg';
import Btnsm from '../components/btn/Btnsm';

function ChoiceUpdate() {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const closeModal = () => {
        setSelectedUser(null);
    };

    // LIRE TOUS LES UTILISATEURS
    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/choiceUpdate/read')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    // SELECTIONNE LE USER ET SES DONNEES
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    // MODIFIER UTILISATEUR
    const handleUpdateUser = () => {
        axios.put(`http://localhost:3001/connect-admin/home/user/choiceUpdate/${selectedUser.idUser}`, selectedUser)
          .then((response) => {
            console.log('Utilisateur mis à jour avec succès');
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          });
      };

    return (
        <section className="bg-admin">
            {selectedUser && (
            <div className="bg_modal">
                <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'>
                    <h4 className='text-center'>Modifier ce profil</h4>
                </div>
                <div className='body'>
                    <label htmlFor="exampleInput" className="form-label">Pseudo</label>
                    <input type="text" className="form-control" id="pseudo"
                    value={selectedUser.pseudoUser}
                    onChange={(e) => setSelectedUser({ ...selectedUser, pseudoUser: e.target.value })}
                    name="pseudoUser" autoComplete="off"/>
                    <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
                    <input type="mail" className="form-control mb-1" id="mail" 
                    name="mailUser" autoComplete="off"
                    value={selectedUser.mailUser} onChange={(e) => setSelectedUser({ ...selectedUser, mailUser: e.target.value })}/>
                </div>
                <div className='footer'>
                    <Btnsm onClick={handleUpdateUser} type="submit" className="btn" caracteristique="sm" text="Modifier"/>
                </div>
            </div>
            </div>
            )}
            <div className="grid-admin">
            {data.map((user, key) => {
                return(
                <div key={key} className="text-center search mt-2">
                    <div className="searchAvatar">
                        <img className="avatar border border-dark rounded-circle" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt="photo de profil"/>
                    </div>
                    <p className="searchFirstname">{user.pseudoUser}</p>
                    <p className="searchName">{user.mailUser}</p>
                    <div className="searchButton">
                        <Btnsm onClick={() => handleSelectUser(user)} type="submit" className="btn" caracteristique="sm" text="Modifier"/>
                    </div>
                </div>
            )})}
            </div>
    </section>
    );
  }
  
  export default ChoiceUpdate;