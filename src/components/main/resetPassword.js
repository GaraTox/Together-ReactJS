import React from "react";
import Header from "../Header";
import ResetPassword from "../ResetPassword";
import { Helmet } from 'react-helmet';

function resetPassword() {
    return (
      <section>
        <Helmet>
          <title>Together - Réinitialisation du mot de passe</title>
        </Helmet>
        <Header/>
        <ResetPassword/>
      </section>
    );
  }
  
  export default resetPassword;