import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import ReadPost from "../ReadPost";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function readPost() {
    return (
      <section>
        <Helmet>
          <title>Together - Liste des publications</title>
        </Helmet>
        <HeaderAdmin/>
        <ReadPost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default readPost;