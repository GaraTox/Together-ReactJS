import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Home from '../Home';
import Footer from "../Footer";
import { Helmet } from 'react-helmet';

function home() {
    return (
      <section>
        <Helmet>
          <title>Together - Fil d'actualité</title>
        </Helmet>
        <HeaderWelcome/>
        <Home/>
        <Footer/>
      </section>
    );
  }
  
  export default home;