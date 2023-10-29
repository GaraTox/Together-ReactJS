import React, {useState} from 'react';
import axios from 'axios';
import send from '../../assets/icons/send.png';
import { useParams } from 'react-router-dom';

function ModaleFeed({post, closeModal, idFeed}){
    const [commentary, setCommentary] = useState('');
    const idUser = localStorage.getItem('idUser');

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:3001/modale/comment`, {
        commentary: commentary,
        idFeed: idFeed,
        idUser: idUser
        })
      .then((res) => {
        console.log('Commentaire ajouté');
        console.log(post.idFeed)
        setCommentary('');
      })
      .catch((err) => {
        console.error(err);
        console.log(post.idFeed)
      });
};
    return(
        <section className='bg_modal_feed'>
            <div className='content_modal_feed'>
                <div className='titleCloseBtn'>
                    <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='body'>
                <div key={post.idFeed} className="blocPubli">
                    <div className="nomPubli">
                        <img className="imgProfil" src={post.avatarUser ? `http://localhost:3001/images/${post.avatarUser}` : ''} alt="photo de profil"/>
                        <p className="nameFirstname">{post.pseudoUser}</p>
                    </div>
                    <div className="blocCommentaire">
                        <p>{post.contentFeed}</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='formModale mt-2' method="#" action="#">
                        <input type="text" placeholder="Ecrire un commentaire..."
                        value={commentary} onChange={(e) => setCommentary(e.target.value)}/>
                        <button type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default ModaleFeed;