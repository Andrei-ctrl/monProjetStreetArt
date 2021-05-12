import './connexion.html';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Template.connexion.events({
    'click #annuler' (event) {
      event.preventDefault();
      FlowRouter.go('accueil');
    },

    'click #connexion-btn' (event) {
      event.preventDefault();
      let mail = document.getElementById('email').value;
      let mdp = document.getElementById('password').value;
      Meteor.loginWithPassword(mail, mdp, (error) => {
        if (error){
            alert(error.message)
        } else{
            SetTimeout(() => Flowrouter.go('accueilLog'), 200); 
        }
      });
    },

    'click #creercompte' (event) {
      event.preventDefault();
      FlowRouter.go('creercompte');
    }
  });

  