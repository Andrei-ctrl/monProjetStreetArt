FlowRouter.route('/', {
    name: 'accueil',
    action() {
        BlazeLayout.render('app_body');
    }
});