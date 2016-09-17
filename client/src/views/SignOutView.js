var SignOutView = function() {
  this.url = "http://localhost:5000/users/sign_out.json"
}

SignOutView.prototype = {

  display: function() {
    var space = document.getElementById( 'login-view' );
    var button = document.createElement( 'button' );
    button.innerText = 'Sign Out...'

    button.onclick = function() {
      var request = new XMLHttpRequest();
      request.open( 'DELETE', this.url );
      request.setRequestHeader( "Content-type", "application/json" );
      request.withCredentials = true
      request.onload = () => {
        if( request.status === 204 ) {
          console.log( "Signing out" );
        }
      }
      request.send( null )
    }.bind( this ),
    space.appendChild( button );
  }



}

module.exports = SignOutView;