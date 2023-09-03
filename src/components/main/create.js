import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Create from "../Create";
import FooterAdmin from "../FooterAdmin";


function create() {
    return (
      <section>
        <HeaderAdmin/>
        <Create/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default create;