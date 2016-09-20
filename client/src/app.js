var LogInView = require( './views/LogInView' );
var SignUpView = require( './views/SignUpView' );
// var SignOutView = require( './views/SignOutView' );

window.onload = function() {
  main();
}

var main = function() {
  displayLogIn();
  displaySignUp();
  // displayLogout();
}

var displayLogIn = function() {
  var view = new LogInView();
  view.display();
}

var displaySignUp = function() {
  var view = new SignUpView();
  view.display();
}

// var displayLogout = function() {
//   var view = new SignOutView();
//   view.display();
// }

