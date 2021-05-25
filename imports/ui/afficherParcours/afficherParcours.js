import './afficherParcours.html';
import './afficherParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres, Parcours } from '../../api/collection_DB.js';

const Swal = require('sweetalert2');

var MAP_ZOOM = 15;

var firstRun = true;

Meteor.startup(function () {
    GoogleMaps.load();
});

Template.afficherParcours.onCreated(function () {
    var self = this;

    GoogleMaps.ready('map', function (map) {
        var marker;

        // Create and move the marker when latLng changes.
        self.autorun(function () {
            var latLng = Geolocation.latLng();
            if (!latLng)
                return;

            // If the marker doesn't yet exist, create it.
            if (!marker) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latLng.lat, latLng.lng),
                    map: map.instance
                });
            }
            // The marker already exists, so we'll just change its position.
            else {
                marker.setPosition(latLng);
            }

            if (firstRun) {
                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
                firstRun = false;
            }
        });

        afficherParcoursMap(map);

    });
});

Template.afficherParcours.helpers({
    geolocationError: function () {
        var error = Geolocation.error();
        return error && error.message;
    },
    mapOptions: function () {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        };
    },
});

Template.afficherParcours.events({
    'click #retour'(event) {
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
});

function afficherParcoursMap(map) {
    //récupérer Id du parcours choisi à afficher depuis la page precédente (parcoursId)
    //let parcoursId = vient de choisirParcours
    //let parcours = Parcours.find(parcoursId);
    //let oeuvresIdListe = parcours.idList;

    //Option 1 :
    //let listeOeuvres = Oeuvres.find(oeuvresIdListe).fetch();

    //Option 2 :
    //let listeOeuvres = [];

    /*
    oeuvresIdListe.forEach(oeuvreId => {
        let oeuvre = Oeuvres.find(oeuvreId).fetch();
        listeOeuvres.push(oeuvre)

    });*/

    //Pour le moment on utilise juste le premier parcours de la DB
    
    //let listeParcours = Parcours.find({}).fetch();
    //let parcours = listeParcours[0];
    
    //

    let listeOeuvres = Oeuvres.find({}).fetch();
    listeOeuvres.push(listeOeuvres[0]);
    let oeuvresARelier = [];

    listeOeuvres.forEach(oeuvre => {
        oeuvresARelier.push({ lat: oeuvre.lat, lng: oeuvre.lng });

        marker = new google.maps.Marker({
            // Je distingue le marqueur de la position actuelle de la position des oeuvres
            icon: 'http://maps.google.com/mapfiles/marker_green.png',
            position: new google.maps.LatLng(oeuvre.lat, oeuvre.lng),
            map: map.instance,
        });
        const contentString = `<img src="${oeuvre.image}">`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                infowindow.open(map, marker);
                //changer couleur si l'oeuvre est vue
                marker.setIcon('http://maps.google.com/mapfiles/marker_orange.png');
            }
        })(marker));
    });


    relierOeuvres(map.instance, oeuvresARelier);

}

function relierOeuvres(map, oeuvresARelier) {
      const flightPath = new google.maps.Polyline({
        path: oeuvresARelier,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(map);
}