import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const user = localStorage.getItem('idUser');
    return (
        <footer>
            <div className="admin">
                <p><Link to={`/myprofile/parameter/${user}`} className="adminLink pt-2"><strong>PARAMETRES</strong></Link></p>
            </div>
        </footer>
    );
  }
  
  export default Footer;