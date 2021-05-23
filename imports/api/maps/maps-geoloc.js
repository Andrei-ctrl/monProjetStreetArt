import './maps-geoloc.html';
import './maps-geoloc.css';
import { Oeuvres } from '../../api/collection_DB';

isAccueilMap = true;

if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    var prermiereExecution = true;
    
    Meteor.startup(function() {
      GoogleMaps.load();
    });
  
    Template.map.onCreated(function() {
      var self = this;
  
      GoogleMaps.ready('map', function(map) {
        var marker;
  
        // Create and move the marker when latLng changes.
        self.autorun(function() {
          var latLng = Geolocation.latLng();
          if (! latLng)
            return;
  
          // If the marker doesn't yet exist, create it.
          if (! marker) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(latLng.lat, latLng.lng),
              map: map.instance
            });
          }
          // The marker already exists, so we'll just change its position.
          else {
            marker.setPosition(latLng);
          }
  
          // Cela permet d'éviter que la page se rercharge et qu'un zoom et un center soit fait plus d'une fois
          if (prermiereExecution) {
            // Center and zoom the map view onto the current position.
            map.instance.setCenter(marker.getPosition());
            map.instance.setZoom(MAP_ZOOM);
            prermiereExecution = false;
          }
        });

        displayMarkers(map);

        //Add map listener: add marker
        /*google.maps.event.addListener(map.instance, 'click', function (event) {
          placeMarkerAndPanTo(event.latLng, map.instance);
        });*/
      });
    });
  
    Template.map.helpers({
      geolocationError: function() {
        var error = Geolocation.error();
        return error && error.message;
      },
      mapOptions: function() {
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
        icon : 'http://maps.google.com/mapfiles/marker_green.png', 
        position: new google.maps.LatLng(oeuvre.lat, oeuvre.lng),
        map: map.instance,
      });
      const contentString = `<img src="${oeuvre.image}">`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });

    })
  }

  function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }