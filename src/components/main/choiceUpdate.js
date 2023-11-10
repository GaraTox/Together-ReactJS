import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import ChoiceUpdate from "../ChoiceUpdate";
import FooterAdmin from '../FooterAdmin';
import { Helmet } from 'react-helmet';

function choiceUpdate() {
    return (
      <section>
        <Helmet>
          <title>Together - Choisir un compte utilisateur à modifier</title>
        </Helmet>
        <HeaderAdmin/>
        <ChoiceUpdate/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default choiceUpdate;