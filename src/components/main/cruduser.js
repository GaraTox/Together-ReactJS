import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CrudUser from "../CrudUser";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function cruduser() {
    return (
      <section>
        <Helmet>
          <title>Together - Choisir une action sur les utilisateurs</title>
        </Helmet>
        <HeaderAdmin/>
        <CrudUser/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default cruduser;