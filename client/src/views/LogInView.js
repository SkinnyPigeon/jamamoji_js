var JamamojiView = require( './JamamojiView' );

var LogInView = function() {
  this.url = 'http://localhost:5000/users/sign_in.json'
}

LogInView.prototype = {
  display: function() {
    var space = document.getElementById( 'login-view' );
    var email = document.createElement( 'input' );
    var password = document.createElement( 'input' );
    var button = document.createElement( 'button' );

    button.onclick = function() {
      var emailInput = document.getElementById( 'email' );
      var passwordInput = document.getElementById( 'password' );
      console.log( emailInput.value );
      console.log( passwordInput.value );

      var request = new XMLHttpRequest();
      request.open( 'POST', this.url );
      request.setRequestHeader( "Content-type", "application/json" );
      request.withCredentials = true
      request.onload = () => {
        if( request.status === 201 ) {
          var user = JSON.parse( request.responseText );
          console.log( user );
          this.showJamamoji( user );
        }
      }
      var data = {
        user: {
          email: emailInput.value,
          password: passwordInput.value,
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

    space.appendChild( email );
    space.appendChild( password );
    space.appendChild( button );
  },

  showJamamoji: function( user ) {
    var jamamojiView = new JamamojiView( user );
    jamamojiView.getJamamoji();
  },


}

module.exports = LogInView;