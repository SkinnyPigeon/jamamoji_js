var Jamamoji = require( '../models/jamamoji' );
var BattleJamamoji = require( '../models/battleJamamoji' );
var Arena = require( '../models/arena' );
var Game = require( '../models/game' );

var FightView = function() {
  var j1 = new Jamamoji( "jeff", "🤓" );
  j1.position = 3;
  var j2 = new Jamamoji( "dave", "😀" );
  j2.position = 6;

  var b1 = new BattleJamamoji( j1 );
  var b2 = new BattleJamamoji( j2 );
  var players = [ b1, b2 ];
  var arena = new Arena();
  var game = new Game( players, arena );
  arena.spawnPlayers( b1, b2 );
  game.randomStart();

  this.arena = arena;
  this.game = game;
  console.log( this.game );
  this.icons = [];
  this.display();
}

FightView.prototype = {

  display: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var fight = document.createElement( 'h1' );
    fight.innerText = this.arena.showArena();
    fight.className = 'fightPlane';
    this.icons.push( fight );
    fightPlace.appendChild( fight );
    this.moveLeft();
  },

  moveLeft: function(){
    var fightPlace = document.getElementById( 'fight-place' );
    var leftButton = document.createElement( 'button' );
    leftButton.innerText = "left";
    this.icons.push( leftButton );
    leftButton.onclick = function() {
      this.hide();
      var player = this.game.currentPlayer;
      player.moveLeft( player, this.arena.state );
      this.show();
    }.bind( this );
    fightPlace.appendChild( leftButton );
  },

  hide: function() {
    for( var i = 0; i < this.icons.length; i++ ) {
      this.icons[i].className = 'hideFight';
    }
  },

  show: function() {
    // for( var i = 0; i < this.icons.length; i++ ) {
    //   this.icons[i].className = 'showFight';
    // }
    var fightPlace = document.getElementById( 'fight-place' );
    var fight = document.createElement( 'h1' );
    fight.innerText = this.arena.showArena();
    fight.className = 'fightPlane';
    fightPlace.appendChild( fight );
    this.moveLeft();
  },


  

}



module.exports = FightView;