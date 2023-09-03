import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import Btnmd from './btn/Btnmd';
import axios from 'axios';

function Connect() {
 // INITIALISATION DES VALEURS
  const [mailUser, setMailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

axios.defaults.withCredentials = true;

// ACTION DU CLIQUE SUR LE BOUTON VALIDER INSCRIPTION
const login = (event) => {
  event.preventDefault();
  axios.post('http://localhost:3001/', 
  {mailUser: mailUser, passwordUser: passwordUser})
  .then(() => window.location = '/myprofile')
  .catch(err => console.log(err));
}

// useEffect(() => {
//   axios.get('http://localhost:3001/')
//   .then(res => {
//     window.location = '/';
//   });
// }, []);

    return (
        <section className="loginPage">
        <h1 className="titrePresentation mt-3">Bienvenue sur Together, <br/> le nouveau réseau social gratuit.</h1>
        <div className="blocForm">
        <form className="formConnect rounded" method="POST" action="#">
            <p className="dejaInscrit">Déjà inscrit ?</p>
            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
              <input onChange={(e) => {setMailUser(e.target.value);}} type="mail" className="form-control" id="mail" name="mailUser" autoComplete="off"/>
            </div>
            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
              <input onChange={(e) => {setPasswordUser(e.target.value);}} type="password" className="form-control" id="passw" name="passwordUser" autoComplete="off"/>
            </div>
            <p className="text-danger m-4">Mot de passe oublié ?</p>
            <Btnmd onClick={login} type="submit" className="btn" caracteristique="md" text="Se connecter"/>
          </form>
        </div>
          <div className="noAccount">
            <p>Pas de compte ? <Link to="/register" className="inscrivezVous">Inscrivez-vous !</Link></p>
          </div>
        </section>
    );
  }
  
  export default Connect;