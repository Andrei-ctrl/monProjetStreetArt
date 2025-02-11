import './ajouterOeuvre.html';
import './ajouterOeuvre.css';
import '../../api/maps/maps-geoloc.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// importer fichier
import { Oeuvres } from '../../api/collection_DB';

const Swal = require('sweetalert2');

Template.ajouterOeuvre.helpers({
    objets: function() {
        return Oeuvres.find({})
    }
})

Template.ajouterOeuvre.events({
    'click #ajouterOeuvrePActuelle': function() {
      (async () => {
        const { value: file } = await Swal.fire({
          title: 'Sélectionner une image',
          input: 'file',
          inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
          }
        })
        
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            Swal.fire({
              title: 'Vous avez sélectionné cette image',
              imageUrl: e.target.result,
              imageAlt: 'The uploaded picture',
              confirmButtonText: 'Suivant',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Confirmation',
                  text: "Voulez-vous vraiment ajouter votre position actuelle",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Oui'
                }).then((result) => {
                  if (result.isConfirmed) {
                      var latLng = Geolocation.latLng();
                      let lat = latLng.lat;
                      let lng = latLng.lng;
                      let image = e.target.result;
                      // Appel de la méthode
                      Meteor.call('ajouterOeuvre', lat, lng, image);
              
                      //display confirmation message
                      Swal.fire(
                          'Ajouté',
                          'Votre position actuelle (' + lat + ', ' + lng + ') a été ajoutée.',
                          'success',
                      ).then((resultConfirme) => {
                        if (resultConfirme.isConfirmed) {
                            //sauver liste d'ID d'oeuvre dans DB
                            location.reload();
        
                      };
                    });
                  }
                })
              }
            })
          }
          reader.readAsDataURL(file)
        }
        
        })()
        
        /**/
    },
    'click #retour'(event){
    event.preventDefault();
    FlowRouter.go('accueilLog');
    },
});