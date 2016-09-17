var BattleJamamoji = function( jamamoji ) {
  this.name = jamamoji.name;
  this.icon = jamamoji.icon;
  this.health = jamamoji.health;
  this.energy = jamamoji.energy;
  this.position = jamamoji.position;
  this.opponentBonus = jamamoji.opponent_bonus;
  this.block = jamamoji.block;
  this.originalBlock = jamamoji.block;
  this.opponentSpecial = jamamoji.opponent_special;
}

BattleJamamoji.prototype = {

  checkLeft: function( guy1, arena ) {
    var check = guy1.position;
    check -= 1;
    if( arena[ check ] !== "_" ) {
      return false;
    }
  },

  checkRight: function( guy1, arena ) {
    var check = guy1.position;
    check += 1;
    if( arena[ check ] !== "_" ) {
      return false;
    }
  },

  move: function( spaces ) {
    this.position += spaces;
  },

  moveEnergy: function( bars ) {
    this.energy -= bars;
  },

  moveRight: function( guy, arena ) {
    if( guy.checkRight( guy, arena ) === false ) {
      return;
    } else if( this.energy <= 0 ) {
      return;
    } else {
      arena.splice( guy.position, 1 );
      guy.move( 1 );
      guy.moveEnergy( 1 );
      arena.splice( guy.position, 0, guy.icon );
    }
  },

  dashRight: function( guy, arena, game ) {
    if( guy.checkRight( guy, arena ) && guy.specialCheckRight( guy, arena )) {
      return;
    } else if( this.energy <= 0 ) {
      return
    } else {
      arena.splice( guy.position, 1 );
      guy.move( 2 );
      guy.moveEnergy( 1 );
      arena.splice( guy.position, 0, guy.icon );
      guy.endTurn( game );
    }
  },

  moveLeft: function( guy, arena ) {
    if( guy.checkLeft( guy, arena ) === false ) {
      return;
    } else if( this.energy <= 0 ) {
      return;
    } else {
      arena.splice( guy.position, 1 );
      guy.move( -1 );
      guy.moveEnergy( 1 );
      arena.splice( guy.position, 0, guy.icon );
    }
  },

  dashLeft: function( guy, arena, game ) {
    if( guy.checkLeft( guy, arena ) && guy.specialCheckLeft( guy, arena )) {
      return;
    } else if( this.energy <= 0 ) {
      return
    } else {
      arena.splice( guy.position, 1 );
      guy.move( -2 );
      guy.moveEnergy( 1 );
      arena.splice( guy.position, 0, guy.icon );
      guy.endTurn( game );
    }
  },

  block: function( guy1 ) {
    if( this.energy <= 0 ) {
      return;
    } else {
      this.block += 2;
      guy1.moveEnergy( 1 );
    }
  },

  punchSetup: function( units ) {
    this.block -= units;
    if( this.block < 0 ) {
      this.health += this.block;
    }
    this.block = this.originalBlock;
  },

  punch: function( guy1, guy2, arena ) {
    if( guy1.checkLeft( guy1, arena ) && guy1.checkRight( guy1, arena )) {
      return; 
    } else if( this.energy <= 0 ) {
      return;
    } else {
      guy2.punchSetup( 1 );
      guy1.moveEnergy( 1 );
    }
  },

  chanceOfBonusKickDamage: function() {
    var chance = Math.floor(Math.random() * 21);
    if( chance > 19 ) {
      this.opponentBonus = 3;
      return;
    } else if( chance > 7 ) {
      this.opponentBonus = 2;
      return;
    } else {
      this.opponentBonus = 1;
      return;
    }
  },

  kickSetup: function() {
    this.block -= this.opponentBonus;
    console.log( this.opponentBonus );
    if( this.block < 0 ) {
      this.health += this.block;
    }
    this.block = this.originalBlock;
  },

  kick: function( guy1, guy2, arena ) {
    if( guy1.checkLeft( guy1, arena ) && guy1.checkRight( guy1, arena ) ) {
      return;
    } else if( this.energy <= 1 ) {
      return;
    } else {
      guy2.chanceOfBonusKickDamage();
      guy2.kickSetup();
      guy1.moveEnergy( 2 );
      this.opponentBonus = 0;
    }
  },

  specialCheckLeft: function( guy1, arena ) {
    var check = guy1.position;
    check -= 2;
    if( arena[ check ] !== "_" ) {
      return false;
    }
  },

  specialCheckRight: function( guy1, arena ) {
    var check = guy1.position;
    check += 2;
    if( arena[ check ] !== "_" ) {
      return false;
    }
  },

  specialSetup: function() {
    this.block -= this.opponentSpecial;
    if( this.block < 0 ) {
      this.health += this.block;
    }
    this.opponentSpecial = 0;
    this.block = this.originalBlock;
  },

  special: function( guy1, guy2, arena ) {
    if( guy1.specialCheckLeft( guy1, arena ) && guy1.specialCheckLeft( guy1, arena ) 
      && guy1.checkLeft( guy1, arena ) && guy1.checkRight( guy1, arena )) {
      return;
    } else if( guy2.opponentSpecial === 0 ) {
      return;
    } else if( this.energy <= 2 ) {
      return;
    } else {
      guy2.specialSetup();
      guy1.moveEnergy( 3 );
    }
  },

  endTurn: function( game ) {
    game.endTurn();
  },

  addEnergy1: function() {
    this.energy += 1;
  },

  addEnergy2: function() {
    this.energy += 2;
  }

}

module.exports = BattleJamamoji;