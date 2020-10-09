const join_btn = document.getElementById('joinButton');
const new_btn = document.getElementById('hostButton');
const start_btn = document.getElementById('startButton');

const join_name_field = document.getElementById('nicknameJoinField');
const host_name_field = document.getElementById('nicknameHostField');
const game_field = document.getElementById('gameIdField');

let currentGameId;
let currentPlayerId;
let data;

let hostId;

const lobby_started = new Event("lobby_started", {"bubbles":true, "cancelable":false});
const game_started = new Event("game_started", {"bubbles":true, "cancelable":false});


join_btn.addEventListener('click', function(){
    joinGame(join_name_field.value, game_field.value).then(function(result){
        currentPlayerId = result;

        document.dispatchEvent(lobby_started);
    });

    currentGameId = game_field.value;

    startIsReadyListener(currentGameId);
});
    

new_btn.addEventListener('click', function(){
    createNewGame(host_name_field.value).then(function(result){
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

