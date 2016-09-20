var Jamamoji = require( '../models/jamamoji' );
var MainView = require( './MainView' );

var SignUpView = function() {
  this.url = 'http://localhost:5000/users.json'
}

SignUpView.prototype = {
  display: function() {
    var space = document.getElementById( 'signup-view' );
    var signUpEmailInput = document.createElement( 'input' );
    var signUpPasswordInput = document.createElement( 'input' );
    var confirmPassword = document.createElement( 'input' );
    var petName = document.createElement( 'input' );
    var pickIcon = document.createElement( 'select' );
    var button = document.createElement( 'button' );

    signUpEmailInput.type = 'text';
    signUpEmailInput.placeholder = 'Email...';
    signUpEmailInput.id = 'signUpEmail';

    signUpPasswordInput.type = 'password';
    signUpPasswordInput.placeholder = 'Password..';
    signUpPasswordInput.id = 'signUpPassword';

    confirmPassword.type = 'password';
    confirmPassword.placeholder = 'Confirm Password..';
    confirmPassword.id = 'confirmPassword';

    petName.type = 'text';
    petName.placeholder = "Name your Jamamoji..."
    petName.id = 'name';

    button.innerText = "Ok";

    var icons = [ "Pick a face...", "😀", "😬", "😂", "😃", "😇", "😉", "😊", "🙃", "😋", "😍", "😜", "🤓", "😎", "😏", "🤔", "😡", "😩", "🤐" ];

    for( var i = 0; i < icons.length; i++ ) {
      var icon = document.createElement( 'option' );
      icon.innerText = icons[i];
      pickIcon.appendChild( icon );
    }

    pickIcon.id = 'icon';
    space.appendChild( pickIcon );

    button.onclick = function() {
      var email = document.getElementById( 'signUpEmail' );
      var password = document.getElementById( 'signUpPassword' );
      var confirmPassword = document.getElementById( 'confirmPassword' );
      var nameInput = document.getElementById( 'name' );
      var iconInput = document.getElementById( 'icon')

      var request = new XMLHttpRequest()
      request.open( 'POST', this.url )
      request.setRequestHeader( "Content-type", "application/json" )
      request.withCredentials = true
      request.onload = () => {
        if( request.status === 201 ) {
          var user = JSON.parse( request.responseText )
          console.log( user );
          var pet = new Jamamoji( nameInput.value, icon.value );
          this.savePet(pet, user);
          var view = new MainView( pet );
          view.display();
        }
      }
      var data = {
        user: {
          email: signUpEmail.value,
          password: signUpPasswordInput.value,
          password_confirmation: confirmPassword.value
        }
      }
      console.log( data );
      request.send( JSON.stringify( data ));

    }.bind( this );



    var backButton = document.createElement( 'button' );
    backButton.innerText = "Back..."
    backButton.onclick = function() {
      var space = document.getElementById( 'signup-view' );
      space.style.display = 'none';
      var signIn = document.getElementById( 'login-view' );
      signIn.style.display = 'block';
    }

    space.appendChild( petName );
    space.appendChild( signUpEmailInput );
    space.appendChild( signUpPasswordInput );
    space.appendChild( confirmPassword );
    space.appendChild( button );
    space.appendChild( backButton );

    space.style.display = 'none';
  },

  savePet: function( pet, user ) {
    var url = "http://localhost:5000/api/jamamojis.json"
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
        original_icon: pet.icon,
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
        happy_count: pet.happyCount,
        user_id: user.id
      }
    }
    request.send( JSON.stringify( data ));
  },
}

module.exports = SignUpView;