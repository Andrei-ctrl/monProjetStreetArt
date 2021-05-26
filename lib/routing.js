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
        BlazeLayout.render('app_body', {main:'login'});
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
        BlazeLayout.render('app_body', {main:'register'});
    }
});

FlowRouter.route('/profil', {
    name: 'profil',
    action() {
        BlazeLayout.render('app_body', {main:'profil'});
    }
});

FlowRouter.route('/ajouterOeuvre', {
    name: 'ajouterOeuvre',
    action() {
        BlazeLayout.render('app_body', {main:'ajouterOeuvre'});
    }
});

FlowRouter.route('/creerParcours', {
    name: 'creerParcours',
    action() {
        BlazeLayout.render('app_body', {main:'creerParcours'});
    }
});

FlowRouter.route('/choisirParcours', {
    name: 'choisirParcours',
    action() {
        BlazeLayout.render('app_body', {main:'choisirParcours'});
    }
});

FlowRouter.route('/descriptif', {
    name: 'descriptif',
    action() {
        BlazeLayout.render('app_body', {main:'descriptif'});
    }
});

FlowRouter.route('/afficherParcours/:_parcoursId', {
    name: 'afficherParcours',
    action() {
        BlazeLayout.render('app_body', {main:'afficherParcours'});
    }
});

