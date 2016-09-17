/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var LogInView = __webpack_require__( 1 );
	var SignUpView = __webpack_require__( 3 );
	var SignOutView = __webpack_require__( 4 );
	
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var JamamojiView = __webpack_require__( 2 );
	
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var JamamojiView = function( user ) {
	  this.url = "http://localhost:5000/api/jamamojis";
	  this.user = user;
	}
	
	JamamojiView.prototype = {
	  getJamamoji: function() {
	    var request = new XMLHttpRequest();
	    request.open( 'GET', this.url );
	    request.setRequestHeader( "Content-type", "application/json" );
	    request.withCredentials = true;
	    request.onload = () => {
	      if( request.status === 200 ) {
	        var jamamojis = JSON.parse( request.responseText );
	        console.log( "Jammer", jamamojis );
	        this.pickJamamoji( jamamojis );
	      }
	    }
	    request.send( null );
	  },
	
	  pickJamamoji: function( jamamojis ) {
	    for( var i = 0; i < jamamojis.length; i++ ) {
	      if( jamamojis[i].user_id === this.user.id ) {
	        // this.makeJamamoji( jamamojis[i] );
	        console.log( jamamojis[i] );
	      }
	    }
	  },
	}
	
	module.exports = JamamojiView;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map