import React, {useState} from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';

function CreatePost() {
  const [message, setMessage] = useState('');

  // EVENEMENT DE CLIQUE
    // const register = (event) => {
    //   event.preventDefault();
    //   axios.post('http://localhost:3001/connect-admin/home/user/create', 
    //   {pseudoUser: pseudoReg, mailUser: mailReg, birthdayUser: birthdayReg, passwordUser: passwordReg})
    //   .then(setMessage('Compte ajouté avec succès')
    //   )
    //   .catch(err => console.log(err))
    // }
    return (
        <section className="bg-admin">
        <h4 className="text-center pt-3">Créer un post</h4>
        <div className="blocCreate">
        <form method="POST" className="formCreate text-center p-3">
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <input type="text"  className="form-control" id="pseudo" name="pseudoUser" autoComplete="off" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Contenu</label>
            <textarea type="type"  className="form-control" id="contenuUser" name="contenuUser" autoComplete="off" required></textarea>
          </div>
          <Btnsm  type="submit" className="btn" caracteristique="sm" text="Créer"/>
          {message && <p className="text-success">{message}</p>}
          </form>
        </div>
        </section>
    );
  }
  
export default CreatePost;