var BattleJamamoji = function( jamamoji ) {
  this.jamamoji = jamamoji;
}

BattleJamamoji.prototype = {

}

module.exports = BattleJamamoji;

  def initialize(name, icon, position)
    @name = name
    @icon = icon
    @health = 5
    @energy = 3
    @position = position
    @opponent_bonus = 0
    @block = 0
    @opponent_special = 3
  end


  def check_left(guy1, arena)
      check = guy1.position
      check = check - 1
      arena[check].eql?("_")
  end

  def check_right(guy1, arena)
    check = guy1.position
    check = check + 1
    arena[check].eql?("_")
  end


  def move(spaces)
    @position += spaces
  end

  def move_energy(bars)
    @energy -= (bars)
  end


  def move_right(guy, arena)
    arena = arena.state
    if guy.check_right(guy, arena) == false
      return
    elsif @energy <=0
      return
    else
      arena.delete_at(guy.position)
      guy.move(1)
      guy.move_energy(1)
      arena.insert(guy.position, guy.icon)
    end
  end

  def dash_right(guy, arena, game)
    arena = arena.state
    if (guy.check_right(guy, arena) && guy.special_check_right(guy, arena) == true)
      return
    elsif @energy <= 0
      return
    else
      arena.delete_at(guy.position)
      guy.move(2)
      guy.move_energy(1)
      arena.insert(guy.position, guy.icon)
      guy.end_turn(game)
    end
  end

  def move_left(guy1, arena)
    arena = arena.state
    if guy1.check_left(guy1, arena) == false
      return
    elsif @energy <=0
      return
    else
      arena.delete_at(guy1.position)
      guy1.move(-1)
      guy1.move_energy(1)
      arena.insert(guy1.position, guy1.icon)
    end
  end

  def dash_left(guy, arena, game)
    arena = arena.state
    if (guy.check_left(guy, arena) && guy.special_check_left(guy, arena) == true)
      return
    elsif @energy <= 0
      return
    else
      arena.delete_at(guy.position)
      guy.move(-2)
      guy.move_energy(1)
      arena.insert(guy.position, guy.icon)
      guy.end_turn(game)
    end
  end


  def block(guy1)
    if @energy <=0
      return
    else
      @block = 2
      guy1.move_energy(1)
    end
  end 


  def punch_setup(units)
    @block -= units
    if @block < 0
      @health += @block
    end
    @block = 0
  end  

  def punch(guy1, guy2, arena)
    if guy1.check_left(guy1, arena) && guy1.check_right(guy1, arena) == true
    return 
    elsif @energy <= 0
      return
    else
      guy2.punch_setup(1)
      guy1.move_energy(1)
    end
  end  


  def chance_of_bonus_kick_damage
    chance = rand(20)
    if chance > 19
      return @opponent_bonus = 3
    elsif chance > 7
      return @opponent_bonus = 2
    else
      return @opponent_bonus = 1
    end
  end

  def kick_setup
    @block -= @opponent_bonus
    if @block < 0
      @health += @block
    end
    @block = 0
  end

  def kick(guy1, guy2, arena)
    if guy1.check_left(guy1, arena) && guy1.check_right(guy1, arena) == true
    return 
    elsif @energy <=1
      return
    else
      guy2.chance_of_bonus_kick_damage
      guy2.kick_setup
      guy1.move_energy(2)
      @opponent_bonus = 0
    end
  end

  def special_check_left(guy1, arena)
      check = guy1.position
      check = check - 2
      arena[check].eql?(0)
  end

  def special_check_right(guy1, arena)
    check = guy1.position
    check = check + 2
    arena[check].eql?(0)
  end


  def special_setup
    @block -= @opponent_special
    if @block < 0
      @health += @block
    end
    @opponent_special = 0
    @block = 0
  end

  def special(guy1, guy2, arena)
    if (guy1.special_check_left(guy1, arena) && guy1.special_check_right(guy1, arena) && 
       guy1.check_left(guy1, arena) && guy1.check_right(guy1, arena) == true) 
    return 
    elsif guy2.opponent_special == 0
      return
    elsif @energy <=2
      return
    else
      guy2.special_setup
      guy1.move_energy(3)
    end
  end


  def end_turn(game)
    game.turn_ended 
  end

  def add_energy_2
    @energy += 2
  end  

  def add_energy_1
    @energy += 1
  end

end
