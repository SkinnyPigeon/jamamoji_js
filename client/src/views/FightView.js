var Jamamoji = require( '../models/jamamoji' );
var BattleJamamoji = require( '../models/battleJamamoji' );
var Arena = require( '../models/arena' );
var Game = require( '../models/game' );

var FightView = function( jamamoji ) {
  var j1 = jamamoji;
  j1.position = 5;
  j1.energy = 150;
  var j2 = new Jamamoji( "dave", "😀" );
  j2.position = 8;

  var b1 = new BattleJamamoji( j1 );
  var b2 = new BattleJamamoji( j2 );
  var players = [ b1, b2 ];
  var arena = new Arena();
  var game = new Game( players, arena );
  arena.spawnPlayers( b1, b2 );
  game.randomStart();

  this.p1 = b1;
  this.p2 = b2;
  this.arena = arena;
  this.game = game;
  this.display();
}

FightView.prototype = {

  display: function() {
    this.resetView();

    var fightPlace = document.getElementById( 'fight-place' );
    var fight = document.createElement( 'h1' );
    fight.innerText = this.arena.showArena();
    fight.className = 'fightPlane';
    fightPlace.appendChild( fight );

    var turnPlace = document.getElementById( 'turn-place' );
    var turn = document.createElement( 'h3' );
    turn.innerText = this.game.currentPlayer.name;
    turnPlace.appendChild( turn );

    var statPlace = document.getElementById( 'stat-place' );
    var statList = document.createElement( 'ul' );

    var p1Health = document.createElement( 'li' );
    var p1Energy = document.createElement( 'li' );
    var p2Health = document.createElement( 'li' );
    var p2Energy = document.createElement( 'li' );

    p1Health.innerText = this.p1.name.toUpperCase() + " HEALTH: " + this.p1.health; 
    p1Energy.innerText = this.p1.name.toUpperCase() + " ENERGY: " + this.p1.energy; 
    p2Health.innerText = this.p2.name.toUpperCase() + " HEALTH: " + this.p2.health; 
    p2Energy.innerText = this.p2.name.toUpperCase() + " ENERGY: " + this.p2.energy; 

    statList.appendChild( p1Health );
    statList.appendChild( p1Energy );
    statList.appendChild( p2Health );
    statList.appendChild( p2Energy );

    statPlace.appendChild( statList );

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
    leftButton.innerText = "←";
    leftButton.id = "left";
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
    rightButton.innerText = "→";
    rightButton.id = "right";
    rightButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.moveRight( player, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( rightButton );
  },

  dashLeft: function(){
    var fightPlace = document.getElementById( 'fight-place' );
    var dashLeftButton = document.createElement( 'button' );
    dashLeftButton.innerText = "⇤";
    dashLeftButton.id = "dashLeft";
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
    dashRightButton.innerText = "⇥";
    dashRightButton.id = "dashRight";
    dashRightButton.onclick = function() {
      var player = this.game.currentPlayer;
      player.dashRight( player, this.arena.state, this.game );
      this.display();
    }.bind( this );
    fightPlace.appendChild( dashRightButton );
  },

  punch: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var punchButton = document.createElement( 'button' );
    punchButton.innerText = "👊";
    punchButton.id = "punch";
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
    kickButton.innerText = "👟";
    kickButton.id = "kick";
    kickButton.onclick = function() {
      var currentPlayer = this.game.currentPlayer;
      var otherPlayer = this.game.otherPlayer;
      currentPlayer.kick( currentPlayer, otherPlayer, this.arena.state );
      this.display();
    }.bind( this );
    fightPlace.appendChild( kickButton );
  },

  special: function() {
    var fightPlace = document.getElementById( 'fight-place' );
    var specialButton = document.createElement( 'button' );
    specialButton.innerText = "💥";
    specialButton.id = "special";
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
    blockButton.innerText = "💪";
    blockButton.id = "block";
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
    endTurnButton.innerText = "💤";
    endTurnButton.id = "endTurn";
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
    var turnPlace = document.getElementById( 'turn-place' );
    var petPlace = document.getElementById( 'pet-place' );
    var statPlace = document.getElementById( 'stat-place' );

    fightPlace.innerText = "";
    petPlace.innerText = "";
    statPlace.innerText = "";
    turnPlace.innerText = "";
  }
}

module.exports = FightView;