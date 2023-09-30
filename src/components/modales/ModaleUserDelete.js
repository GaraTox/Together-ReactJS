import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Btnsm from '../btn/Btnsm';

function ModaleUserDelete({closeModal}){
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleDelete = async () => {
        const user = localStorage.getItem('idUser');
      try {
        await axios.delete(`/delete/${user}`);
        setMessage('Compte supprimé avec succès');
        navigate('/')
      } catch (error) {
        setMessage('Erreur lors de la suppression du compte');
      }
    };

    return(
        <section className='bg_modal_del'>
            <div className='content_modal_del'>
                <div className='titleDel'>
                    <h4 className='text-center'>Voulez-vous supprimer votre compte ?</h4>
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

export default ModaleUserDelete;