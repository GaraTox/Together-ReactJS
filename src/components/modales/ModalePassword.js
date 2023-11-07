import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Btnsm from '../btn/Btnsm';

function ModalPassword({closeModal}){
    const navigate = useNavigate();
  // CONTROLE DE CHAMPS
  const formik = useFormik({
    initialValues: {
        mailUser: "",
    },
    validationSchema: Yup.object().shape({
        mailUser: Yup.string()
            .required("Le mail est obligatoire")
            .email("Veuillez entrer une adresse mail valide"),
    }),
    onSubmit: (values) => {
        const { mailUser } = values;
        axios.post('/sendMail', { mailUser })
            .then((response) => {
                console.log(response.data);
                alert('Email envoyé');
                navigate('/');
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi", error);
            });
    }
});

const [mailUser, setMailUser] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/sendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailUser }),
    });
    if (response.ok) {
        console.log("Email de réinitialisation envoyé avec succès");
    } else {
        console.error("Erreur lors de l'envoi de l'e-mail de réinitialisation");
    }
};
return(
    <section className='bg_modal'>
        <div className='content_modal'>
            <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className='title'>
                <h4 className='text-center'>Mot de passe oublié ?</h4>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="exampleInput" className="form-label">Adresse Mail</label>
                    <input type="mail" className="form-control" id="mail"
                    onChange={formik.handleChange} value={formik.values.mailUser}name="mailUser"
                    autoComplete="off" required/>
                    {(formik.touched.mailUser && formik.errors.mailUser) &&
                    <span style={{ color: 'red' }}>
                        {formik.errors.mailUser}
                    </span>
                    }                
                </form>
            </div>
            <span className='text-secondary'>Vous allez recevoir un mail à cette adresse afin de modifier votre mot de passe.</span>
            <div className='footer'>
                <Btnsm onClick={formik.handleSubmit} type="submit" className="btn" caracteristique="sm" text="Envoyer"/>
            </div>
        </div>
    </section>
)
}

export default ModalPassword;