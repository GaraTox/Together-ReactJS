import React from "react";
import Btnlg from './btn/Btnlg';

function Mode() {
    return (
        <section>
            <div className="mode">
                <div className="btnDelete">
                    <Btnlg type="submit" className="btn" caracteristique="lg" text="Modifier votre profil"/>
                    <Btnlg type="submit" className="btn" caracteristique="lg mt-3" text="Supprimer ce compte"/>
                </div>
            </div>
        </section>
    );
  }
  
  export default Mode;