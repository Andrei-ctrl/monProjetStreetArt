import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Variable DB
export const ObjetsCollection = new Mongo.Collection('objets_collection');

// Ecriture des méthodes
Meteor.methods({
    ajouterObjet : function(image, video) {
        let ajout = ObjetsCollection.insert({
            contenu: image, video
        });
        console.log('success!');
        return ajout;
    }
})