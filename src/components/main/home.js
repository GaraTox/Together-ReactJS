import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Home from '../Home';
import Footer from "../Footer";

function home() {
    return (
      <section>
        <HeaderWelcome/>
        <Home/>
        <Footer/>
      </section>
    );
  }
  
  export default home;