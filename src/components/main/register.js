import React from "react";
import Header from "../Header";
import Register from "../Register";
import { Helmet } from 'react-helmet';

function sinscrire() {
    return (
      <section>
        <Helmet>
          <title>Together - Créer un compte</title>
        </Helmet>
        <Header/>
        <Register/>
      </section>
    );
  }
  
  export default sinscrire;