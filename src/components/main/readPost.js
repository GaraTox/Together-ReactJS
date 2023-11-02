import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import ReadPost from "../ReadPost";
import FooterAdmin from "../FooterAdmin";

function readPost() {
    return (
      <section>
        <HeaderAdmin/>
        <ReadPost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default readPost;