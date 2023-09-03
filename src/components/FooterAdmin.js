import React from "react";
import { Link } from "react-router-dom";

function FooterAdmin() {
    return (
        <footer>
            <div className="bg bg-dark">
                <p><Link to="/connect-admin/moderation" className="text-secondary"><strong>Modération</strong></Link></p>
            </div>
        </footer>
    );
  }
  
  export default FooterAdmin;