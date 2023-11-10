import React from "react";
import Header from "../Header";
import Conditions from '../ConditionsUtili'
import { Helmet } from 'react-helmet';

function conditions() {
    return (
      <section>
        <Helmet>
          <title>Together - Conditions d'utilisation</title>
        </Helmet>
        <Header/>
        <Conditions/>
      </section>
    );
  }
  
  export default conditions;