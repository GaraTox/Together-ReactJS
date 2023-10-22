import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import friend from '../assets/icons/people.svg';
import send from '../assets/icons/send.png';
import conversation from '../assets/icons/conversation.png';
import modifier from '../assets/icons/modifier.png';
import supprimer from '../assets/icons/supprimer.png';
import aimer from '../assets/icons/aimer.png';
import commentaire from '../assets/icons/commentaire.png';
import signaler from '../assets/icons/signaler.png';
import ModaleFeed from "./modales/ModaleFeed";

function Home() {
    // MODALE
    const [openModal, setOpenModal] = useState(false);
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

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

    // AJOUTER FEED
    const [contentFeed, setContentFeed] = useState('');
    const handlePost = async () => {
        const idUser = localStorage.getItem('idUser');
        try {
          await axios.post('/addfeed', { idUser: idUser, contentFeed });
          console.log('le post a été envoyer')
        } catch (error) {
          console.error('Erreur lors de la création de la publication : ' + error);
        }
      }

    // LIRE FEED
    const [posts, setPosts] = useState([]);
    const idUser = localStorage.getItem('idUser');
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`/readfeed/${idUser}`);
          setPosts(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des publications : ' + error);
        }
      };
  
      fetchPosts();
    }, [idUser]);
    
    return (
    <section>
    {openModal && <ModaleFeed idFeed={selectedFeed} closeModal={setOpenModal}/>}
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
            <ul className="text-center">
                {followingUsers.map(user => (
                    <li key={user.idUser}>
                        {user.pseudoUser}
                        <hr/>
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
                            <input type="text" placeholder="Publier un post ..." value={contentFeed}
                            onChange={(e) => setContentFeed(e.target.value)}/>
                            <button onClick={handlePost} type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                        </form>
                    </div>
                    <Link className="blocConversation" to={`/myprofile/message/${users}`}>
                        <img className="messageConv" src={conversation} alt="messagerie privée"/>
                        <p className="mess">Messages</p>
                    </Link>
                </div>
            </div>
            {posts.map(post => (
                <div key={post.idFeed} className="blocPubli">
                <div className="nomPubli">
                <img className="imgProfil" src={post.avatarUser ? `http://localhost:3001/images/${post.avatarUser}` : ''} alt="photo de profil"/>
                    <p className="nameFirstname">{post.pseudoUser}</p>
                    <div className="modifierSupprimer">
                        <img className="imgModifier" src={modifier} alt="modifier le commentaire"/>
                        <img className="imgSupprimer" src={supprimer} alt="supprimer le commentaire"/>
                    </div>
                </div>
                <div onClick={() => {setOpenModal(true)}} className="blocCommentaire">
                    <p>{post.contentFeed}</p>
                </div>
                <div className="blocAimer">
                    <button type="submit" className="btnAime"><img className="imgAime" src={aimer} alt="j'aime"/></button>
                    <button type="submit" className="btnComm"><img className="imgComm" src={commentaire} alt="commentaire"/></button>
                    <button type="submit" className="btnSignaler"><img className="imgSignaler" src={signaler} alt="signaler"/></button>
                </div>
            </div>
            ))}
            
        </div>
    </div>
    </section>
    );
  }
  
  export default Home;