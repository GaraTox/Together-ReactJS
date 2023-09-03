import React from "react";

const Btnmd = ({caracteristique,text}) => {
  return (
    <div>
        <button className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnmd;