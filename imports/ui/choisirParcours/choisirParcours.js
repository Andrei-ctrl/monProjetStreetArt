import './choisirParcours.html';
import './choisirParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres, Parcours } from '../../api/collection_DB';

Template.choisirParcours.events({
    'click #retour'(event) {
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
});

// Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
// A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.

Template.choisirParcours.helpers({
    // Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
    // A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.
    recupererEtAfficherParcours: function () {
        let listeParcours = Parcours.find({}).fetch();
        // Pour chaque parcours de cette liste de parcours, je l'affiche
        listeParcours.forEach(parcours => {
            afficherParcours(parcours);
        });
    },
});

function afficherParcours(parcours) {
    const li = document.createElement('li');
    const monBouton = document.createElement('button');
    monBouton.classList.add('styleBouton');
    monBouton.addEventListener("click", function() {
        //Redirection vers afficher parcours en passant l'Id du parcours
        FlowRouter.go('afficherParcours', { _parcoursId: parcours._id });
    });
    li.innerHTML = parcours.titre;
    li.appendChild(monBouton);
    afficherListeOeuvres(parcours.idList, li.innerHTML);
    document.getElementById("listeParcours").appendChild(li);
};


function afficherListeOeuvres(listeOeuvresIds, liElement) {
    listeOeuvresIds.forEach(oeuvreId => {
        const oeuvre = Oeuvres.findOne({_id: oeuvreId});
        //const liImage = `<img src="${oeuvre.image}" class="imageCSS">`;
        const monImage = document.createElement('img');
        //monImage.setAttribute(src, oeuvre.image);
        //monImage.classList.add("mystyle");
        //liElement.appendChild(monImage);
    });
}


