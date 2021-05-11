import './connexion.html';

Template.connexion.events({
    'click #annuler' (event) {
      event.preventDefault();
      FlowRouter.go('accueil');
    }
  });

  Template.connexion.events({
    'click #connexion-btn' (event) {
      event.preventDefault();
      FlowRouter.go('accueilLog');
    }
  });

  Template.connexion.events({
    'click #creercompte' (event) {
      event.preventDefault();
      FlowRouter.go('creercompte');
    }
  });


  