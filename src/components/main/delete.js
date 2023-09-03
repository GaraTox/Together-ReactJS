import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Delete from '../Delete';
import FooterAdmin from "../FooterAdmin";

function deleted() {
    return (
      <section>
        <HeaderAdmin/>
        <Delete/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default deleted;