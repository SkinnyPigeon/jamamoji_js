var SignOutView = require( '../views/SignOutView' );
var FightView = require( '../views/FightView' );

var MainView = function( pet ) {
  this.pet = pet;
  this.pet.hunger();
  this.pet.sick();
  this.pet.dead();
  this.pet.showPoop();
  this.pet.setMood();
  this.pet.countHappiness();
  this.displaySignOut( this.pet );
  this.icons = [];
}

MainView.prototype = {
  display: function() {
    var iconPlace = document.getElementById( 'icon-place' );
    var cleanPoop = document.getElementById( 'clean-poop' );
    var feedPlace = document.getElementById( 'feed-place' );
    var medicinePlace = document.getElementById( 'give-medicine' );
    var fightPlace = document.getElementById( 'have-fight' );
    var petPlace = document.getElementById( 'pet-place' );
    var poopPlace = document.getElementById( 'poop-place' );
    var giveFood = document.getElementById( 'give-food' );

    var petIcon = document.createElement( 'h1' );
    petIcon.id = 'pet';
    petIcon.className = 'hidden';

    setInterval( function() {
      petIcon.innerText = this.pet.icon;
      petPlace.appendChild( petIcon );
    }.bind( this ), 1 );

    var foodIcon = document.createElement( 'h2' );
    setInterval( function() {
      foodIcon.innerText = this.pet.showFood();
      feedPlace.appendChild( foodIcon );
    }.bind( this ), 1 );

    var poopIcon = document.createElement( 'h2' );
    setInterval( function() {
      poopIcon.innerText = this.pet.showPoop();
      poopPlace.appendChild( poopIcon );
    }.bind( this ), 1 );

    var poopButton = document.createElement( 'button' );
    poopButton.innerText = "🚽";
    poopButton.id = "poopButton";
    poopButton.onclick = function() {
      this.pet.cleanPoop();
    }.bind( this )
    iconPlace.appendChild( poopButton );

    var feedButton = document.createElement( 'button' );
    feedButton.innerText = "🍔";
    feedButton.id = "feedButton";
    feedButton.onclick = function() {
     this.pet.eat();
    }.bind( this )
    iconPlace.appendChild( feedButton );

    var cureButton = document.createElement( 'button' );
    cureButton.innerText = "💊";
    cureButton.id = "cureButton";
    cureButton.onclick = function() {
      this.pet.cure();
    }.bind( this );
    iconPlace.appendChild( cureButton );

    var fightButton = document.createElement( 'button' );
    fightButton.innerText = "👊";
    fightButton.id = "fightButton";
    fightButton.onclick = function() {
      this.pet.pause = true;
      this.haveFight( this.pet, this.icons );
    }.bind( this );
    iconPlace.appendChild( fightButton );

    this.icons.push( petIcon );
    this.icons.push( foodIcon );
    this.icons.push( poopIcon );
  },

  displaySignOut: function( pet ) {
    var view = new SignOutView( pet );
    view.display();
  },

  haveFight: function( pet ) {
    console.log( pet )
    pet.pause = true;
    this.resetView();
    var fight = new FightView( pet );
    console.log( this.icons );
    this.hide();
  },

  hide: function() {
    for( var i = 0; i < this.icons.length; i++ ) {
      this.icons[i].className = 'hidden';
    }
  },


  resetView: function() {
    var petPlace = document.getElementById( 'pet-place' );
    var pet = document.getElementById( 'pet' );
    pet.innerText = "";
    console.log( pet );
    petPlace.appendChild( pet );
  }


}


module.exports = MainView;