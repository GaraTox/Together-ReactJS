import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CrudUser from "../CrudUser";
import FooterAdmin from "../FooterAdmin";


function cruduser() {
    return (
      <section>
        <HeaderAdmin/>
        <CrudUser/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default cruduser;