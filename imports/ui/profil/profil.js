import './profil.html';

Template.profil.helpers({
    utilisateur: () => Meteor.user().username,
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

