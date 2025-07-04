import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Btnsm from '../btn/Btnsm';

function ModalModifyUser({closeModal}){
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [pseudoUser, setPseudoUser] = useState('');
  const [mailUser, setMailUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('idUser');
    axios.get(`/utilisateur/${user}`)
      .then(response => {
        setUser(response.data);
        setPseudoUser(response.data.pseudoUser);
        setMailUser(response.data.mailUser);
      })
      .catch(error => console.error(error));
  }, []);

  const handleUpdateUser = () => {
    const user = localStorage.getItem('idUser');
    axios.put(`/utilisateur/${user}`, { pseudoUser: pseudoUser, mailUser: mailUser })
      .then(response => console.log(response.data))
      .then(setMessage('Compte modifié avec succès'))
      .catch(error => console.error(error));
  };

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
                    <input type="text" className="form-control" id="pseudo" value={pseudoUser}
                    onChange={e => setPseudoUser(e.target.value)} name="pseudoUser" autoComplete="off"/>
                    <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
                    <input type="mail" className="form-control" id="mail" value={mailUser}
                    onChange={e => setMailUser(e.target.value)} name="mailUser" autoComplete="off"/>
                </div>
                <div className='footer mt-2'>
                    <Btnsm onClick={handleUpdateUser} type="submit" className="btn" caracteristique="sm" text="Modifier"/>
                </div>
                {message && <p className="text-center text-success">{message}</p>}
            </div>
        </section>
    )
}

export default ModalModifyUser;