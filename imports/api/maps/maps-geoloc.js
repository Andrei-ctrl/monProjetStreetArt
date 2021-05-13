import './maps-geoloc.html';
import './maps-geoloc.css';
import { ObjetsCollection } from '../../api/collection_DB';

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

          /*
          var markerTest = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat + 5, latLng.lng + 5),
            map: map.instance
          });
          map.instance.setCenter(markerTest.getPosition());
          //alert(latLng.lat + " et " + latLng.lng);
          */

          const contentString =
          '<div id="content">' +
          "Bonjour test" +
          "</div>";

          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        

        });

        //Add markers from DB
        //get markers
        //"fetch()" retourne la liste des objets de la db
        var listOeuvres = ObjetsCollection.find({}).fetch();
        //alert(listOeuvres.length);
        listOeuvres.forEach(oeuvre => {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(oeuvre.lat, oeuvre.lng),
            map: map.instance,
            
          });
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