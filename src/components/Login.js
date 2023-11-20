import React, { useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Formik} from 'formik';
import { Validation } from "./controles/ValidationsLogin";
import Btnmd from './btn/Btnmd';
import ModalPassword from "./modales/ModalePassword";
import axios from 'axios';

  // CONTROLES DE CHAMPS
  const initialValues = {
    mailUser: '',
    passwordUser: ''
}

function Connect() {
  // CONTROLE DE CHAMPS
  const {handleBlur, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: Validation,
    onSubmit: (values) => {
        console.log(values)
    }
})

 // INITIALISATION DES VALEURS
  const [mailUser, setMailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

// MODALE
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

// axios.defaults.withCredentials = true;

// console.log("L38 => ", localStorage.getItem('idUser'))

// ACTION DU CLIQUE SUR LE BOUTON SE CONNECTER
const handleSubmit = async (e) => {
  const user = localStorage.getItem('idUser');
  e.preventDefault()
  try {
    const response = await axios.post('http://localhost:3001/', { mailUser, passwordUser });
    console.log("response data", response.data);
    localStorage.setItem('idUser', response.data);
    navigate(`/myprofile/${response.data}`)
  } 
  catch (error) {
    setMessage('Identifiants incorrects');
    console.error(error);
  }
}

    return (
        <section className="loginPage">
        {openModal && <ModalPassword closeModal={setOpenModal}/>}
        <h1 className="titrePresentation">Bienvenue sur Together, <br/> le nouveau réseau social.</h1>
        <div className="blocForm">
        <Formik initialValues={initialValues} validationSchema={Validation}>
        <form onSubmit={handleSubmit} className="formConnect rounded" method="POST">
            <p className="dejaInscrit">Déjà inscrit ?</p>

            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
              <input onChange={(e) => {setMailUser(e.target.value);}} type="mail" 
              value={mailUser} onBlur={handleBlur}
              className="form-control" id="mail" name="mailUser" autoComplete="off" required/>
            {errors.mailUser && <small>{errors.mailUser}</small>}
            </div>

            <div className="m-4">
              <label htmlFor="exampleInput" className="form-label">Mot de passe</label>
              <input onChange={(e) => {setPasswordUser(e.target.value);}} type="password" 
              value={passwordUser} onBlur={handleBlur}
              className="form-control" id="passw" name="passwordUser" autoComplete="off" required/>
            {errors.passwordUser && <small>{errors.passwordUser}</small>}
            </div>

            <p className="passwordForget text-danger m-4" onClick={() => {setOpenModal(true)}}>Mot de passe oublié ?</p>
            <Btnmd  type="submit" className="btn" caracteristique="md" text="Se connecter"/>
          </form>
          </Formik>
        </div>
        {message && <p className="text-center text-danger">{message}</p>}
          <div className="noAccount">
            <p>Pas de compte ? <Link to="/register" className="inscrivezVous">Inscrivez-vous !</Link></p>
          </div>
        </section>
    );
  }
  
  export default Connect;