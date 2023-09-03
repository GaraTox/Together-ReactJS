import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import Read from "../Read";
import FooterAdmin from "../FooterAdmin";

function read() {
    return (
      <section>
        <HeaderAdmin/>
        <Read/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default read;