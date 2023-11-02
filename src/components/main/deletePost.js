import React from "react";
import HeaderAdmin from "../HeaderAdmin";
import DeletePost from '../DeletePost';
import FooterAdmin from "../FooterAdmin";

function deletedPost() {
    return (
      <section>
        <HeaderAdmin/>
        <DeletePost/>
        <FooterAdmin/>
      </section>
    );
  }
  
  export default deletedPost;