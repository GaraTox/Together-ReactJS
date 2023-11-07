import React, { useState } from "react";
import { useFormik, Formik} from 'formik';
import { Validation } from "./controles/ValidationsRegister";
import { Link, useNavigate } from "react-router-dom";
import Btnlg from './btn/Btnlg';
import axios from 'axios';

function ResetPassword() {
    return (
        <section className="resetPage">
        <p className="text-center text-secondary">Réinitialisez votre mot de passe.</p>
        <div>
          {/* <Formik initialValues={initialValues} validationSchema={Validation}> */}
        <form method="POST" className="text-center border border-dark p-3 rounded">
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Nouveau mot de passe : </label>
            <input  type="password" 
            value={newMdp}
            className="form-control" id="newMdp" name="newMdp" autoComplete="off" required/>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInput" className="form-label">Confirmer mot de passe : </label>
            <input type="password" 
            value={mdp}
            className="form-control" id="mdp" name="mdp" autoComplete="off" required/>
          </div>
          <Btnlg type="submit" className="btn" caracteristique="lg" text="Modifier"/>
          </form>
          {/* </Formik> */}
        </div>
        </section>
    );
  }
  
  export default ResetPassword;