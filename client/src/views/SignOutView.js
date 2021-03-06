var SignOutView = function( pet ) {
  this.pet = pet;
  this.url = "http://localhost:5000/users/sign_out.json";
}

SignOutView.prototype = {

  display: function() {
    var space = document.getElementById( 'logout-view' );
    var button = document.createElement( 'button' );
    button.innerText = 'Sign Out...';
    button.id = "signOut";
    space.appendChild( button );

    button.onclick = function() {
      this.updatePet();
      displayLogIn();
      var request = new XMLHttpRequest();
      request.open( 'DELETE', this.url );
      request.setRequestHeader( "Content-type", "application/json" );
      request.withCredentials = true;
      request.onload = () => {
        if( request.status === 204 ) {
          location.reload();
        }
      }
      request.send( null );
    }.bind( this )
  },

  updatePet: function() {
    var url = "http://localhost:5000/api/jamamojis/" + this.pet.id + ".json";
    console.log( this.pet.id );
    var request = new XMLHttpRequest();
    request.open( 'PUT', url );
    request.setRequestHeader( "Content-type", "application/json" );
    request.withCredentials = true;
    request.onload = () => {
    }
    var data = {
      jamamoji : {
        name: this.pet.name,
        icon: this.pet.icon,
        food: this.pet.food.length,
        energy: this.pet.energy,
        waste: this.pet.waste.length,
        alive: this.pet.alive,
        ill: this.pet.ill,
        happy: this.pet.happy,
        hungry: this.pet.hungry,
        damage: this.pet.damage,
        health: this.pet.health,
        special: this.pet.special,
        opponent_bounus: this.pet.opponent_bonus,
        block: this.pet.block,
        opponent_special: this.pet.opponent_special,
        level: this.pet.level,
        happy_count: this.pet.happyCount
      }
    }
    request.send( JSON.stringify( data ));
  },


}

var displayLogIn = function() {
  var view = document.getElementById( 'login-view' );
  view.style.display = 'block';
  var space = document.getElementById( 'logout-view' );
  space.style.display = 'none';
}

module.exports = SignOutView;