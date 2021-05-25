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
        //recupererEtAfficherOeuvres();
    },
});


// Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
// A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.

function recupererEtAfficherParcours() {
    let listeParcours = Parcours.find({}).fetch();
    // Pour chaque parcours de cette liste de parcours, je l'affiche
    listeParcours.forEach(parcours => {
        afficherParcours(parcours);
    });
    let listeOeuvres = Oeuvres.find({}).fetch();
    listeOeuvres.forEach(oeuvre => {
        afficherParcours(oeuvre);
    });
}

function afficherParcours(parcours, oeuvre) {
    const li = document.createElement('li');
    li.innerHTML = parcours.titre;
    if (parcours.idList.includes(oeuvre.id)) {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${oeuvre.image}" class="imageCSS">`;
        //displayListeOeuvres(parcours.idList, li.innerHTML);
        document.getElementById("listeParcours").appendChild(div);
    };
    //displayListeOeuvres(parcours.idList, li.innerHTML);
    document.getElementById("listeParcours").appendChild(li);
};

/*function recupererEtAfficherOeuvres() {
    let listeOeuvres = Oeuvres.find({}).fetch();
    listeOeuvres.forEach(oeuvres => {
        afficherOeuvre(oeuvres);
    });
};*/

/*function afficherOeuvre(oeuvres) {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${oeuvres.image}" class="imageCSS">`;
    //displayListeOeuvres(parcours.idList, li.innerHTML);
    document.getElementById("listeParcours").appendChild(div);
}*/



/*function displayListeOeuvres(listeOeuvresIds, liElement) {
    //alert("pomme");
    listeOeuvresIds.forEach(oeuvreId => {
        alert("oeuvre id " + oeuvreId);
        //Probleme avec la recuperation des oeuvres
        const oeuvre = Oeuvres.find({'_id': oeuvreId});
        alert("oeuvre id " + oeuvre.lat);
        liElement += `<img src="${oeuvre.image}" class="imageCSS">`;
    });
}*/


