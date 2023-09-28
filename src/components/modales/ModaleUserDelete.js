import React from 'react';
import Btnsm from '../btn/Btnsm';

function ModaleUserDelete({closeModal}){
    return(
        <section className='bg_modal_del'>
            <div className='content_modal_del'>
                <div className='titleDel'>
                    <h4 className='text-center'>Voulez-vous supprimer votre compte ?</h4>
                </div>
                <div className='bodyDel'>
                    <Btnsm className="btn" caracteristique="sm" text="OUI"/>
                    <Btnsm onClick={() => closeModal(false)} className="btn" caracteristique="sm" text="NON"/>

                </div>
            </div>
        </section>
    )
}

export default ModaleUserDelete;