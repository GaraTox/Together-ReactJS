import React from "react";
import friend from '../assets/icons/people.svg';
import message from '../assets/icons/envelope.svg';

function Message() {
    return (
    <section>
    <div className="contenuPrincipal">
        <div className="blocAmis">
            <button className="btn_friend" type="submit"><div className="titreAmis"><p className="text-center text-light bg bg-dark"><img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/><strong>Amis</strong></p></div></button>
            <div className="blocContenu text-center mt-2">
                <p>ID Pseudo</p>
                <hr className="text-center"/>
            </div>
        </div>
        <div className="blocMessage">
            <div className="titreMessage"><p className="text-center text-light bg bg-dark"><img src={message} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="friend"/><strong>Messages</strong></p></div>
            <div className="blocContenu text-center mt-2">
                <p>Pseudo date heure contenu</p>
                <hr className="text-center"/>
            </div>
        </div>
    </div>
    </section>
    );
  }
  
  export default Message;