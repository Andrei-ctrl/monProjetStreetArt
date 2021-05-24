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
import '../creerParcours/creerParcours.js';
import '../choisirParcours/choisirParcours.js';

import { Session } from 'meteor/session';

Template.app_body.events({
    'click #cta'(event){
    event.preventDefault();
    const routeActuelle = FlowRouter.getRouteName();
    console.log(routeActuelle);
    Session.set('routeDOrigine', routeActuelle);
    FlowRouter.go('descriptif');
    }
})