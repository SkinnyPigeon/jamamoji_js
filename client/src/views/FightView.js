var Jamamoji = require( '../models/jamamoji' );
var BattleJamamoji = require( '../models/battleJamamoji' );
var Arena = require( '../models/arena' );
var Game = require( '../models/game' );

var FightView = function() {
  var j1 = new Jamamoji( "jeff", "🤓" );
  j1.position = 3;
  j1.energy = 50;
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
  this.display();
}

FightView.prototype = {

  display: function() {
    this.resetView();
    console.log( this.game );
    var fightPlace = document.getElementById( 'fight-place' );
    var fight = document.createElement( 'h1' );
    fight.innerText = this.arena.showArena();
    fight.className = 'fightPlane';
    fightPlace.appendChild( fight );
    this.moveLeft();
    this.moveRight();
    this.punch();
    this.kick();
    this.dashLeft();
    this.dashRight();
    this.special();
    this.block();
    this.endTurn();
  },

  moveLeft: function(){
    var fightPlace = document.getElementById( 'fight-place' );
    var leftButton = document.createElement( 'button' );
    leftButton.innerText = "left";
    leftButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.moveLeft( player, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( leftButton );
  },

  moveRight: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var rightButton = document.createElement( 'button' );
    rightButton.innerText = "right";
    rightButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.moveRight( player, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( rightButton );
  },

  punch: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var punchButton = document.createElement( 'button' );
    punchButton.innerText = "punch";
    punchButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      var otherPlayer = this.game.otherPlayer;
      currentPlayer.punch( currentPlayer, otherPlayer, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( punchButton );
  },

  kick: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var kickButton = document.createElement( 'button' );
    kickButton.innerText = "kick";
    kickButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      var otherPlayer = this.game.otherPlayer;
      currentPlayer.kick( currentPlayer, otherPlayer, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( kickButton );
  },

  dashLeft: function(){
    var fightPlace = document.getElementById( 'fight-place' );
    var dashLeftButton = document.createElement( 'button' );
    dashLeftButton.innerText = "dashLeft";
    dashLeftButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.dashLeft( player, this.arena.state, this.game );
      this.display();
    }.bind( this );
    fightPlace.appendChild( dashLeftButton );
  },

  dashRight: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var dashRightButton = document.createElement( 'button' );
    dashRightButton.innerText = "dashRight";
    dashRightButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.dashRight( player, this.arena.state, this.game );
      this.display();
    }.bind( this );
    fightPlace.appendChild( dashRightButton );
  },

  special: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var specialButton = document.createElement( 'button' );
    specialButton.innerText = "special";
    specialButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      var otherPlayer = this.game.otherPlayer;
      currentPlayer.special( currentPlayer, otherPlayer, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( specialButton );
  },

  block: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var blockButton = document.createElement( 'button' );
    blockButton.innerText = "block";
    blockButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      currentPlayer.blockHit( currentPlayer );
      this.display();
    }.bind( this );
    fightPlace.appendChild( blockButton );
  },

  endTurn: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var endTurnButton = document.createElement( 'button' );
    endTurnButton.innerText = "endTurn";
    endTurnButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      var otherPlayer = this.game.otherPlayer;
      currentPlayer.endTurn( this.game );
      this.display();
    }.bind( this );
    fightPlace.appendChild( endTurnButton );
  },

  resetView: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    fightPlace.innerText = "";
  }
}

module.exports = FightView;