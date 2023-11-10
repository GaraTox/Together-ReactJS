import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import AdminHome from "../AdminHome";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function crud() {
    return (
      <section>
        <Helmet>
          <title>Together - Accueil administrateur</title>
        </Helmet>
        <HeaderAdmin/>
        <AdminHome/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default crud;