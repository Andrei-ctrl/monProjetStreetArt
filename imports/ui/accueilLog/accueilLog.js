import './accueilLog.html';
import './accueilLog.css';
import '../../api/maps/maps-geoloc.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.accueilLog.helpers({
    utilisateur: () => Meteor.user().profile.first_name,
})

Template.accueilLog.events({
    'click #profil'(event){
        event.preventDefault();
        FlowRouter.go('profil');
    },
    'click #ajouterOeuvre'(event){
        event.preventDefault();
        FlowRouter.go('ajouterOeuvre');
    },
    'click #creerParcours'(event){
        event.preventDefault();
        FlowRouter.go('creerParcours');
    },
    'click #choisirParcours'(event){
        event.preventDefault();
        FlowRouter.go('choisirParcours');
        // Recharger la page sinon les parcours de s'affichent pas.
    }
})
