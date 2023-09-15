import React from "react";
import { Link } from "react-router-dom";
import Btnlg from "./btn/Btnlg";

function CrudPost() {
    return (
        <section className="bg-admin">
            <div className="crudBouton">
                <Link ><Btnlg  type="submit" className="btn" caracteristique="lg" text="CREER UN POST"/></Link>
                <Link ><Btnlg  type="submit" className="btn" caracteristique="lg" text="MODIFIER UN POST"/></Link>
                <Link ><Btnlg  type="submit" className="btn" caracteristique="lg" text="SUPPRIMER UN POST"/></Link>
                <Link ><Btnlg  type="submit" className="btn" caracteristique="lg" text="LIRE LES POSTS"/></Link>
            </div>
        </section>
    );
  }
  
  export default CrudPost;