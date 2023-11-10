import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Parameter from "../Parameter";
import FooterParameter from "../FooterParameter";
import { Helmet } from 'react-helmet';

function parameter() {
    return (
      <section>
        <Helmet>
          <title>Together - Mes paramètres</title>
        </Helmet>
        <HeaderWelcome/>
        <Parameter/>
        <FooterParameter/>
      </section>
    );
}
  
export default parameter;