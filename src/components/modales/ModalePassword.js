import React from 'react';
import Btnsm from '../btn/Btnsm';

function ModalPassword({closeModal}){
    return(
        <section className='bg_modal'>
            <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'></div>
                    <h4 className='text-center'>Mot de passe oublié ?</h4>
                <div className='body'>
                    <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
                    <input type="mail" className="form-control" id="mail" name="mailUser" autoComplete="off"/>
                </div>
                <span className='text-secondary'>Vous allez recevoir un mail à cette adresse afin de modifier votre mot de passe.</span>
                <div className='footer'>
                    <Btnsm  type="submit" className="btn" caracteristique="sm" text="Envoyer"/>
                </div>
            </div>
        </section>
    )
}

export default ModalPassword;