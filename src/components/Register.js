import React, { useState } from "react";
import { Link } from "react-router-dom";
import Btnlg from './btn/Btnlg';
import axios from 'axios';

function Inscrire() {
  // INITIALISATION DES VALEURS
    const [pseudoReg, setPseudoReg] = useState('');
    const [mailReg, setMailReg] = useState('');
    const [birthdayReg, setBirthdayReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = (event) => {
      event.preventDefault();
      axios.post('http://localhost:3001/register', 
      {pseudoUser: pseudoReg, mailUser: mailReg, birthdayUser: birthdayReg, passwordUser: passwordReg})
      .then(res => {return res.redirect('/')})
      .then(err => console.log(err))
  }

    return (
        <section className="registerPage">
        <h3 className="text-center mt-2 createNewAccount">Création d'un nouveau compte</h3>
        <p className="text-center text-secondary completeForm">Veuillez renseigner le formulaire ci-dessous.</p>
        <div className="blocRegister">
        <form method="POST" className="formConnect text-center border border-dark p-3 rounded">
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input onChange={(e) => {setPseudoReg(e.target.value);}} type="text" className="form-control" id="pseudo" name="pseudoUser" autoComplete="off"/>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Adresse mail</label>
            <input onChange={(e) => {setMailReg(e.target.value);}} type="mail" className="form-control" id="mail" name="mailUser" autoComplete="off"/>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Date de naissance</label>
            <input onChange={(e) => {setBirthdayReg(e.target.value);}} type="date" className="form-control" id="birthday" name="birthdayUser" autoComplete="off" title="âge requis : 13 ans minimum" max="2010-12-01"/>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
            <input onChange={(e) => {setPasswordReg(e.target.value);}} type="password" className="form-control" id="passw" name="passwordUser" autoComplete="off"/>
          </div>
          <div className="mb-1">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label accepterConditions" htmlFor="gridCheck">Accepter les <Link className="conditionsUtili" to="/conditions">conditions d'utilisation</Link></label>
            </div>
          </div>
          <Btnlg onClick={register} type="submit" className="btn" caracteristique="lg" text="Confirmer l'inscription"/>
          </form>
        </div>
        <div className="accountExist">
            <p>Déjà un compte ? <Link to="/" className="connectVous">Se connecter !</Link></p>
          </div>
        </section>
    );
  }
  
  export default Inscrire;