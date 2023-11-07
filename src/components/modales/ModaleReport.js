import React, {useState} from 'react';
import Btnsm from '../btn/Btnsm';

function ModaleReport({post, closeModal}){
    const [contentReport, setContentReport] = useState('');
    const idUser = localStorage.getItem('idUser');
    const submitReport = () => {
      fetch('/sendreport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUser,
          idFeed: post.idFeed,
          contentReport,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          closeModal();
        })
        .catch((error) => {
          console.error('Erreur lors de la soumission du signalement', error);
        });
    };

    return(
        <section className='bg_modal'>
            <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'>
                    <h4 className='text-center'>Signaler cette publication</h4>
                </div>
                <div className='body'>
                    <p className='border border-secondary p-2 rounded mb-2'>{post.contentFeed}</p>
                    <textarea placeholder="Raison du signalement" value={contentReport}
                    onChange={(e) => setContentReport(e.target.value)}/>
                </div>
                <div className='footer mt-2'>
                    <Btnsm onClick={submitReport} type="submit" className="btn" caracteristique="sm" text="Signaler"/>
                </div>
            </div>
        </section>
    )
}

export default ModaleReport;