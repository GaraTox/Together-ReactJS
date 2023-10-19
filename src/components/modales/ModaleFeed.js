import React, {useState, useEffect} from 'react';
import send from '../../assets/icons/send.png';
import axios from 'axios';

function ModaleFeed({closeModal}){
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
    return(
        <section className='bg_modal_feed'>
            <div className='content_modal_feed'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='body'>
                {posts.map(post => (
                <div key={post.idFeed} className="blocPubli">
                    <div className="nomPubli">
                        <img className="imgProfil" src={post.avatarUser ? `http://localhost:3001/images/${post.avatarUser}` : ''} alt="photo de profil"/>
                        <p className="nameFirstname">{post.pseudoUser}</p>
                    </div>
                    <div className="blocCommentaire">
                        <p>{post.contentFeed}</p>
                    </div>
                </div>
                ))}
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