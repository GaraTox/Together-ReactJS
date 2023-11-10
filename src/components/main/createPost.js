import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CreatePost from "../CreatePost";
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function createPost() {
    return (
      <section>
        <Helmet>
          <title>Together - Créer une publication</title>
        </Helmet>
        <HeaderAdmin/>
        <CreatePost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default createPost;