import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { meteor } from 'meteor/meteor';

import './creercompte.html';

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
                        } else{
                            setTimeout(() => FlowrouterGo('apropos'), 200);
                        }
                    });
                } else{
                    event.preventDefault();
                    pMdp.innerHTML = 'Mot de passe trop court!';
                    pMail.innerHTML = '';
                    pUser.innerHTML = '';
                }
            } else{
                event.preventDefault();
                pMdp.innerHTML = 'Vos mots de passe ne correspondent pas!';
                pMail.innerHTML = '';
                pUser.innerHTML = '';
            }
        } else{
            event.preventDefault();
            pMdp.innerHTML = 'Veuillez remplir les champs!';
            pMail.innerHTML = 'Veuillez remplir les champs!';
            pUser.innerHTML = 'Veuillez remplir les champs!';
        }
    },

})