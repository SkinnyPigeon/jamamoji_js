var Jamamoji = require( '../models/jamamoji' );
var MainView = require( './MainView' );

var SignUpView = function() {
  this.url = 'http://localhost:5000/users/sign_up.json'
}

SignUpView.prototype = {
  display: function() {
    var space = document.getElementById( 'signup-view' );
    var email = document.createElement( 'input' );
    var password = document.createElement( 'input' );
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
      var confirmPasswordInput = document.getElementById( 'confirmPassword' );
      var nameInput = document.getElementById( 'name' );
      var iconInput = document.getElementById( 'icon')

      var request = new XMLHttpRequest()
      request.open( 'POST', this.url )
      request.setRequestHeader( "Content-type", "application/json" )
      request.withCredentials = true
      request.onload = () => {
        if( request.status === 201 ) {
          var user = JSON.parse( request.responseText )
        }
      }
      var data = {
        user: {
          email: emailInput.value,
          password: passwordInput.value,
          password_confirmation: confirmPasswordInput.value
        }
      }
      request.send( JSON.stringify( data ));
      var pet = new Jamamoji( nameInput.value, icon.value );
      var view = new MainView( pet );
      view.display();
    }.bind( this );

    email.type = 'text';
    email.placeholder = 'Email...';
    email.id = 'email';

    password.type = 'password';
    password.placeholder = 'Password..';
    password.id = 'password';

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
    space.appendChild( email );
    space.appendChild( password );
    space.appendChild( confirmPassword );
    space.appendChild( button );
    space.appendChild( backButton );

    space.style.display = 'none';
  },

  createPet: function() {

  },
}

module.exports = SignUpView;