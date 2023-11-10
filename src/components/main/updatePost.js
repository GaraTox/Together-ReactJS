import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import UpdatePost from "../UpdatePost";
import { Helmet } from 'react-helmet';

function updatePost() {
    return (
      <section>
        <Helmet>
          <title>Together - Modifier une publication</title>
        </Helmet>
        <HeaderAdmin/>
        <UpdatePost/>
      </section>
    );
  }
  
  export default updatePost;