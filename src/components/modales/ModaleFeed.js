import React from 'react';
import send from '../../assets/icons/send.png';

function ModaleFeed({post, closeModal}){
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