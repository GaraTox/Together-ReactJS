import React from 'react';
import Btnsm from '../btn/Btnsm';

function ModaleUserDelete({closeModal}){
    return(
        <section className='bg_modal'>
            <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'></div>
                    <h4 className='text-center'>Voulez-vous supprimer votre compte ?</h4>
                <div className='footer'>
                    <Btnsm  type="submit" className="btn" caracteristique="sm" text="OUI"/>
                </div>
            </div>
        </section>
    )
}

export default ModaleUserDelete;