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

FlowRouter.route('/accueilLog', {
    name: 'accueilLog',
    action() {
        BlazeLayout.render('app_body', {main:'accueilLog'});
    }
});

FlowRouter.route('/creercompte', {
    name: 'creercompte',
    action() {
        BlazeLayout.render('app_body', {main:'creercompte'});
    }
});