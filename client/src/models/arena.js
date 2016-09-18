var _ = require( 'lodash' );

var Arena = function() {
  this.state = _.fill( Array(12), '_' );
}

Arena.prototype = {

  spawnPlayers: function( guy1, guy2 ) {
    this.state.splice( guy1.position, 0, guy1.icon );
    this.state.splice( guy2.position, 0, guy2.icon );
  },

  showArena: function() {
    var arena = []
    for( var i = 0; i < this.state.length; i++ ) {
      arena.push( this.state[i] );
    }
    return arena.join("");
  },

}

module.exports = Arena;