import React, {useState, useEffect} from "react";
import axios from "axios";
import friend from '../assets/icons/people.svg';
import message from '../assets/icons/envelope.svg';

function Message() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const user = localStorage.getItem('idUser');
        axios.get(`http://localhost:3001/avatar/${user}`)
        .then(res => {
            setData(res.data[0])
        })
        .catch(err => console.log(err));
    }, [])
     // DISPLAY FRIEND
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
         getFollowingUsers();
    }, []);
    const getFollowingUsers = () => {
    const idUser = localStorage.getItem('idUser');
        axios.get(`/follow/${idUser}`)
        .then(response => {
            setFollowingUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching following users:', error);
        });
    };
    return (
    <section>
    <div className="contenuPrincipal">
        <div className="blocAmis">
            <button className="btn_friend" type="submit"><div className="titreAmis"><p className="text-center text-light bg bg-dark"><img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/><strong>Amis</strong></p></div></button>
            <div className="blocContenu text-center mt-2">
            <ul className="text-center">
                {followingUsers.map(user => (
                    <li key={user.idUser}>
                        <img className="w-25" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : ''} alt="photo de profil"/>
                        {user.pseudoUser}
                        <hr/>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="blocMessage">
            <div className="titreMessage"><p className="text-center text-light bg bg-dark"><img src={message} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="friend"/><strong>Messagerie privée</strong></p></div>
            <div className="blocContenu text-center">
                <p>Sélectionnez un(e) de vos ami(e) pour discuter</p>
            </div>
        </div>
    </div>
    </section>
    );
  }
  
  export default Message;