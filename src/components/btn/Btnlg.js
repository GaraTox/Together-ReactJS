import React from "react";

const Btnlg = ({caracteristique,text}) => {
  return (
    <div>
        <button className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnlg;