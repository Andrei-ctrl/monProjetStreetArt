import './choisirParcours.html';
import './choisirParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres } from '../../api/collection_DB';
import { Parcours } from '../../api/collection_DB';


Template.choisirParcours.events({
    'click #retour'(event) {
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
    'click #afficherParcours'(event) {
        recupererEtAfficherParcours();
    },
});


// Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
// A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.




function recupererEtAfficherParcours() {
    let listParcours = Parcours.find({}).fetch();
    listParcours.forEach(parcours => {
        displayParcours(parcours);
    });
}

function displayParcours(parcours) {
    const li = document.createElement('li');
    li.innerHTML = parcours.titre;
    //displayListeOeuvres(parcours.idList, li.innerHTML);
    document.getElementById("listeParcours").appendChild(li);
}

function displayListeOeuvres(listeOeuvresIds, liElement) {
    //alert("pomme");
    listeOeuvresIds.forEach(oeuvreId => {
        alert("oeuvre id " + oeuvreId);
        //Probleme avec la recuperation des oeuvres
        const oeuvre = Oeuvres.find({'_id': oeuvreId});
        alert("oeuvre id " + oeuvre.lat);
        liElement += `<img src="${oeuvre.image}" class="imageCSS">`;
    });
}


