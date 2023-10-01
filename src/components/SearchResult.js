import React from "react";
import Btnsm from '../components/btn/Btnsm';

function SearchResult({location}) {
    const results = location.state.results || [];
    return (
    <section>
        <div className="grid-admin">
        {results.map((result) => {
            <div key={result.idUser} className="text-center bg bg-light search">
                <div className="searchAvatar">
                    <img src="" className="avatar" alt="avatar"/>
                </div>
                <p className="searchFirstname">{result.pseudoUser}</p>
                <p className="searchName">{result.mailUser}</p>
                <div className="searchButton">
                    <Btnsm type="submit" className="btn" caracteristique="sm" text="Ajouter"/>
                </div>
            </div>
        })}
        </div>
        <hr/>
    </section>
    );
  }
  
  export default SearchResult;