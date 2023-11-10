import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Message from '../Message';
import Footer from "../Footer";
import { Helmet } from 'react-helmet';

function message() {
    return (
      <section>
        <Helmet>
          <title>Together - Messagerie privée</title>
        </Helmet>
        <HeaderWelcome/>
        <Message/>
        <Footer/>
      </section>
    );
  }
  
  export default message;