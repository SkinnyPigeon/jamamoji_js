var SignUpView = function() {
  this.url = 'http://localhost:5000/users/sign_up.json'
}

SignUpView.prototype = {
  display: function() {
    var space = document.getElementById( 'login-view' );
    var email = document.createElement( 'input' );
    var password = document.createElement( 'input' );
    var confirmPassword = document.createElement( 'input' );
    var button = document.createElement( 'button' );

    button.onclick = function() {
      var emailInput = document.getElementById( 'email' );
      var passwordInput = document.getElementById( 'password' );
      var confirmPasswordInput = document.getElementById( 'confirmPassword' );
      console.log( emailInput.value );
      console.log( passwordInput.value );

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
      request.send( JSON.stringify( data ))
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

    space.appendChild( email );
    space.appendChild( password );
    space.appendChild( confirmPassword );
    space.appendChild( button );


  },
}

module.exports = SignUpView;