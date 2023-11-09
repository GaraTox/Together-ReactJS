import React, {useState, useEffect} from "react";
import axios from "axios";
import profil from '../assets/icons/person-fill.svg';
import friend from '../assets/icons/people.svg';
import message from '../assets/icons/envelope.svg';
import send from '../assets/icons/send.png';

function Message() {
    // DISPLAY FRIEND
    const [followingUsers, setFollowingUsers] = useState([]);
    // SELECT FRIEND
    const [seletedFriend, setSelectedFriend] = useState(null);
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

    // AMI SELECTIONNE
    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
      };

    return (
    <section>
    <div className="contenuPrincipal">
        <div className="blocAmis">
            <button className="btn_friend" type="submit"><div className="titreAmis"><p className="text-center text-light bg bg-dark"><img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/><strong>Amis</strong></p></div></button>
            <div className="blocContenu text-center mt-2">
            <ul className="text-center">
                {followingUsers.map(user => (
                    <li className="listFriendMess" key={user.idUser} onClick={() => handleFriendClick(user)}>
                        <img className="border border-dark" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt="photo de profil"/>
                        {user.pseudoUser}
                        <hr/>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="blocMessage">
            <div className="titreMessage"><p className="text-center text-light bg bg-dark"><img src={message} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="friend"/><strong>Messagerie privée</strong></p></div>
            {/*BODY*/}
            <div className='chat-body'>
                <div className='message'>
                    <div className="w-100">
                        <div className='message-meta'>
                            <p id="author">moi</p>
                            <p id="time">02-02</p>
                        </div>
                        <div className='message-content'>
                            <p>coucou</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*FOOTER*/}
            <div className='chat-footer'>
                <div>
                    <form id="form" action='#'>
                        <textarea type='text' className='form-control' rows="2" cols="50" maxLength="200"
                        placeholder='Votre message ...' id="input" autoComplete="off" />
                        <button className='btnSend'>
                            <img src={send} alt="envoyer message privée"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </section>
    );
  }
  
  export default Message;