var _ = require( 'lodash' )
var Poop = require( './poop' )
var Food = require( './food' );

var Jamamoji = function( name, icon ) {
  this.name = name;
  this.icon = icon;
  this.food = [];
  this.energy = 3;
  this.waste = [];
  this.alive = true;
  this.ill = false;
  this.happy = false;
  this.hungry = true;
  this.damage = 0;
  this.health = 100;
  this.special = 3;
  this.opponent_bonus = 0
  this.block = 0
  this.opponent_special = 3
}

Jamamoji.prototype = {

  eatAtStartUp: function() {
    var burger = new Food();
    this.food.push( burger );
  },

  eat: function() {
    var burger = new Food();
    this.food.push( burger );
    this.hunger();
  },

  showFood: function() {
    var food = []
    for( var i = 0; i < this.food.length; i++ ) {
      console.log( "Hello" )
      food.push( this.food[i].icon );
    }
    return food;
  },
  
  hunger: function() {
    setTimeout( function() {
      this.digest();
    }.bind( this ), 2000)
  },

  digest: function() {
      this.food.pop()
      this.poop()
  },

  poop: function() {
    setTimeout( function() {
      var plop = new Poop();
      this.waste.push( plop );
    }.bind( this ) , 2000)
  },

  showPoop: function() {
    var poops = []
    for( var i = 0; i < this.waste.length; i++ ) {
      poops.push(this.waste[i].icon);
    }
    return poops;
  },

  cleanPoop: function() {
    var length = this.waste.length;
    for( var i = 0; i < length; i++ ) {
      this.waste.pop();
    }
  },

  dead: function() {
    setInterval( function() {
      if( this.health <= 0 || 
          this.waste.length >= 5 ) {
        this.alive = false;
        this.icon = "☠️"
      }
    }.bind( this ), 1 );
  },

  sick: function() {
    setInterval( function() {
      if( this.icon === "☠️" ) {
        return;
      }
      if( this.waste.length >= 3 ) {
        this.ill = true;
        this.icon = "😷";
      }
    }.bind( this ), 1 );
  },

  setMood: function() {
    setInterval( function() {
      if( this.icon === "😷" || this.icon === "☠️" ) {
        return;
      }
      if( this.food.length >= 1 && 
          this.food.length <= 4 ) {
        this.happy = true
        this.icon = "😀"
      } else {
        this.icon = "😒"
      }
    }.bind( this ), 1 );
  },

  setHunger: function() {
    if( this.food.length === 0) {
      this.hungry = true
    }
  },

  punch: function( opponent ) {
      if( this.energy > 0 ){
      this.damage = 5;
      opponent.health -= this.damage;
      this.damage = 0;
      this.energy -= 1;
    }
  },

  super: function( opponent ) {
    if( this.health >= 50 && this.special > 0 && this.energy === 3 ) {
      this.damage = 15;
      opponent.health -= this.damage;
      this.damage = 0;
      this.special -= 1;
      this.energy -= 3;
    }
  },

  rest: function() {
    if( this.energy <= 2 ) {
      this.energy += 1
    }
  },

}

module.exports = Jamamoji;














