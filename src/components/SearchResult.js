import React from "react";
import Btnsm from '../components/btn/Btnsm';

function SearchResult({results}) {
    return (
    <section>
        <div className="grid-admin">
            {results ? results.map((result, index) => (
            <div key={index} className="text-center bg bg-light search">
                <p className="searchFirstname">{result.pseudoUser}</p>
                <p className="searchName">{result.mailUser}</p>
                <div className="searchButton">
                    <Btnsm type="submit" className="btn" caracteristique="sm" text="Ajouter"/>
                </div>
            </div>
            )) : <p>Aucun résultat trouvé...</p>}
        </div>
        <hr/>
    </section>
    );
  }
  
  export default SearchResult;