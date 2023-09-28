import React from "react";

const Btnlg = ({caracteristique,text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} type="submit" className={caracteristique}>{text}</button>
    </div>
  );
};

export default Btnlg;