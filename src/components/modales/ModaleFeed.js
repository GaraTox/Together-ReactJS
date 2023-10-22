import React, {useState, useEffect} from 'react';
import send from '../../assets/icons/send.png';
import axios from 'axios';

function ModaleFeed({closeModal}){
    const [selectedPost, setSelectedPost] = useState(null); // Renommez l'état en selectedPost
  
    useEffect(() => {
      if (selectedPost) {
        axios.get(`/modalefeed/${selectedPost.idFeed}`)
          .then((response) => {
            setSelectedPost(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [selectedPost]);
    return(
        <section className='bg_modal_feed'>
            <div className='content_modal_feed'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='body'>
                {selectedPost && (
                <div key={selectedPost.idFeed} className="blocPubli">
                    <div className="nomPubli">
                        <img className="imgProfil" src={selectedPost.avatarUser ? `http://localhost:3001/images/${selectedPost.avatarUser}` : ''} alt="photo de profil"/>
                        <p className="nameFirstname">{selectedPost.pseudoUser}</p>
                    </div>
                    <div className="blocCommentaire">
                        <p>{selectedPost.contentFeed}</p>
                    </div>
                </div>
                )}
                <div>
                        <form className='formModale mt-2' method="#" action="#">
                            <input type="text" placeholder="Ecrire un commentaire..."/>
                            <button type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                        </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default ModaleFeed;