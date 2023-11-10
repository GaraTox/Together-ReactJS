import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CrudPost from "../CrudPost";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function crudpost() {
    return (
      <section>
        <Helmet>
          <title>Together - Choisir une action sur les publications</title>
        </Helmet>
        <HeaderAdmin/>
        <CrudPost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default crudpost;