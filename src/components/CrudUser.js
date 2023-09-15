import React from "react";
import { Link } from "react-router-dom";
import Btnlg from "./btn/Btnlg";

function CrudUser() {
    return (
        <section className="bg-admin">
            <div className="crudBouton">
                <Link to="/connect-admin/home/user/create"><Btnlg  type="submit" className="btn" caracteristique="lg" text="CREER UN UTILISATEUR"/></Link>
                <Link to="/connect-admin/home/user/choiceUpdate"><Btnlg  type="submit" className="btn" caracteristique="lg" text="MODIFIER UN UTILISATEUR"/></Link>
                <Link to="/connect-admin/home/user/delete"><Btnlg  type="submit" className="btn" caracteristique="lg" text="SUPPRIMER UN UTILISATEUR"/></Link>
                <Link to="/connect-admin/home/user/read"><Btnlg  type="submit" className="btn" caracteristique="lg" text="LIRE LES UTILISATEURS"/></Link>
            </div>
        </section>
    );
  }
  
  export default CrudUser;