import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import DeletePost from '../DeletePost';
import FooterAdmin from "../FooterAdmin";
import { Helmet } from 'react-helmet';

function deletedPost() {
    return (
      <section>
        <Helmet>
          <title>Together - Supprimer une publication</title>
        </Helmet>
        <HeaderAdmin/>
        <DeletePost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default deletedPost;