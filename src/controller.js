const join_btn = document.getElementById('joinButton');
const new_btn = document.getElementById('hostButton');
const start_btn = document.getElementById('startButton');
const exit_btn = document.getElementById('exitButton');
const play_again_btn = document.getElementById('playAgainButton');

const join_name_field = document.getElementById('nicknameJoinField');
const host_name_field = document.getElementById('nicknameHostField');
const game_field = document.getElementById('gameIdField');

let currentGameId;
let currentPlayerId;
let data;

let hostId;

exit_btn.hidden = true;
play_again_btn.hidden = true;
start_btn.hidden = true;

join_btn.disabled = true;
new_btn.disabled = true;

const lobby_started = new Event("lobby_started", {"bubbles":true, "cancelable":false});
const game_started = new Event("game_started", {"bubbles":true, "cancelable":false});
const player_left = new Event("player_left", {"bubbles":true, "cancelable":false});

join_btn.addEventListener('click', function(){
    joinGame(join_name_field.value, game_field.value.toUpperCase()).then(function(result){
        currentPlayerId = result;

        document.dispatchEvent(lobby_started);

        start_btn.hidden = false;

        join_name_field.value = "";
        game_field.value = "";
        host_name_field.value = "";

    });

    currentGameId = game_field.value;

    // startIsReadyListener(currentGameId);
});
    

new_btn.addEventListener('click', function(){
    createNewGame(host_name_field.value).then(function(result){
        currentGameId = result['id'];
        currentPlayerId = result['creator'];
        
        // startIsReadyListener(currentGameId);
        
        document.dispatchEvent(lobby_started);

        start_btn.hidden = false;

        join_name_field.value = "";
        game_field.value = "";
        host_name_field.value = "";

    });


});
    

start_btn.addEventListener('click', function(){

    setIsReady(currentGameId, currentPlayerId, true).then(function(result){
        console.log(result);
    })
    
});


exit_btn.addEventListener('click', function(){
    
    gameIsEnded = false;
    gameIsStarted = false;

    leaveGame(currentGameId, currentPlayerId).then(function(result){
        leaderboard.hidden = true;
        entry.hidden = false;

        exit_btn.hidden = true;
        play_again_btn.hidden = true;

        currentPlayerId = null;
        currentGameId = null;

        leaderboardWrapper.hidden = true;

        counterDiv.innerHTML = "";

    });
    document.dispatchEvent(player_left);
    
});

function startIsReadyListener(gameId){
// function startIsReadyListener(gameId){
    
//     db.ref(`/games/${gameId}/isReady`).on('value', function(snapshot){
//         console.log(snapshot.val());
//         if(snapshot.val()){
//             document.dispatchEvent(game_started);
//         }

//     })

}

host_name_field.addEventListener("keyup", function(){
    if(host_name_field.value.trim() == ""){
        new_btn.disabled = true;
    } else {
        new_btn.disabled = false;
    }
});

join_name_field.addEventListener("keyup", function(){
    if(join_name_field.value.trim() == "" || game_field.value.trim() == ""){
        join_btn.disabled = true;
    } else {
        join_btn.disabled = false;
    }
});

game_field.addEventListener("keyup", function(){
    if(join_name_field.value.trim() == "" || game_field.value.trim() == ""){
        join_btn.disabled = true;
    } else {
        join_btn.disabled = false;
    }
});

play_again_btn.addEventListener('click', function(){
    
    
    updateScore(currentGameId, currentPlayerId, 0);

    gameIsEnded = false;
    gameIsStarted = false;

    start_btn.hidden = false;
    play_again_btn.hidden = true;
    exit_btn.hidden = true;

    startListeningForLeaderboard();
    
})



window.onunload = function(){
    
    leaveGame(currentGameId, currentPlayerId).then(function(result){
        leaderboard.hidden = true;
        entry.hidden = false;

        exit_btn.hidden = true;
        play_again_btn.hidden = true;

        currentPlayerId = null;
        currentGameId = null;

        leaderboardWrapper.hidden = true;

        counterDiv.innerHTML = "";

    });
    document.dispatchEvent(player_left);

}
