import './choisirParcours.html';
import './choisirParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres, Parcours } from '../../api/collection_DB';

Template.choisirParcours.events({
    'click #retour'(event) {
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
});

// Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
// A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.

Template.choisirParcours.helpers({
    // Récupérer par l'id le titre du parcours et l'image de chaque oeuvre d'un parcours et les afficher sur cete page
    // A partir de ça, cliquer sur quelque chose qui nous affche le parcours sélectionné.
    parcours: function () {
        let listeParcours = Parcours.find({}).fetch();
        // Pour chaque parcours de cette liste de parcours, je l'affiche
        
        /*listeParcours.forEach(parcours => {
            afficherParcours(parcours);
        });*/

        return Parcours.find({})
    },
});

//On crée ici un helper pour parcoursLi. Dans ce helper, on va récupérer un parcour. 
//Des attributs sont liés à chacunes des instances / des parcours dans la db.
Template.parcoursLi.helpers({
    images: function() {
        // Cette variable récupère la liste d'identifiants pour chaque parcours
        const listeIds = Parcours.findOne( { _id: this._id } ).idList;
        
        const images = [];
        listeIds.forEach(oeuvreId => {
            const oeuvre = Oeuvres.findOne({_id: oeuvreId});
            images.push(oeuvre.image)
        });
        return images
    }
})

// On ajoute l'évènement ici car chaque bouton est dans le parcoursLi
Template.parcoursLi.events({
    "click button": function(event) {
        event.preventDefault();
        FlowRouter.go('afficherParcours', { _parcoursId: this._id });
    }
})

/*function afficherParcours(parcours) {
    const li = document.createElement('li');
    li.classList.add('styleListe');
    const monBouton = document.createElement('button');
    monBouton.classList.add('styleBouton');
    monBouton.addEventListener("click", function() {
        //Redirection vers afficher parcours en passant l'Id du parcours
        FlowRouter.go('afficherParcours', { _parcoursId: parcours._id });
    });
    li.innerHTML = parcours.titre;
    li.appendChild(monBouton);
    afficherListeOeuvres(parcours.idList, li);
    document.getElementById("listeParcours").appendChild(li);
};


function afficherListeOeuvres(listeOeuvresIds, liElement) {
    listeOeuvresIds.forEach(oeuvreId => {
        const oeuvre = Oeuvres.findOne({_id: oeuvreId});
        const monImage = document.createElement('img');
        monImage.setAttribute('src', oeuvre.image);
        monImage.classList.add("imageCSS");
        liElement.appendChild(monImage);
    });
};*/


