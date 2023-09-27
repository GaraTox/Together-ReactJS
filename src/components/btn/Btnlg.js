import React from "react";

const Btnlg = ({caracteristique,text}) => {
  return (
    <div>
        <button type="submit" className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnlg;