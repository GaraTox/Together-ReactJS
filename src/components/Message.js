import React, {useState, useEffect} from "react";
import axios from "axios";
import profil from '../assets/icons/person-fill.svg';
import friend from '../assets/icons/people.svg';
import message from '../assets/icons/envelope.svg';
import send from '../assets/icons/send.png';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function Message(id_Friend) {
    // // DISPLAY FRIEND
    // const [followingUsers, setFollowingUsers] = useState([]);
    // // SELECT FRIEND
    // const [seletedFriend, setSelectedFriend] = useState(null);
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const user = localStorage.getItem('idUser');
    //     axios.get(`http://localhost:3001/avatar/${user}`)
    //     .then(res => {
    //         setData(res.data[0])
    //     })
    //     .catch(err => console.log(err));
    // }, [])

    // // DISPLAY FRIEND
    // useEffect(() => {
    //      getFollowingUsers();
    // }, []);
    // const getFollowingUsers = () => {
    // const idUser = localStorage.getItem('idUser');
    //     axios.get(`/follow/${idUser}`)
    //     .then(response => {
    //         setFollowingUsers(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching following users:', error);
    //     });
    // };

    // // AMI SELECTIONNE
    // const handleFriendClick = (friend) => {
    //     setSelectedFriend(friend);
    //   };

    const idUser = localStorage.getItem('idUser');
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        socket.emit('join', { idUser: idUser });
        socket.on('join', ({ friend }) => {
            setFriends(friend);
        });
    }, [idUser]);

    const startChat = id_Friend => {
        setSelectedFriend(id_Friend);
      };
      const sendMessage = () => {
        if (messageInput.trim() !== '' && selectedFriend) {
          socket.emit('message', {
            idUser: idUser,
            idSender: selectedFriend,
            contentMessage: messageInput,
          });
          setMessageInput('');
        }
      };

      // RECUPERER LA CONVERSATION AVEC L'AMI
      useEffect(() => {
        // HISTORIQUE DES MESSAGES
        socket.emit('getConversation', { idUser, id_Friend });
        socket.on('conversation', ({ messages }) => {
          setMessages(messages);
        });
      }, [idUser, id_Friend]);

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
            {selectedFriend && (
            <section>
                <div className='chat-body'>
                <h3>Conversation avec ({selectedFriend})</h3>
                <div className='message'>
                {messages.map((message, index) => {
                    <div key={index} className="w-100">
                        <div className='message-meta'>
                            <p id="author">{message.idSender}</p>
                            <p id="time">{message.contentMessage}</p>
                        </div>
                        <div className='message-content'>
                            <p>{message.contentMessage}</p>
                        </div>
                    </div>
                })}
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