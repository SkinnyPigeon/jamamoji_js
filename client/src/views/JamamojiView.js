var Jamamoji = require( '../models/jamamoji' );

var JamamojiView = function( user ) {
  this.url = "http://localhost:5000/api/jamamojis";
  this.user = user;
}

JamamojiView.prototype = {
  getJamamoji: function() {
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader( "Content-type", "application/json" );
    request.withCredentials = true;
    request.onload = () => {
      if( request.status === 200 ) {
        var jamamojis = JSON.parse( request.responseText );
        console.log( "Jammer", jamamojis );
        this.pickJamamoji( jamamojis );
      }
    }
    request.send( null );
  },

  pickJamamoji: function( jamamojis ) {
    for( var i = 0; i < jamamojis.length; i++ ) {
      if( jamamojis[i].user_id === this.user.id ) {
        this.makeJamamoji( jamamojis[i] );
        console.log( jamamojis[i] );
      }
    }
  },

  makeJamamoji: function( jamamoji ) {
    var pet = new Jamamoji( jamamoji.name, jamamoji.icon );
    console.log( pet );
  },
}

module.exports = JamamojiView;