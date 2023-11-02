import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import CreatePost from "../CreatePost";
import FooterAdmin from "../FooterAdmin";


function createPost() {
    return (
      <section>
        <HeaderAdmin/>
        <CreatePost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default createPost;