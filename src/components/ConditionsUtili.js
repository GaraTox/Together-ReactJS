import React from 'react';

function Mentions() {
  return (
    <section className='conditions'>
        <h1 className='titreConditions'>Conditions d'utilisation</h1>
        <h4>Qu'est-ce que Together ?</h4>
        <p>Le réseau social Together permet de communiquer avec ses amis, à travers des publications et une messagerie privée.
          Vos amis seront préalablement ajouter pour pouvoir communiquer avec eux.
          Vous allez pouvoir répondre aux commentaires.
        </p>
        <hr/>
        <h4>Maintenir le caractère confidentiel de ses identifiants de connexion: </h4>
        <p>Together protège vos données confidentielles. Nous vous demandons d'utiliser ce réseau social conformément à sa destination.
          Si vous tentez de nuire au bon fonctionnement du site, nous nous donnons le droit d'engager des poursuites.
        </p>
        <hr/>
        <h4>Sanctions</h4>
        <p>En cas de tous comportements inappropriés, votre compte sera immédiatement supprimer.
          Il sera possible de signaler des publications inappropriées, et seront gérer par le modérateur de Together. 
        </p>
        <hr/>
        <h4>Gestion de Together</h4>
        <p>Les données des utilisateurs seront gérer par un administrateur, qui pourra créer, modifier ou supprimer les données.
          De plus, l'administrateur aura accès à la modération du site.
        </p>
    </section>
  );
}

export default Mentions;