import React from 'react';
import Btnsm from '../btn/Btnsm';

function ModalModifyUser({closeModal}){
    return(
        <section className='bg_modal'>
            <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'>
                    <h4 className='text-center'>Modifier votre profil</h4>
                </div>
                <div className='body'>
                    <label htmlFor="exampleInput" className="form-label">Pseudo</label>
                    <input type="text" className="form-control" id="pseudo" name="pseudoUser" autoComplete="off"/>
                    <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
                    <input type="mail" className="form-control" id="mail" name="mailUser" autoComplete="off"/>
                </div>
                <div className='footer'>
                    <Btnsm  type="submit" className="btn" caracteristique="sm" text="Confirmer"/>
                </div>
            </div>
        </section>
    )
}

export default ModalModifyUser;