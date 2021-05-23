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
});


// Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
// A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.


