import './creercompte.html';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { meteor } from 'meteor/meteor';

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
                            setTimeout(() => FlowrouterGo('accueilLog'), 200);
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