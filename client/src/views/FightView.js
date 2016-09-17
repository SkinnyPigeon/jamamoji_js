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
}



module.exports = FightView;