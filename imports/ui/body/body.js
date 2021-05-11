import './body.html';
import '../collection/collections.js';
import '../element_collection/element_collection.js';
import '../../api/maps/maps-geoloc.js';
import '../../../lib/routing.js';
import '../accueil/accueil.js';
import '../creercompte/creercompte.js';
import '../connexion/connexion.js';
import '../accueilLog/accueilLog.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Template.connexion.events({

    'click #connexion-btn' (event) {
        event.preventDefault();
        let mail = document.getElementById('email').value;
        let mdp = document.getElementById('password').value;
        Meteor.loginWithPassword(mail, mdp, (error) => {
            if (error){
                alert(error.message)
            } else{
                SetTimeout(() => FlowrouterGo('accueil'), 200); 
            }
        });
    }

});