import React, {useState} from "react";
import axios from "axios";
import { useFormik, Formik} from 'formik';
import { Validation } from "./controles/ValidationsRegister";
import { Link, useNavigate } from "react-router-dom";
import Btnsm from '../components/btn/Btnsm';

 // CONTROLES DE CHAMPS
 const initialValues = {
  pseudoUser: '',
  mailUser: '',
  birthdayUser: '',
  passwordUser: '',
  conditions: '',
}

function Create() {
  // CONTROLE DE CHAMPS
  const {handleBlur, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: Validation,
    onSubmit: (values) => {
        console.log(values)
    }
})

   // INITIALISATION DES VALEURS
  const [pseudoReg, setPseudoReg] = useState('');
  const [mailReg, setMailReg] = useState('');
  const [birthdayReg, setBirthdayReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [conditionReg, setConditionReg] = useState('');

  const [message, setMessage] = useState('');

  // EVENEMENT DE CLIQUE
    const register = (event) => {
      event.preventDefault();
      axios.post('http://localhost:3001/connect-admin/home/user/create', 
      {pseudoUser: pseudoReg, mailUser: mailReg, birthdayUser: birthdayReg, passwordUser: passwordReg})
      .then(setMessage('Compte ajouté avec succès')
      )
      .catch(err => console.log(err))
    }
    return (
        <section className="bg-admin">
        <h4 className="text-center pt-3">Créer un compte utilisateur</h4>
        <div className="blocCreate">
        <Formik initialValues={initialValues} validationSchema={Validation}>
        <form method="POST" className="formCreate text-center p-3">
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input type="text" onChange={(e) => {setPseudoReg(e.target.value);}} className="form-control" 
            value={pseudoReg} onBlur={handleBlur}
            id="pseudo" name="pseudoUser" autoComplete="off" required/>
            {errors.pseudoUser && <small>{errors.pseudoUser}</small>}
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Adresse mail</label>
            <input type="email" onChange={(e) => {setMailReg(e.target.value);}} className="form-control" 
            value={mailReg} onBlur={handleBlur}
            id="mail" name="mailUser" autoComplete="off" required/>
            {errors.mailUser && <small>{errors.mailUser}</small>}
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Date de naissance</label>
            <input type="date" onChange={(e) => {setBirthdayReg(e.target.value);}} className="form-control" 
            value={birthdayReg} onBlur={handleBlur}
            id="birthday" name="birthdayUser" title="âge requis : 16 ans minimum" max="2007-11-01" autoComplete="off" required/>
            {errors.birthdayUser && <small>{errors.birthdayUser}</small>}
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
            <input type="password" onChange={(e) => {setPasswordReg(e.target.value);}} className="form-control" 
            value={passwordReg} onBlur={handleBlur}
            id="passw" name="passwordUser" autoComplete="off" required/>
            {errors.passwordUser && <small>{errors.passwordUser}</small>}
          </div>
          <div className="mb-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" onBlur={handleBlur}
              onChange={(e) => {setConditionReg(e.target.value);}} value={conditionReg} required/>
              <label className="form-check-label accepterConditions" htmlFor="gridCheck">Accepter les conditions d'utilisation</label>
              {errors.conditions && <small className="d-flex">{errors.conditions}</small>}
            </div>
          </div>
          <Btnsm onClick={register} type="submit" className="btn" caracteristique="sm" text="Créer"/>
          {message && <p className="text-success">{message}</p>}
          </form>
          </Formik>
        </div>
        </section>
    );
  }
  
export default Create;