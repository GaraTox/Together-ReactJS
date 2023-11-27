import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import bcrypt from 'bcryptjs-react';
import Btnmd from './btn/Btnmd';

function ResetPassword() {

  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;
  const [idUser, setIdUser] = useState('');
  const [error, setError] = useState(false);
  const [mdp, setMdp] = useState('');
  const [confirmMdp, setConfirmMdp] = useState('');
  const [errMdp, setErrMdp] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/verify-token', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            console.log(response.data);
            if (!response.data) {
                setError(true);
            }
            console.log(response.data.idUser);
            setIdUser(response.data.idUser)
        })
        .catch(error => {
            console.log('TOKEN INVALIDE', error)
        });
}, [token])

const handleSubmit = async (e) => {
  e.preventDefault();
  if (mdp !== confirmMdp) {
      setErrMdp(true);
  } else {
      const saltRounds = 10;
      try {
          const hashed = await bcrypt.hash(mdp, saltRounds);
          // Effectuez la requête Axios pour mettre à jour le mot de passe
          const response = await axios.post(`http://localhost:3001/reset`, { idUser, hashed });
          console.log(response.data);
          alert('Mot de passe réinitialisé avec succès');
          navigate('/');

      } catch (error) {
          console.error("Erreur lors du changement de mot de passe:", error);
      }
  }
}
    return (
        <section className="resetPage">
        {error ? (
          <h1>Lien Invalide ou expiré</h1>
        ) : (
        <div className="resetForm">
          <p className="text-center text-secondary">Réinitialisez votre mot de passe.</p>
        <div>
        <form onSubmit={handleSubmit} method="POST" className="text-center border border-dark p-3 rounded">
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Nouveau mot de passe : </label>
            <input  type="password" value={mdp} onChange={(e) => {setMdp(e.target.value)}}
            className="form-control" id="mdp" name="mdp" autoComplete="off" required/>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Confirmer mot de passe : </label>
            <input type="password" value={confirmMdp} onChange={(e) => { setConfirmMdp(e.target.value) }}
            className="form-control" id="confirmMdp" name="confirmMdp" autoComplete="off" required/>
          </div>
          {errMdp && (<p className='text-danger'>Les champs saisis ne sont pas identiques</p>)}
          <Btnmd type="submit" className="btn" caracteristique="md" text="Réinitialiser"/>
          </form>
        </div>
        </div>
        )}
        </section>
    );
  }
  
  export default ResetPassword;