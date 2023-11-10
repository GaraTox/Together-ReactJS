import React from "react";
import Header from "../Header";
import Mentions from "../Mentions";
import { Helmet } from 'react-helmet';

function mentions() {
    return (
      <section>
         <Helmet>
          <title>Together - Mentions légales</title>
        </Helmet>
        <Header/>
        <Mentions/>
      </section>
    );
  }
  
  export default mentions;