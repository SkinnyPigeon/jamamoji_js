var _ = require( 'lodash' );

var Game = function( players, arena ) {
  this.players = players;
  this.arena = arena;
  this.currentPlayer = players[0];
  this.otherPlayer = players[1];
}

Game.prototype = {

  randomStart: function() {
    var chance = Math.random( 20 - 1 ) + 1;
    if( chance > 10 ) {
      this.arena = _.reverse( this.players );
      this.currentPlayer = this.players[0];
    }
  },

  endTurn: function() {
    this.arena = _.reverse( this.players );
    this.currentPlayer = this.players[0];
    this.otherPlayer = this.players[1];
    this.currentPlayer.block = this.currentPlayer.originalBlock;
    if( this.currentPlayer.energy >= 3 ) {
      return;
    } else if( this.currentPlayer.energy === 2 ) {
      this.currentPlayer.addEnergy1();
      return;
    } else if ( this.currentPlayer.energy <= 1 ) {
      this.currentPlayer.addEnergy2();
      return;
    }
  },

  win: function() {
    if( this.otherPlayer.health <= 0 ) {
      return true;
    }
  },

  updateStats: function() {
    return this.currentPlayer.health && this.otherPlayer.energy;
  }

}

module.exports = Game;