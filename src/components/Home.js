import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import friend from '../assets/icons/people.svg';
import profil from '../assets/icons/person.svg';
import send from '../assets/icons/send.png';
import conversation from '../assets/icons/conversation.png';
import modifier from '../assets/icons/modifier.png';
import supprimer from '../assets/icons/supprimer.png';
import aimer from '../assets/icons/aimer.png';
import commentaire from '../assets/icons/commentaire.png';
import signaler from '../assets/icons/signaler.png';

function Home() {
    // AFFICHER LES DONNEES DE L'UTILISATEUR
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const users = localStorage.getItem('idUser');

    useEffect(() => {
        const user = localStorage.getItem('idUser');
        console.log("user =>" + user);
        axios.get(`http://localhost:3001/myprofile/${user}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log("========L22 mon gars===========");
            console.log("error : ", error);
            console.log("Error user : " + user);
        })
    }, [])
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
            <button className="btn_friend" type="submit">
                <div className="titreAmis">
                    <p className="text-center text-light bg bg-dark">
                        <img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/>
                        <strong>Amis</strong>
                    </p>
                </div>
            </button>
            <div>
            <ul>
                {followingUsers.map(user => (
                    <li key={user.idUser}>
                        {user.pseudoUser}
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="blocPublication">
            <div className="blocInputComm">
                <div className="w-100">
                    <div>
                        <img className="imgProfil" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : ''} alt="photo de profil"/>
                        <form className="formPubli" method="#" action="#">
                            <input type="text" placeholder="Publier un post ..."/>
                            <button type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                        </form>
                    </div>
                    <Link className="blocConversation" to={`/myprofile/message/${users}`}>
                        <img className="messageConv" src={conversation} alt="messagerie privée"/>
                        <p className="mess">Messages</p>
                    </Link>
                </div>
            </div>

            <div className="blocPubli">
                <div className="nomPubli">
                    <img className="imgProfil" src={profil} alt="photo de profil"/>
                    <p className="nameFirstname">Pseudo</p>
                    <div className="modifierSupprimer">
                        <img className="imgModifier" src={modifier} alt="modifier le commentaire"/>
                        <img className="imgSupprimer" src={supprimer} alt="supprimer le commentaire"/>
                    </div>
                </div>
                <div className="blocCommentaire">
                    <p>yo la zone</p>
                </div>
                <div className="blocAimer">
                    <button type="submit" className="btnAime"><img className="imgAime" src={aimer} alt="j'aime"/><p>25</p></button>
                    <button type="submit" className="btnComm"><img className="imgComm" src={commentaire} alt="commentaire"/><p>10</p></button>
                    <button type="submit" className="btnSignaler"><img className="imgSignaler" src={signaler} alt="signaler"/></button>
                </div>
            </div>
        </div>
    </div>
    </section>
    );
  }
  
  export default Home;