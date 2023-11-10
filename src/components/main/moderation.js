import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Moderation from "../Moderation";
import { Helmet } from 'react-helmet';

function moderation() {
    return (
      <section>
      <Helmet>
        <title>Together - Modération</title>
      </Helmet>
      <HeaderAdmin/>
      <Moderation/>
      </section>
    );
  }
  
  export default moderation;