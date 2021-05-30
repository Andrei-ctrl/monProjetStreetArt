import './profil.html';
import './profil.css';

Template.profil.helpers({
    utilisateur_prenom: () => Meteor.user().profile.first_name,
    utilisateur_nom: () => Meteor.user().profile.last_name,
    email: () => Meteor.user().emails[0].address,
})

Template.profil.events({
    'click #logout'(event){
    event.preventDefault();
    FlowRouter.go('accueil');
    },
    'click #retour'(event){
    event.preventDefault();
    FlowRouter.go('accueilLog');
    }
})

