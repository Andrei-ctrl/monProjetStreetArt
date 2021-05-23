import './creerParcours.html';
import './creerParcours.css';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres } from '../../api/collection_DB';

const Swal = require('sweetalert2');

let listeOeuvres;
let listeOeuvresId;

Template.creerParcours.onCreated(function () {
    listeOeuvres = [];
    listeOeuvresId = [];
    //Meteor.subscribe("oeuvres")
});

Template.creerParcours.helpers({
    objets: function () {
        return Oeuvres.find({})
    }
})


Template.creerParcours.helpers({
    oeuvres: function () {
        //alert(listeOeuvres[listeOeuvres.length - 1].);
        let ret = [];
        listeOeuvres.forEach(oeuvres => {
            ret.push({
                text: oeuvres
            })
        });

        return listeOeuvres;
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
                        )
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

if (Meteor.isClient) {
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
            }
        }
    });
}

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
        const contentString = `<img src="${oeuvre.image}">`;
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        marker.addListener('click', () => {
            infowindow.open(map, marker);
            addMarkerToList(oeuvre.lat, oeuvre.lng, contentString, oeuvre._id);
            marker = marker.setIcon('http://maps.google.com/mapfiles/marker_orange.png');
        });

    })
}

function addMarkerToList(lat, lng, contentString, id) {
    const oeuvreText = lat + ' ' + lng + ' ' + contentString;
    listeOeuvres.push(oeuvreText);
    listeOeuvresId.push(id);
    //alert(listeOeuvres);
    alert("Oeuvre added " + listeOeuvres.length + "Oeuvre id " + id);
    Template.creerParcours.__helpers.get('oeuvres').call();
}