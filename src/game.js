const game_box = document.getElementById("targetbox");
const game_vid = document.getElementById('video');

game_box.style.visibility = 'hidden';

const game_window_width = window.innerWidth;
const game_window_height = window.innerHeight;

const game_top_edge = 0;
const game_left_edge = 300;

const game_box_width = 200;//have to be dynamic with CSS
const game_box_height = 200;//have to be dynamic with CSS

game_box_left = 0;
game_box_top = 0;

function gameSpawn(){
  game_box_left = 0.3*game_window_width + 0.4* Math.random() * game_window_width - game_box_width;
  game_box_top = 0.5*Math.random() * game_window_height;
  game_box.style.left = game_box_left + 'px';
  game_box.style.top = game_box_top + 'px';
  return {left: game_box_left, top: game_box_top};
}

let n = 3;//milliseconds times n to get the box
let score = 0;
let old_left = 0;
let old_top = 0;
let start_time = -1;


function checkOverlap(){
  function overlaps(b_l, b_t, x, y){
    return (x>=b_l && x<=b_l+game_box_width && y>=b_t && y<=b_t+game_box_height);
  }

  if (overlaps(game_box_left, game_box_top, cursor["x"], cursor["y"]-22)){
    n--;
    game_box.style.borderColor = "orange";
  }
  else game_box.style.borderColor = "blue";
  
  if (n==0){
    score+= 100;
    updateScore(currentGameId, currentPlayerId, score);
    n=3; //milliseconds times n to get the box
    old_left = game_box_left;
    old_top = game_box_top;
    new_coords = gameSpawn();
    game_box.style.borderColor = "blue";
    //respawn if too close
    while (Math.abs(new_coords["left"]-old_left) < game_box_width && Math.abs(new_coords["top"]-old_top) < game_box_height){
      console.log("generated box too close. Respawning...");
      new_coords = gameSpawn();
    }
  }
}

const timeout = 15000;

const counterDiv = document.getElementById('counter');

function startGame(){
  //launches check overlap every n milliseconds
  //works but very CPU heavy.
  gameSpawn();
  game_box.style.visibility = 'visible';
  
  const i = setInterval(checkOverlap ,200);

  let startTime = timeout / 1000;
  
  const counterInterval = setInterval(_ => {
    counterDiv.innerHTML = --startTime;

  }, 1000);

  setTimeout(function( ) { 
    
    clearInterval( i ); 
    clearInterval(counterInterval);

    console.log(`Final score: ${score}`);
    game_box.style.visibility = 'hidden';

    const e = new Event('game_ended');
    document.dispatchEvent(e);
    score = 0;

  }, timeout);
}


document.addEventListener('game_started', e=> {
  startGame();
})
