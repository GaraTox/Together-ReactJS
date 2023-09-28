import React from "react";

const Btnsm = ({caracteristique,text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnsm;