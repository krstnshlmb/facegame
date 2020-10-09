const game_box = document.getElementById("targetbox");

const game_right_edge = 800;
const game_bottom_edge = 400;
const game_top_edge = 100;
const game_left_edge = 200;


let game_box_left = 200 + Math.random()*600;
let game_box_top = 100 + Math.random()*200;
game_box.style.left = game_box_left + 'px';
game_box.style.top = game_box_top + 'px';

function update_pos(v_x, v_y){
  
  game_box_left += v_x;
  game_box_top += v_y;

  game_box.style.left = game_box_left + 'px';
  game_box.style.top = game_box_top + 'px';	
}

setInterval (update_pos, 20, game_v_x, game_v_y);