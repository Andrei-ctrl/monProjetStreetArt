import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

// importer fichier
import './collections.html';
import { ObjetsCollection } from '../../api/collection_DB';

Template.collections.helpers({
    objets: function() {
        return ObjetsCollection.find({})
    }
})

Template.collections.events({
    'click #ajouter': function() {
        const nouvelObjet = prompt('Entrez un nouvel élément !');
        // Appel de la méthode
        Meteor.call('ajouterObjet', nouvelObjet);
    },
});
