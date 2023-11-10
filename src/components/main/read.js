import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Read from "../Read";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function read() {
    return (
      <section>
        <Helmet>
          <title>Together - Liste des utilisateurs</title>
        </Helmet>
        <HeaderAdmin/>
        <Read/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default read;