import React, {useState} from 'react';
import axios from 'axios';
import Btnsm from '../btn/Btnsm';

function ModaleAdminDelete({closeModal}){
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        const user = localStorage.getItem('idUser');
      try {
        await axios.delete(`/connect-admin/home/user/delete/${user}`);
        setMessage('Compte supprimé avec succès')
      } catch (error) {
        setMessage('Erreur lors de la suppression du compte');
      }
    };

    return(
        <section className='bg_modal_del'>
            <div className='content_modal_del'>
                <div className='titleDel'>
                    <h4 className='text-center'>Voulez-vous supprimer ce compte ?</h4>
                    {message && <p>{message}</p>}
                </div>
                <div className='bodyDel'>
                    <Btnsm onClick={handleDelete} className="btn" caracteristique="sm" text="OUI"/>
                    <Btnsm onClick={() => closeModal(false)} className="btn" caracteristique="sm" text="NON"/>
                </div>
            </div>
        </section>
    )
}

export default ModaleAdminDelete;