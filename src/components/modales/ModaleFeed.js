import React, {useState, useEffect} from 'react';
import axios from 'axios';
import send from '../../assets/icons/send.png';
import profil from '../../assets/icons/person-fill.svg';

function ModaleFeed({post, closeModal, idFeed}){
    const [commentary, setCommentary] = useState('');
    const [comments, setComments] = useState([]);
    const idUser = localStorage.getItem('idUser');

    // CREER UN COMMENTAIRE DE FEED
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
        console.log(err);
        console.log(post.idFeed)
      });
    };

    // AFFICHER LES COMMENTAIRES DE FEED
    useEffect(() => {
        if (idFeed) {
          // Appeler la route pour récupérer les commentaires associés
          axios.get(`/modale/getComment/${idFeed}`)
            .then((response) => {
              setComments(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [idFeed]);

    return(
        <section className='bg_modal_feed'>
            <div className='content_modal_feed'>
                <div className='titleCloseBtn'>
                    <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='body'>
                <div key={post.idFeed} className="blocPubli">
                    <div className="nomPubli">
                        <img className="imgProfil" src={post.avatarUser ? `http://localhost:3001/images/${post.avatarUser}` : profil} alt="photo de profil"/>
                        <p className="nameFirstname">{post.pseudoUser}</p>
                    </div>
                    <div className="blocCommentaire">
                        <p>{post.contentFeed}</p>
                    </div>
                </div>
                <div className='blocFormComm'>
                    <form onSubmit={handleSubmit} className='formModale' method="#" action="#">
                        <input type="text" placeholder="Ecrire un commentaire..."
                        value={commentary} onChange={(e) => setCommentary(e.target.value)}/>
                        <button type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                    </form>
                </div>
                <div className='blocAllComm'>
                    {comments.map((comment) => (
                    <div className='blocFeedComm' key={comment.idFeedCommentary}>
                        <div className='blocCommModale'>
                            <img className="imgProfilModale" src={comment.avatarUser ? `http://localhost:3001/images/${comment.avatarUser}` : profil} alt="photo de profil"/>
                            <p className='pseudoComm'>{comment.pseudoUser}</p>
                            <p className='createComm'>{comment.create}</p>
                        </div>
                        <div className='blocContentModal'>
                            <p>{comment.commentary}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
    )
}

export default ModaleFeed;