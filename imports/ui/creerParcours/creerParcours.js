import './creerParcours.html';
import './creerParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres } from '../../api/collection_DB.js';

const Swal = require('sweetalert2');

let listeOeuvres = [];
let listeOeuvresId = [];

var MAP_ZOOM = 15;

var firstRun = true;

Meteor.startup(function () {
    GoogleMaps.load();
});

Template.creerParcours.onCreated(function () {
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

        displayMarkers(map);

    });
});

Template.creerParcours.helpers({
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

Template.creerParcours.events({
    'click #confirmerParcours': function () {
        Swal.fire({
            title: 'Vous avez sélectionné cette image',
            confirmButtonText: 'Suivant',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Confirmation',
                    text: "Voulez-vous vraiment ajouter ce parcours",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui'
                }).then((result) => {
                    if (result.isConfirmed) {
                        //sauver liste d'ID d'oeuvre dans db
                        Meteor.call('ajouterParcours', listeOeuvresId);

                        //display confirmation message
                        Swal.fire(
                            'Ajouté',
                            'Votre parcours a été ajoutée.',
                            'success'
                        ).then((result) => {
                            document.getElementById("listeParcours").innerHTML = "";
                            location.reload();
                        })
                    }
                })
            }
        })
    },
    'click #retour'(event) {
        event.preventDefault();
        FlowRouter.go('accueilLog');
    },
});

function displayMarkers(map) {
    var listOeuvres = Oeuvres.find({}).fetch();
    console.log(listOeuvres);
    listOeuvres.forEach(oeuvre => {
        marker = new google.maps.Marker({
            // Je distingue le marqueur de la position actuelle de la position des oeuvres
            icon: 'http://maps.google.com/mapfiles/marker_green.png',
            position: new google.maps.LatLng(oeuvre.lat, oeuvre.lng),
            map: map.instance,
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                addMarkerToList(oeuvre.lat, oeuvre.lng, oeuvre._id, oeuvre.image);
                marker.setIcon('http://maps.google.com/mapfiles/marker_orange.png');
            }
        })(marker));
    })
}

function addMarkerToList(lat, lng, id, image) {
    const oeuvreText = lat + ' ' + lng + ' ' + id + ' ' + `<img src="${image}">`;
    listeOeuvres.push(oeuvreText);
    listeOeuvresId.push(id);
    console.log(listeOeuvres, listeOeuvresId);
    const li = document.createElement('li');
    li.innerHTML = oeuvreText;
    document.getElementById("listeParcours").appendChild(li);
}