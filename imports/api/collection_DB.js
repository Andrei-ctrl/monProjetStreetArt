import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Variable DB
export const ObjetsCollection = new Mongo.Collection('objets_collection');

// Ecriture des méthodes
Meteor.methods({
    'retournerOeuvres' () {
        let oeuvres = ObjetsCollection.find({});
        return oeuvres;
    },

    ajouterOeuvre: function(lat, lng, image) {
        let ajout = ObjetsCollection.insert({
                lat: lat,
                lng: lng,
                image: image,
        });
        console.log('success!');
        return ajout;
    },

    supprimerOeuvre: function(id) {
       let remove = ObjetsCollection.remove(id);
       return remove;
    }
})