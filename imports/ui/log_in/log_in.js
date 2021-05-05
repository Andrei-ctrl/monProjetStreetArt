import './log_in.html';

if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event, template){
            event.preventDefault();
            var emailVar = template.find('#email').value;
            var passwordVar = template.find('#password').value;
            Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
    }
});
    Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        meteor.loginWithPassword(emailVar,passwordVar);
    }
});
    Template.dashboard.events({
    'click.logout': function(event){
        evewnt.preventDefault();
        Meteor.logout();
    }
});
};
