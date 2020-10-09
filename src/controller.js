const join_btn = document.getElementById('join_game');
const new_btn = document.getElementById('new_game');

const name_field = document.getElementById('nickname_field');
const game_field = document.getElementById('game_id');

let currentGameId;
let currentPlayerId;
let data;


join_btn.addEventListener('click', function(){
    currentPlayerId = joinGame(name_field.value, game_field.value);
    currentGameId = game_field.value;
})
    

new_btn.addEventListener('click', function(){
    createNewGame(name_field.value).then(function(result){
        currentGameId = result['id'];
        currentPlayerId = result['creator'];
    });
})
    
    



