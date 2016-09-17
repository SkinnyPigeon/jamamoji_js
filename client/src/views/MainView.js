var MainView = function( pet ) {
  this.pet = pet;
  this.pet.hunger();
  this.pet.sick();
  this.pet.setMood();
  this.pet.dead();
}

MainView.prototype = {
  display: function() {
    var cleanPoop = document.getElementById( 'clean-poop' );
    var feedPlace = document.getElementById( 'feed-place' );
    var medicinePlace = document.getElementById( 'give-medicine' );
    var petPlace = document.getElementById( 'pet-place' );
    var poopPlace = document.getElementById( 'poop-place' );
    var giveFood = document.getElementById( 'give-food' );

    var petIcon = document.createElement( 'h1' );
    
    console.log( this.pet )
    setInterval( function() {
      petIcon.innerText = this.pet.icon;
      petPlace.appendChild( petIcon );
    }.bind( this ), 1 );

    var foodIcon = document.createElement( 'h1' );
    setInterval( function() {
      foodIcon.innerText = this.pet.showFood();
      feedPlace.appendChild( foodIcon );
    }.bind( this ), 1 );

    var poopIcon = document.createElement( 'h1' );
    setInterval( function() {
      poopIcon.innerText = this.pet.showPoop();
      poopPlace.appendChild( poopIcon );
    }.bind( this ), 1 );

    var poopButton = document.createElement( 'button' );
    poopButton.onclick = function() {
      this.pet.cleanPoop();
    }.bind( this )
    cleanPoop.appendChild( poopButton );

    var feedButton = document.createElement( 'button' );
    feedButton.onclick = function() {
     this.pet.eat();
    }.bind( this )
    giveFood.appendChild( feedButton );

    var cureButton = document.createElement( 'button' );
    cureButton.onclick = function() {
      this.pet.cure();
    }.bind( this );
    medicinePlace.appendChild( cureButton );
  }
}

module.exports = MainView;