import React from "react";
import HeaderWelcome from "../HeaderWelcome";
import Parameter from "../Parameter";
import Mode from "../Mode";
import FooterParameter from "../FooterParameter";

function parameter() {
    return (
      <section>
        <HeaderWelcome/>
        <Parameter/>
        <Mode/>
        <FooterParameter/>
      </section>
    );
}
  
export default parameter;