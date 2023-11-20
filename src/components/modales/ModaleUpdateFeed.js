import React, {useState} from 'react';
import Btnsm from '../btn/Btnsm';

function ModaleUpdateFeed({post, onSave, onClose}){
    const [editedPublication, setEditedPublication] = useState(post);

    const handleSave = () => {
      onSave(editedPublication);
    };

    return(
        <section className='bg_modal'>
            <div className='content_modal'>
                <div className='titleCloseBtn'>
                <button onClick={onClose} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className='title'>
                    <h4 className='text-center'>Modifier cette publication</h4>
                </div>
                <div className='body'>
                <textarea
                value={editedPublication.contentFeed}
                onChange={(e) => setEditedPublication({ ...editedPublication, contentFeed: e.target.value })}
                />
                </div>
                <div className='footer mt-2'>
                    <Btnsm onClick={handleSave} type="submit" className="btn" caracteristique="sm" text="Modifier"/>
                </div>
            </div>
        </section>
    )
}

export default ModaleUpdateFeed;