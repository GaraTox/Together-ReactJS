import React from "react";
import { Link } from "react-router-dom";

function FooterAdmin() {
    return (
        <footer>
            <div className="footerAdmin">
                <p><Link to="/connect-admin/moderation"><strong>Modération</strong></Link></p>
            </div>
        </footer>
    );
  }
  
  export default FooterAdmin;