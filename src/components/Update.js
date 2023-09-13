import React from "react";

function Update() {
    return (
        <section>
        <h4 className="text-center mt-5 ">Modifier les données de l'utilisateur</h4>
        <div className="blocUpdate">
        <form method="POST" className="formUpdate text-center p-3">
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Pseudo</label>
            <input type="text" className="form-control" id="fnames" name="Firstnames" autocomplete="off" required/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Mail</label>
            <input type="text" className="form-control" id="names" name="Names" autocomplete="off" required/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="passw" name="Passwords" autocomplete="off" required/>
          </div>
          <button type="submit" className="btn btn-success" id="inscription" name="inscription">Modifier</button>
          </form>
        </div>
        </section>
    );
  }
  
export default Update;