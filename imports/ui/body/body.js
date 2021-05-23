import './body.html';
import './body.css';
//import '../collection/collections.js';
//import '../element_collection/element_collection.js';
import '../../api/maps/maps-geoloc.js';
import '../../../lib/routing.js';
import '../accueil/accueil.js';
import '../creercompte/creercompte.js';
import '../connexion/connexion.js';
import '../accueilLog/accueilLog.js';
import '../profil/profil.js';
import '../ajouterOeuvre/ajouterOeuvre.js';
import '../descriptif/descriptif.js';

Template.body.events({
    'click .wrapper'(event){
    event.preventDefault();
    FlowRouter.go('descriptif');
    }
})