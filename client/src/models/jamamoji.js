var _ = require( 'lodash' )
var Poop = require( './poop' )
var Food = require( './food' );

var Jamamoji = function( name, icon, originalIcon ) {
  this.id = null;
  this.originalIcon = originalIcon;
  if( this.originalIcon === undefined && this.icon !== "😷" && this.icon !== "😒" ) {
    this.originalIcon = icon;
  }
  console.log( this.originalIcon );
  this.name = name;
  this.icon = icon;
  this.food = [];
  this.energy = 3;
  this.waste = [];
  this.alive = true;
  this.ill = false;
  this.happy = false;
  this.hungry = true;
  this.damage = 0;
  this.health = 100;
  this.special = 3;
  this.opponentBonus = 0;
  this.block = 0;
  this.opponentSpecial = 3;
  this.level = 1;
  this.happyCount = 0;
  this.foodCount = 0;
  this.pause = false;
}

Jamamoji.prototype = {

  countHappiness: function() {
    setInterval( function() {
      if( this.pause ) {
        return;
      }
      if( this.icon === this.originalIcon ) {
        this.happyCount += 1;
        this.checkForLevels();
      }
    }.bind( this ), 1200 )
  },

  checkForLevels: function() {
    if( this.happyCount % 10 === 0 ) {
      this.level += 1;
    }
    if( this.level % 5 === 0 ) {
      this.health *= 1.1;
      this.energy *= 1.1;
    }
  },

  checkForFoodAndWasteLevels: function() {
    if( this.foodCount % 5 === 0 ) {
      var total = this.food.length;
      this.digest( total );
    }
  },

  hunger: function() {
    setInterval( function() {
      if( this.checkDead() ) {
        return;
      }
      if( this.pause ) {
        return;
      }
      this.foodCount += 1;
      this.checkForFoodAndWasteLevels();
    }.bind( this ), 1200)
  },



  eatAtStartUp: function() {
    var burger = new Food();
    this.food.push( burger );
  },

  poopAtStart: function() {
    var poop = new Poop();
    this.waste.push( poop );
  },

  eat: function() {
    if( this.pause ) {
      return;
    }
    if( this.checkDead() ) {
      return;
    }
    if( this.food.length >= 8 ) {
      this.icon = "☠️";
      this.alive = false;
      var pet = this.getPet();
      pet.className = 'dead';
    }
    var burger = new Food();
    this.food.push( burger );
  },

  showFood: function() {
    var food = []
    for( var i = 0; i < this.food.length; i++ ) {
      food.push( this.food[i].icon );
    }
    return food.join("");
  },
  


  digest: function( total ) {
    if( this.pause ) {
      return;
    }
    if( this.checkDead() ) {
      return;
    }
    if( total > 0 ) {
      this.food.pop()
      this.poop()
    }
    if( total === 0 ) {
      this.emptyPoop();
    }
  },

  poop: function() {
    if( this.pause ) {
      return;
    }
    if( this.checkDead() ) {
      return;
    }
    setTimeout( function() {
      var plop = new Poop();
      this.waste.push( plop );
    }.bind( this ) , 6000)
    return;
  },

  emptyPoop: function() {
    if( this.pause ) {
      return;
    }
    if( this.checkDead() ) {
      return;
    }
    setTimeout( function() {
      var plop = new Poop();
      this.waste.push( plop );
    }.bind( this ) , 6000)
    return;
  },

  showPoop: function() {
    var poops = []
    for( var i = 0; i < this.waste.length; i++ ) {
      poops.push(this.waste[i].icon);
    }
    return poops.join("");
  },

  cleanPoop: function() {
    if( this.pause ) {
      return;
    }
    if( this.checkDead() ) {
      return;
    }
    this.waste = [];
  },

  dead: function() {
    setInterval( function() {
      if( this.pause ) {
        return;
      }
      if( this.health <= 0 || 
          this.waste.length >= 5 ) {
        this.alive = false;
        this.icon = "☠️"
        var pet = this.getPet();
        pet.className = 'dead';
      }
    }.bind( this ), 1 );
  },

  sick: function() {
    setInterval( function() {
      if( this.pause ) {
        return;
      }
      if( this.checkDead() ) {
        return;
      }
      if( this.waste.length >= 3 ) {
        this.ill = true;
        this.icon = "😷";
        var pet = this.getPet();
        pet.className = 'ill';
      }
    }.bind( this ), 1 );
  },

  setMood: function() {
    setInterval( function() {
      if( this.pause ) {
        return;
      }
      if( this.icon === "😷" || this.icon === "☠️" ) {
        return;
      }
      if( this.food.length >= 1 && 
          this.food.length <= 4 ) {
        this.happy = true
        this.icon = this.originalIcon;
        var pet = this.getPet();
        pet.className = 'aliveAndWell'
      } else {
        var pet = this.getPet();
        pet.className = 'bored'
        this.icon = "😒"
      }
    }.bind( this ), 1 );
  },

  setHunger: function() {
    if( this.food.length === 0) {
      this.hungry = true
    }
  },

  cure: function() {
    if( this.checkDead() ) {
      return;
    }
    this.sick = false;
    this.icon = "😒";
    var pet = this.getPet();
    pet.className = 'bored';
  },

  checkDead: function() {
    if( this.icon === "☠️" ) {
      return true;
    }
  },

  getPet: function() {
    var pet = document.getElementById( 'pet' );
    return pet;
  },

  pauseActions: function() {
    this.pause = true;
  },

  resume: function() {
    this.pause = false;
  }
}

module.exports = Jamamoji;