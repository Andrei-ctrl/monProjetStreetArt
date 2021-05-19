import './maps-geoloc.html';
import './maps-geoloc.css';
import { ObjetsCollection } from '../../api/collection_DB';

isAccueilMap = true;

if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    
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
  
          // Center and zoom the map view onto the current position.
          map.instance.setCenter(marker.getPosition());
          map.instance.setZoom(MAP_ZOOM);
        });

        displayMarkers(map);

        //Add map listener: add marker
        google.maps.event.addListener(map.instance, 'click', function (event) {
          placeMarkerAndPanTo(event.latLng, map.instance);
      });

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
    var listOeuvres = ObjetsCollection.find({}).fetch();
    console.log(listOeuvres);
    listOeuvres.forEach(oeuvre => {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(oeuvre.lat, oeuvre.lng),
        map: map.instance,
      });
      //marker.addListener('click', surClic);
    });
  }

  /*function surClic() {
    marker.openInfoWindowHtml(
      '<strong>Place Bellecour</strong>' +
      '<br /><img src="images/place-bellecour-miniature.jpg" alt="" />' +
      '<br /><a href="http://fr.wikipedia.org/wiki/Place_Bellecour">Voir l\'article sur Wikipedia (fr)</a>'
  );
  }*/

  function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }