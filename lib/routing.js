// Première page à l'ouverture de l'application 

FlowRouter.route('/', {
    name: 'accueil',
    action() {
        BlazeLayout.render('app_body', {main:'accueil'});
    }
});

FlowRouter.route('/connexion', {
    name: 'connexion',
    action() {
        BlazeLayout.render('app_body', {main:'connexion'});
    }
});