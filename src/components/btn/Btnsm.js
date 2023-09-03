import React from "react";

const Btnsm = ({caracteristique,text}) => {
  return (
    <div>
        <button className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnsm;