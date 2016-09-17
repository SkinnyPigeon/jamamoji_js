var LogInView = require( './views/LogInView' );
var SignUpView = require( './views/SignUpView' );

window.onload = function() {
  main();
}

var main = function() {
  displayLogIn();
  displaySignUp();
}

var displayLogIn = function() {
  var view = new LogInView();
  view.display();
}

var displaySignUp = function() {
  var view = new SignUpView();
  view.display();
}

