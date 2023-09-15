import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CrudPost from "../CrudPost";
import FooterAdmin from "../FooterAdmin";


function crudpost() {
    return (
      <section>
        <HeaderAdmin/>
        <CrudPost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default crudpost;