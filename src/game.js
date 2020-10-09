const game_box = document.getElementById("targetbox");

const game_right_edge = 800;
const game_bottom_edge = 400;
const game_top_edge = 100;
const game_left_edge = 200;


function game_spawn(){
  let game_box_left = 200 + Math.random()*600;
  let game_box_top = 100 + Math.random()*200;
  game_box.style.left = game_box_left + 'px';
  game_box.style.top = game_box_top + 'px';
}

game_spawn();