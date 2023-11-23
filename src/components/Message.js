import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profil from '../assets/icons/person-fill.svg';
import friend from '../assets/icons/people.svg';
import message from '../assets/icons/envelope.svg';
import send from '../assets/icons/send.png';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function Message() {
    const idUser = localStorage.getItem('idUser');

    axios.defaults.withCredentials = true;

    // RECUPERER LES AMIS AVEC UN SUIVI MUTUEL
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(false);
    // RECUPERER LES MESSAGES
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    // // CONVERSATION COMMENCE PAR LE BAS
    // const messagesContainerRef = useRef();

    // useEffect(() => {
    //     // Faire défiler vers le bas lorsque les messages changent
    //     if (messagesContainerRef.current) {
    //         messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    //     }
    // }, [messages]);

    // GESTION DE SESSION
    const [id, setId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/session')
        .then(res => {
            if(res.data.valid){
              setId(res.data.idUser);
            }else{
              navigate('/');
            }
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        // RECUPERE LES AMIS AVEC UN SUIVI MUTUEL
        socket.emit('join', idUser);
        socket.on('friends', ({ friends }) => {
          console.log('Friends with mutual follow:', friends);
          setFriends(friends);
        });
        return () => {
            socket.off('join');
        };
      }, [idUser]);

    // DEMARRE UNE CONVERSATION EN APPUYANT SUR SON AMI
    const startChat = id_Friend => {
        setSelectedFriend(id_Friend);
    };

      // RECUPERER LA CONVERSATION AVEC L'AMI
      useEffect(() => {
        // HISTORIQUE DES MESSAGES
        if (selectedFriend) {
        socket.emit('getConversation', { idUser, id_Friend: selectedFriend });
        socket.on('conversation', ({ messages }) => {
          setMessages(messages);
        });
        }
      }, [idUser, selectedFriend]);

      // RECEVOIR UN NOUVEAU EN TEMPS REEL
      useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // MET A JOUR L'ETAT DES MESSAGES
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };
        // ECOUTE LES NOUVEAUX MESSAGES
        socket.on('newMessage', handleNewMessage);
        // NETTOYER L'EMETTEUR
        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket]);

        // ENVOI LE MESSAGE
        const sendMessage = (e) => {
            e.preventDefault();
            if (messageInput.trim() !== '' && selectedFriend) {
              socket.emit('message', {
                idUser: idUser,
                idSender: selectedFriend,
                contentMessage: messageInput,
              });
              setMessageInput('');
            }
          };

    return (
    <section>
    <div className="contenuPrincipal">
        <div className="blocAmis">
            <button className="btn_friend" type="submit"><div className="titreAmis"><p className="text-center text-light bg bg-dark"><img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/><strong>Amis</strong></p></div></button>
            <div className="blocContenu text-center mt-2">
            <ul className="text-center">
                {friends.map(friend => (
                    <li className="listFriendMess" key={friend.idUser} onClick={() => startChat(friend.idUser)}>
                        <img className="border border-dark" src={friend.avatarUser ? `http://localhost:3001/images/${friend.avatarUser}` : profil} alt="photo de profil"/>
                        {friend.pseudoUser}
                        <hr/>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="blocMessage">
            <div className="titreMessage">
                <p className="text-center text-light bg bg-dark">
                    <img src={message} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="friend"/><strong>Messagerie privée</strong>
                </p>
            </div>
            {/*BODY*/}
            {!selectedFriend ? (
                <div className="choiceFriend">
                    <p>Choisissez un ami pour discuter</p>
                    <small className="text-secondary">Vous devez vous suivre mutuellement.</small>
                </div>
            ) : (
            <section>
                <div className='chat-body'>
                <p className="text-center convWith">Conversation avec {friends.find(friend => friend.idUser === selectedFriend)?.pseudoUser}</p>
                <div className='message'>
                {messages.map((message, index) => (
                    <div key={index} className="w-100" id={selectedFriend === message.idSender ? 'you' : 'other'}>
                        <div className='message-meta'>
                            <img className="imgProfilConv" src={message.avatarUser ? `http://localhost:3001/images/${message.avatarUser}` : profil} alt="photo de profil"/>
                            <p id="author">{message.pseudoUser}</p>
                            <p id="time">{message.timeMessage}</p>
                        </div>
                        <div className='message-content'>
                            <p>{message.contentMessage}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className='chat-footer'>
                <div>
                    <form id="form" action='#'>
                        <textarea type='text' className='form-control' rows="2" cols="50" maxLength="200" value={messageInput}
                        onChange={e => setMessageInput(e.target.value)} placeholder='Votre message ...' id="input" autoComplete="off" />
                        <button onClick={sendMessage} className='btnSend'>
                            <img src={send} alt="envoyer message privée"/>
                        </button>
                    </form>
                </div>
            </div>
            </section>
            )}
            </div>
        </div>
    </section>
    );
  }
  
  export default Message;