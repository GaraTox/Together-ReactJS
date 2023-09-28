import React from "react";

const Btnmd = ({caracteristique,text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnmd;