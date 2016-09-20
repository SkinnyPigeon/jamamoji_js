var Jamamoji = require( '../models/jamamoji' );
var MainView = require( './MainView' );

var SignUpView = function() {
  this.url = 'http://localhost:5000/users.json'
}

SignUpView.prototype = {
  display: function() {
    var space = document.getElementById( 'signup-view' );
    var emailInput = document.createElement( 'input' );
    var passwordInput = document.createElement( 'input' );
    var confirmPassword = document.createElement( 'input' );
    var petName = document.createElement( 'input' );
    var pickIcon = document.createElement( 'select' );
    var button = document.createElement( 'button' );

    var icons = [ "Pick a face...", "😀", "😬", "😂", "😃", "😇", "😉", "😊", "🙃", "😋", "😍", "😜", "🤓", "😎", "😏", "🤔", "😡", "😩", "🤐" ];

    for( var i = 0; i < icons.length; i++ ) {
      var icon = document.createElement( 'option' );
      icon.innerText = icons[i];
      pickIcon.appendChild( icon );
    }

    pickIcon.id = 'icon';
    space.appendChild( pickIcon );

    button.onclick = function() {
      var emailInput = document.getElementById( 'email' );
      var passwordInput = document.getElementById( 'password' );
      var confirmPassword = document.getElementById( 'confirmPassword' );
      var nameInput = document.getElementById( 'name' );
      var iconInput = document.getElementById( 'icon')

      console.log( confirmPassword.value );
      console.log( password.value );
      console.log( email.value );

      var request = new XMLHttpRequest()
      request.open( 'POST', this.url )
      request.setRequestHeader( "Content-type", "application/json" )
      request.withCredentials = true
      request.onload = () => {
        if( request.status === 201 ) {
          var user = JSON.parse( request.responseText )
          console.log( user );
        }
      }
      var data = {
        user: {
          email: email.value,
          password: passwordInput.value,
          password_confirmation: confirmPassword.value
        }
      }
      console.log( data );
      // request.send( JSON.stringify( data ));
      // var pet = new Jamamoji( nameInput.value, icon.value );
      // this.savePet( pet );
      var view = new MainView( pet );
      view.display();
    }.bind( this );

    emailInput.type = 'text';
    emailInput.placeholder = 'Email...';
    emailInput.id = 'email';

    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password..';
    passwordInput.id = 'password';

    confirmPassword.type = 'password';
    confirmPassword.placeholder = 'Confirm Password..';
    confirmPassword.id = 'confirmPassword';

    petName.type = 'text';
    petName.placeholder = "Name your Jamamoji..."
    petName.id = 'name';

    button.innerText = "Ok";

    var backButton = document.createElement( 'button' );
    backButton.innerText = "Back..."
    backButton.onclick = function() {
      var space = document.getElementById( 'signup-view' );
      space.style.display = 'none';
      var signIn = document.getElementById( 'login-view' );
      signIn.style.display = 'block';
    }

    space.appendChild( petName );
    space.appendChild( emailInput );
    space.appendChild( passwordInput );
    space.appendChild( confirmPassword );
    space.appendChild( button );
    space.appendChild( backButton );

    space.style.display = 'none';
  },

  savePet: function( pet ) {
    var url = "http://"
    var request = new XMLHttpRequest()
    request.open( 'POST', url )
    request.setRequestHeader( "Content-type", "application/json" )
    request.withCredentials = true
    request.onload = () => {
      if( request.status === 201 ) {
        var jamamoji = JSON.parse( request.responseText )
      }
    }
    var data = {
      jamamoji : {
        name: pet.name,
        icon: pet.icon,
        food: pet.food.length,
        energy: pet.energy,
        waste: pet.waste.length,
        alive: pet.alive,
        ill: pet.ill,
        happy: pet.happy,
        hungry: pet.hungry,
        damage: pet.damage,
        health: pet.health,
        special: pet.special,
        opponent_bounus: pet.opponent_bonus,
        block: pet.block,
        opponent_special: pet.opponent_special,
        level: pet.level,
        happy_count: pet.happyCount
      }
    }
    request.send( JSON.stringify( data ));
  },
}

module.exports = SignUpView;