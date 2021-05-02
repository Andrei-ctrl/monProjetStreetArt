import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

/*
//importer DB
import {objetsCollection} from '../../api/collection_DB.js';
*/

// importer fichier
import './collection.html';

Template.collection.events({
    'click #ajouter': function() {
        const nouvelObjet = prompt('Entrez un nouvel élément !');
        // Appel de la méthode
        Meteor.call('ajouterObjet', nouvelObjet);
    }
})
