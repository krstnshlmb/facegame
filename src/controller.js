const join_btn = document.getElementById('join_game');
const new_btn = document.getElementById('new_game');
const start_btn = document.getElementById('start_game');

const name_field = document.getElementById('nickname_field');
const game_field = document.getElementById('game_id');

let currentGameId;
let currentPlayerId;
let data;

const lobby_started = new Event("lobby_started", {"bubbles":true, "cancelable":false});
const game_started = new Event("game_started", {"bubbles":true, "cancelable":false});


join_btn.addEventListener('click', function(){
    joinGame(name_field.value, game_field.value).then(function(result){
        currentPlayerId = result;
    });

    currentGameId = game_field.value;
});
    

new_btn.addEventListener('click', function(){
    createNewGame(name_field.value).then(function(result){
        currentGameId = result['id'];
        currentPlayerId = result['creator'];
    
        
        document.dispatchEvent(lobby_started);

    });


});
    

start_btn.addEventListener('click', function(){

    startGame(currentGameId).then(function(result){
        console.log(result);
    })



});


if(currentGameId){
    var readiness = db.ref('/games' + currentGameId + '/isReady');

    readiness.on('value', function(snapshot){
        console.log(snapshot);
        document.dispatchEvent(game_started);
    });

}

