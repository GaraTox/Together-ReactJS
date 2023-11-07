import React, {useState, useEffect} from "react";
import Btnsm from '../components/btn/Btnsm';

function Moderation() {
    const [reports, setReports] = useState([]);
    const [gere, setGere] = useState([]);

  useEffect(() => {
    fetch('/recupreport')
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des signalements :', error));
  }, []);

  const deleteNews = (idReport) => {
    fetch(`/reportdelete/${idReport}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Signalement supprimée avec succès') {
          setGere(gere.filter((report) => report.idReport !== idReport));
        }
      });
  };
    return (
        <section className="pageSignalement">
            <div className="titreSignalement text-center">
                <p>Signalements</p>
            </div>
            <div className="blocSignalement">
                {reports.map((report, key) => (
                <div key={key} className="signalement">
                    <div className="text-center">
                      <p className="publiSignalee">Publication signalée :</p>
                      <p>ID : {report.idFeed} - {report.contentFeed}</p>
                    </div>
                    <div className="text-center">
                      <p className="motifSignale">Motif:</p>
                      <p>{report.contentReport}</p>
                    </div>
                    <div className="btnGerer">
                      <Btnsm onClick={() => deleteNews(report.idReport)} type="submit" className="btn" caracteristique="sm" text="Géré"/>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
  }
  
  export default Moderation;