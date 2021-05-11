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
      let mail = document.getElementById('email').value;
      let mdp = document.getElementById('password').value;
      Meteor.loginWithPassword(mail, mdp, (error) => {
        if (error){
            alert(error.message)
        } else{
            SetTimeout(() => Flowrouter.go('accueilLog'), 200); 
        }
      });
    }
  });

  Template.connexion.events({
    'click #creercompte' (event) {
      event.preventDefault();
      FlowRouter.go('creercompte');
    }
  });


  