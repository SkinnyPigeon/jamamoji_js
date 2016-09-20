var Jamamoji = require( '../models/jamamoji' );
var MainView = require( './MainView' );

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
        this.pickJamamoji( jamamojis );
      }
    }
    request.send( null );
  },

  pickJamamoji: function( jamamojis ) {

    for( var i = 0; i < jamamojis.length; i++ ) {

    console.log( this.user.id );
    console.log( jamamojis );

      if( jamamojis[i].user_id === this.user.id ) {
        this.makeJamamoji( jamamojis[i] );
      }
    }
  },

  makeJamamoji: function( jamamoji ) {
    var pet = new Jamamoji( jamamoji.name, jamamoji.icon, jamamoji.original_icon );
    pet.id = jamamoji.id;
    pet.alive = jamamoji.alive;
    pet.originalIcon = jamamoji.original_icon;
    pet.block = jamamoji.block;
    pet.damage = jamamoji.damage;
    pet.energy = jamamoji.energy;
    pet.happy = jamamoji.happy;
    pet.health = jamamoji.health;
    pet.hungry = jamamoji.hungry;
    pet.opponentBonus = jamamoji.opponent_bonus;
    pet.opponentSpecial = jamamoji.opponent_special;
    pet.special = jamamoji.special;
    pet.happyCount = jamamoji.happy_count;
    pet.foodCount = jamamoji.food_count;
    this.fillPet( pet, jamamoji );
  },

  fillPet: function( newPet, storedPet ) {
    for( var i = 0; i  < storedPet.food; i++ ) {
      newPet.eatAtStartUp();
    }
    for( var i = 0; i < storedPet.waste; i++ ) {
      newPet.poopAtStart();
    }
    this.mainView( newPet );
  },

  mainView: function( pet ) {
    var view = new MainView( pet );
    view.display();
  },
}

module.exports = JamamojiView;