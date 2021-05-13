import './ajouterOeuvre.html';
import './ajouterOeuvre.css';
import '../../api/maps/maps-geoloc.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

// importer fichier
import { ObjetsCollection } from '../../api/collection_DB';

Template.ajouterOeuvre.helpers({
    objets: function() {
        return ObjetsCollection.find({})
    }
})

Template.ajouterOeuvre.events({
    'click #ajouterOeuvrePActuelle': function() {
        //Session.set('confirmationModal', true); // Show modal

        //const nouvelObjet = prompt('Ajouter une image !');
        // Appel de la méthode
        //Meteor.call('ajouterOeuvre', lat, lng, image);
    },
    'click #ajouterOeuvreNewPos': function() {
        let lat;
        let lng;
        let image;
        const nouvelObjet = prompt('Entrez un nouvel élément !');
        // Appel de la méthode
        Meteor.call('ajouterOeuvre', lat, lng, image);
    },
    'click #ok': function() {
        let lat;
        let lng;
        var latLng = Geolocation.latLng();
        const image = prompt('Entrez un nouvel élément !');
        // Appel de la méthode
        Meteor.call('ajouterOeuvre', lat, lng, image);
        //Session.set('confirmationModal', false); // Show modal
    },
    'click #annuler': function() {
        //Session.set('confirmationModal', false); // Show modal
    },
    'click #retour'(event){
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
});