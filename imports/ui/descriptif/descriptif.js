import './descriptif.html';
import './descriptif.css';

import { Session } from 'meteor/session';

Template.descriptif.events({
    'click #retour'(event){
    event.preventDefault();
    const routeDOrigine = Session.get('routeDOrigine');
    FlowRouter.go(routeDOrigine);
    }
})