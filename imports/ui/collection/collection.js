import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

//importer DB
import {ObjetsCollection} from '../../api/collection_DB.js';


// importer fichier
import './collection.html';
import { ObjetsCollection } from '../../api/collection_DB';

Template.liste.helpers({
    objets: function() {
        return ObjetsCollection.find({})
    }
})

Template.collection.events({
    'click #ajouter': function() {
        const nouvelObjet = prompt('Entrez un nouvel élément !');
        // Appel de la méthode
        Meteor.call('ajouterObjet', nouvelObjet);
    },
});
