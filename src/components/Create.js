import React from "react";
import Btnsm from '../components/btn/Btnsm';

function Create() {
    return (
        <section className="bg-admin">
        <h4 className="text-center pt-3">Créer un compte utilisateur</h4>
        <div className="blocCreate">
        <form method="POST" className="formCreate text-center p-3">
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input type="text" className="form-control" id="pseudo" name="Pseudo" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Adresse mail</label>
            <input type="email" className="form-control" id="mail" name="Mail" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Date de naissance</label>
            <input type="date" className="form-control" id="birthday" name="Birthday" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="passw" name="Passwords" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" required/>
              <label className="form-check-label accepterConditions" htmlFor="gridCheck">Accepter les conditions d'utilisation</label>
            </div>
          </div>
          <Btnsm type="submit" className="btn" caracteristique="sm" text="Créer"/>
          </form>
        </div>
        </section>
    );
  }
  
export default Create;