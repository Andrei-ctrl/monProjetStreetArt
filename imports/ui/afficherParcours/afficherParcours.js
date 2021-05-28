import './afficherParcours.html';
import './afficherParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres, Parcours } from '../../api/collection_DB.js';

const Swal = require('sweetalert2');

var MAP_ZOOM = 15;

var firstRun = true;

let compteur = 0;

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
        FlowRouter.go('choisirParcours');
    },
});

function afficherParcoursMap(map) {
    //récupérer Id du parcours (parcoursId) choisi à afficher depuis la page precédente 
    /*let parcoursId = vient de choisirParcours ou de démarrer le parcours dans créerParcours :
    quand on clique sur le bouton dans une de ces pages, l'Id du parcours doit être retenu pour qu'il puisse être utilisé ensuie*/
   
    const parcoursId = FlowRouter.getParam('_parcoursId');

    const parcours = Parcours.findOne({_id: parcoursId});

    const oeuvresIdListe = parcours.idList;

    //Option 2 : créer un tableau, soit le faire manuellement avec un forEach ?
    let listeOeuvres = [];

    
    oeuvresIdListe.forEach(oeuvreId => {
        const oeuvre = Oeuvres.findOne({_id: oeuvreId});
        listeOeuvres.push(oeuvre)

    });

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
                //afficher la photo de l'oeuvre au simple click
                infowindow.open(map, marker);
            }
        })(marker));
        google.maps.event.addListener(marker, 'dblclick', (function(marker) {
            return function() {
                //changer couleur si l'oeuvre est vue
                marker.setIcon('http://maps.google.com/mapfiles/marker_grey.png');
                compteur += 100/ oeuvresIdListe.length;
                let elem = document.getElementById("myBar");
                elem.style.width = compteur + "%";
                //Ici on enlève le simple clic pour qu'on ne puisse plus ouvrir l'image une fois l'oeuvre vue
                google.maps.event.clearInstanceListeners(marker);
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
