var LogInView = require( './views/LogInView' );
var SignUpView = require( './views/SignUpView' );
var SignOutView = require( './views/SignOutView' );

window.onload = function() {
  main();
}

var main = function() {
  displayLogIn();
  displaySignUp();
  displaySignOut();
}

var displayLogIn = function() {
  var view = new LogInView();
  view.display();
}

var displaySignUp = function() {
  var view = new SignUpView();
  view.display();
}

var displaySignOut = function() {
  var view = new SignOutView();
  view.display();
}