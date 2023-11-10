import React from "react";
import Header from "../Header";
import Connect from "../Login";
import { Helmet } from 'react-helmet';

function seConnecter() {
    return (
      <section>
        <Helmet>
          <title>Together - Connexion à son compte</title>
        </Helmet>
        <Header/>
        <Connect/>
      </section>
    );
  }
  
  export default seConnecter;