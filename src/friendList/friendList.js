import React from 'react'
import ReactDOM from 'react-dom'

const {PathFactory} = require('ldflex');
const {default: ComunicaEngine} = require('ldflex-comunica');
const {namedNode} = require('@rdfjs/data-model');

// The JSON-LD context for resolving properties
const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
    }
};
// The query engine and its source
const queryEngine = new ComunicaEngine('https://ruben.verborgh.org/profile/');
// The object that can create new paths
const path = new PathFactory({context, queryEngine});
const user = path.create({ subject: namedNode('https://ruben.verborgh.org/profile/#me') });

function listView(props){
    return <ul className="list-group" id="friendList">
        <li>{props.name}</li>
    </ul>
}

var listFriends = (async person => {
    (await person.friends.givenName.pathExpression);
})(user);

const element = listFriends.forEach(f ()=> <listView name = person.friends.givenName/>);

ReactDOM.render(element, document.getElementById('root'));
function friendList(props){
    return <li>{props.name}</li>;
}

