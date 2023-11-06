import React, {useState, useEffect} from "react";

function Moderation() {
    const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/recupreport')
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des signalements :', error));
  }, []);
    return (
        <section className="pageSignalement">
            <div className="titreSignalement text-center">
                <p>Signalements</p>
            </div>
            <div className="blocSignalement">
                {reports.map((report, key) => (
                <div key={key} className="signalement">
                    <div><p>{report.contentFeed}</p></div>
                    <div><p>{report.contentReport}</p></div>
                    <button>Supprimer</button>
                </div>
                ))}
            </div>
        </section>
    );
  }
  
  export default Moderation;