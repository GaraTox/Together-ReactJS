import React, {useState} from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';

function Create() {
   // INITIALISATION DES VALEURS
  const [pseudoReg, setPseudoReg] = useState('');
  const [mailReg, setMailReg] = useState('');
  const [birthdayReg, setBirthdayReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  // EVENEMENT DE CLIQUE
    const register = (event) => {
      event.preventDefault();
      axios.post('http://localhost:3001/connect-admin/home/user/create', 
      {pseudoUser: pseudoReg, mailUser: mailReg, birthdayUser: birthdayReg, passwordUser: passwordReg})
      .then(res => {return res.redirect('/connect-admin/home')})
      .then(err => console.log(err))
    }
    return (
        <section className="bg-admin">
        <h4 className="text-center pt-3">Créer un compte utilisateur</h4>
        <div className="blocCreate">
        <form method="POST" className="formCreate text-center p-3">
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input type="text" onChange={(e) => {setPseudoReg(e.target.value);}} className="form-control" id="pseudo" name="pseudoUser" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Adresse mail</label>
            <input type="email" onChange={(e) => {setMailReg(e.target.value);}} className="form-control" id="mail" name="mailUser" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Date de naissance</label>
            <input type="date" onChange={(e) => {setBirthdayReg(e.target.value);}} className="form-control" id="birthday" name="birthdayUser" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
            <input type="password" onChange={(e) => {setPasswordReg(e.target.value);}} className="form-control" id="passw" name="passwordUser" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" required/>
              <label className="form-check-label accepterConditions" htmlFor="gridCheck">Accepter les conditions d'utilisation</label>
            </div>
          </div>
          <Btnsm onClick={register} type="submit" className="btn" caracteristique="sm" text="Créer"/>
          </form>
        </div>
        </section>
    );
  }
  
export default Create;