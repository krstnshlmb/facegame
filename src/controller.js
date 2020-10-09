const join_btn = document.getElementById('join_game');
const new_btn = document.getElementById('new_game');

const name_field = document.getElementById('nickname_field');
const game_field = document.getElementById('game_id');

let currentGameId;

join_btn.onclick = function(){
    joinGame(name_field.value, game_field.value);
    currentGameId = game_field.value;
}

new_btn.onclick = function(){
    currentGameid = createNewGame(name_field.value);
}

