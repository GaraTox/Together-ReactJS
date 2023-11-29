import React, { useState } from "react";
import { useFormik, Formik} from 'formik';
import { Validation } from "./controles/ValidationsRegister";
import { Link, useNavigate } from "react-router-dom";
import Btnlg from './btn/Btnlg';
import axios from 'axios';

  // CONTROLES DE CHAMPS
  const initialValues = {
    pseudoUser: '',
    mailUser: '',
    birthdayUser: '',
    passwordUser: '',
    conditions: '',
}


function Inscrire() {
  // CONTROLE DE CHAMPS
  const {handleBlur, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: Validation,
    onSubmit: (values) => {
        console.log(values)
    }
})

const navigate = useNavigate();

  // INITIALISATION DES VALEURS
    const [pseudoUser, setPseudoUser] = useState('');
    const [mailUser, setMailUser] = useState('');
    const [birthdayUser, setBirthdayUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const [message, setMessage] = useState('');

  // EVENEMENT DE CLIQUE
    const register = (event) => {
      event.preventDefault();
      axios.post('http://localhost:3001/register', 
      {pseudoUser: pseudoUser, mailUser: mailUser, birthdayUser: birthdayUser, passwordUser: passwordUser})
      .then(res => {
        console.log(res.data)
          navigate('/')
      })
      .catch(err => {
        setMessage("Vous devez avoir 15 ans minimum");
      })
    }

    return (
        <section className="registerPage">
        <h3 className="text-center mt-2 createNewAccount">Création d'un nouveau compte</h3>
        <p className="text-center text-secondary completeForm">Veuillez renseigner le formulaire ci-dessous.</p>
        <div className="blocRegister">
          <Formik initialValues={initialValues} validationSchema={Validation}>
        <form method="POST" className="formConnect text-center border border-dark p-3 rounded">
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input onChange={(e) => {setPseudoUser(e.target.value);}} type="text" 
            value={pseudoUser} onBlur={handleBlur}
            className="form-control" id="pseudo" name="pseudoUser" autoComplete="off" required/>
            {errors.pseudoUser && <small>{errors.pseudoUser}</small>}
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Adresse mail</label>
            <input onChange={(e) => {setMailUser(e.target.value);}} type="email" 
            value={mailUser} onBlur={handleBlur}
            className="form-control" id="mail" name="mailUser" autoComplete="off" required/>
            {errors.mailUser && <small>{errors.mailUser}</small>}
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Date de naissance</label>
            <input onChange={(e) => {setBirthdayUser(e.target.value);}} type="date" 
            value={birthdayUser} onBlur={handleBlur}
            className="form-control" id="birthday" name="birthdayUser" autoComplete="off" title="âge requis : 16 ans minimum" max="2010-12-01" required/>
            {errors.birthdayUser && <small>{errors.birthdayUser}</small>}
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
            <input onChange={(e) => {setPasswordUser(e.target.value);}} type="password" 
            value={passwordUser} onBlur={handleBlur}
            className="form-control" id="passw" name="passwordUser" autoComplete="off" required/>
            {errors.passwordUser && <small>{errors.passwordUser}</small>}
          </div>
          <div className="mb-1">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" name="conditions"
              onBlur={handleBlur} required/>
              <label className="form-check-label accepterConditions" htmlFor="gridCheck">Accepter les <Link className="conditionsUtili" to="/conditions">conditions d'utilisation</Link></label>
              {errors.conditions && <small className="d-flex">{errors.conditions}</small>}
            </div>
          </div>
          {message && <p className="text-center text-danger">{message}</p>}
          <Btnlg onClick={register} type="submit" className="btn" caracteristique="lg" text="Confirmer l'inscription"/>
          </form>
          </Formik>
        </div>
        <div className="accountExist">
            <p>Déjà un compte ? <Link to="/" className="connectVous">Se connecter !</Link></p>
        </div>
        </section>
    );
  }
  
  export default Inscrire;