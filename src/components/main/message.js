import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Message from '../Message';
import Footer from "../Footer";

function message() {
    return (
      <section>
        <HeaderWelcome/>
        <Message/>
        <Footer/>
      </section>
    );
  }
  
  export default message;