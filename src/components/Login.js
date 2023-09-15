import React, { useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from 'formik';
import ValidationLogin from './controles/ValidationsLogin';
import Btnmd from './btn/Btnmd';
import ModalPassword from "./modales/ModalePassword";
import axios from 'axios';

function Connect() {
 // INITIALISATION DES VALEURS
  const [mailUser, setMailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const history = useNavigate;

axios.defaults.withCredentials = true;

const initialValues = {
  mailUser: '',
  passwordUser: '',
};

// ACTION DU CLIQUE SUR LE BOUTON SE CONNECTER
const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('http://localhost:3001/', { mailUser, passwordUser })
    .then((res) => {
      if (res.data.success) {

        history.push('/myprofile'); 
      } else {
        console.log("Probleme de connexion")
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

    return (
        <section className="loginPage">
          {openModal && <ModalPassword closeModal={setOpenModal}/>}
        <h1 className="titrePresentation">Bienvenue sur Together, <br/> le nouveau réseau social gratuit.</h1>
        <div className="blocForm">
        <Formik initialValues={initialValues} validationSchema={ValidationLogin} onSubmit={handleSubmit}>
        <form onChange={handleSubmit} className="formConnect rounded" method="POST" action="#">
            <p className="dejaInscrit">Déjà inscrit ?</p>
            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
              <input onChange={(e) => {setMailUser(e.target.value);}} type="mail" className="form-control" id="mail" name="mailUser" autoComplete="off"/>
              <ErrorMessage name="mailUser" component="div" />
            </div>
            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
              <input onChange={(e) => {setPasswordUser(e.target.value);}} type="password" className="form-control" id="passw" name="passwordUser" autoComplete="off"/>
              <ErrorMessage name="passwordUser" component="div" />
            </div>
            <p className="passwordForget text-danger m-4" onClick={() => {setOpenModal(true)}}>Mot de passe oublié ?</p>
            <Btnmd  type="submit" className="btn" caracteristique="md" text="Se connecter"/>
          </form>
          </Formik>
        </div>
          <div className="noAccount">
            <p>Pas de compte ? <Link to="/register" className="inscrivezVous">Inscrivez-vous !</Link></p>
          </div>
        </section>
    );
  }
  
  export default Connect;