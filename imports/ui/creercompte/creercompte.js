import './creercompte.html';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

/*
Template.creercompte.events({

    'click #creercompte' (event) {
        event.preventDefault();
        let nom = document.getElementById('username').value;
        let mail = document.getElementById('email').value;
        let mdp = document.getElementById('password').value;
        let mdp2 = document.getElementById('password2').value;
        let pUser = document.getElementById('pUser');
        let pMail = document.getElementById('pMail');
        let pMdp = document.getElementById('pMdp');

        if (nom != '' && mdp != '' && mail != '') {
            if (mdp == mdp2) {
                if(mdp.length > 5) {
                    Accounts.createUser({
                        username: nom,
                        password: mdp,
                        email: mail,
                    },
                    (error) => {
                        if (error) {
                            alert(error.message);
                        } else {
                            setTimeout(() => FlowRouter.go('accueilLog'), 200);
                        }
                    });

                } else {
                    event.preventDefault();
                    pMdp.innerHTML = 'Mot de passe trop court!';
                    pMdp.style.color = 'red';
                    pMail.innerHTML = '';
                    pMail.style.color = 'red';
                    pUser.innerHTML = '';
                    pUser.style.color = 'red';
                }
            } else{
                event.preventDefault();
                pMdp.innerHTML = 'Vos mots de passe ne correspondent pas!';
                pMdp.style.color = 'red';
                pMail.innerHTML = '';
                pMail.style.color = 'red';
                pUser.innerHTML = '';
                pUser.style.color = 'red';
            }
        } else {
            event.preventDefault();
            pMdp.innerHTML = 'Veuillez remplir les champs!';
            pMdp.style.color = 'red';
            pMail.innerHTML = 'Veuillez remplir les champs!';
            pMail.style.color = 'red';
            pUser.innerHTML = 'Veuillez remplir les champs!';
            pUser.style.color = 'red';
        }
    },

})

Template.creercompte.events({
    'click #seConnecter' (event) {
      event.preventDefault();
      FlowRouter.go('connexion');
    }
  });
*/

  Template.register.events({
    "submit .form-signup": function (event) {
      event.preventDefault()
      var email = trimInput(event.target.email.value);
      var password = trimInput(event.target.password.value);
      var password2 = trimInput(event.target.password2.value);
      var first_name = trimInput(event.target.first_name.value);
      var last_name = trimInput(event.target.last_name.value);

      if (isNotEmpty(email) && (isNotEmpty(first_name) && (isNotEmpty(last_name) && (isEmail(email) && areValidPasswords(password, password2))))) {
        Accounts.createUser({
          email: email,
          password: password,
          profile: {
            first_name: first_name,
            last_name: last_name,
          }
        }, function (err) {
          if (err) {
            Swal.fire('Error!',err.message,'error');
          } else {
            Swal.fire('Success!','The account was created!','success');
            setTimeout(() => FlowRouter.go('accueilLog'), 200);
          }
        });
      }

      //Prevent submit
      return false;
    },
  });



  // Validation rules

  // Trim helper
  var trimInput = function (val) {
    return val.replace(/ˆ\s*|\s*$/g, "");
  }

  //Check for empty fields
  isNotEmpty = function (value) {
    if (value && value !== '') {
      return true;
    }
    Swal.fire('Error!','Please fill in all fields','error');
    return false;
  };

  //Validate email
  isEmail = function (value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
      return true;
    }
    Swal.fire('Error!','Please use a valid email address','error');
    return false;
  };

  //Check Password Field
  isValidPassword = function (password) {
    if (password.length < 11) {
      Swal.fire('Error!','Password must be at least 11 characters','error');
      return false;
    }
    return true;
  };

  //Match Password
  areValidPasswords = function (password, confirm) {
    if (!isValidPassword(password)) {
      return false;
    }
    if (password !== confirm) {
      Swal.fire('Error!','Passwords don not match','error');
      return false;
    }
    return true;
  };
