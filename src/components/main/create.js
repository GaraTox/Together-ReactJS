import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Create from "../Create";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function create() {
    return (
      <section>
        <Helmet>
          <title>Together - Créer un compte utilisateur</title>
        </Helmet>
        <HeaderAdmin/>
        <Create/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default create;