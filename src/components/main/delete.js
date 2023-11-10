import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Delete from '../Delete';
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function deleted() {
    return (
      <section>
        <Helmet>
          <title>Together - Supprimer un compte utilisateur</title>
        </Helmet>
        <HeaderAdmin/>
        <Delete/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default deleted;