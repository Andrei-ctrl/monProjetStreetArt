import './accueil.html';
import './accueil.css';
import '../../api/maps/maps-geoloc.js';
import '../connexion/connexion.js';
import {Template} from 'meteor/templating';

Template.accueil.events({
  'click #LogIn' (event) {
    event.preventDefault();
    FlowRouter.go('connexion');
  }
});