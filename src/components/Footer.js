import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="admin bg bg-dark">
                <p><Link to="/myprofile/parameter" className="adminLink text-secondary pt-2"><strong>PARAMETRES</strong></Link></p>
            </div>
        </footer>
    );
  }
  
  export default Footer;