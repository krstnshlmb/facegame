const join_btn = document.getElementById('join_game');
const new_btn = document.getElementById('new_game');
const start_btn = document.getElementById('start_game');

const name_field = document.getElementById('nickname_field');
const game_field = document.getElementById('game_id');

let currentGameId;
let currentPlayerId;
let data;

let hostId;

const lobby_started = new Event("lobby_started", {"bubbles":true, "cancelable":false});
const game_started = new Event("game_started", {"bubbles":true, "cancelable":false});


join_btn.addEventListener('click', function(){
    joinGame(name_field.value, game_field.value).then(function(result){
        currentPlayerId = result;

        document.dispatchEvent(lobby_started);
    });

    currentGameId = game_field.value;

    startIsReadyListener(currentGameId);
});
    

new_btn.addEventListener('click', function(){
    createNewGame(name_field.value).then(function(result){
        currentGameId = result['id'];
        currentPlayerId = result['creator'];
        
        startIsReadyListener(currentGameId);
        
        document.dispatchEvent(lobby_started);

    });


});
    

start_btn.addEventListener('click', function(){

    setIsReady(currentGameId).then(function(result){
        console.log(result);
    })

});

function startIsReadyListener(gameId){
    
    db.ref(`/games/${gameId}/isReady`).on('value', function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val()){
            document.dispatchEvent(game_started);
        }

    })

}

