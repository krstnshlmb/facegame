const gameIdDiv = document.getElementById('gameId');
const leaderboard = document.getElementById('leaderboard');
const leaderboardWrapper = document.getElementById('leaderboardWrapper');
const entry = document.getElementById('container');
const preGameCounterDiv = document.getElementById('preGameCounter');

leaderboardWrapper.hidden = true;

document.addEventListener('lobby_started', e => {

    gameIdDiv.innerHTML = currentGameId;

    leaderboardWrapper.hidden = false;

    startListeningForLeaderboard();
})

let gameIsStarted = false;
let gameIsEnded = false;

let players = [];

let playersListener;

function startListeningForLeaderboard(){
    
    leaderboard.hidden = false;
    entry.hidden = true;

    const leaderboardPlayer = document.getElementById('leaderboardPlayer');

    playersListener = db.ref(`/games/${currentGameId}/players`)
    
    playersListener.on('value', function(snapshot) {

        if(!gameIsEnded){
            updateLeaderboard(snapshot);
        }
    })

}

function updateLeaderboard(snapshot){
    
    leaderboard.innerHTML = "";

    const val = snapshot.val();

    let players = [];

    for(const k in val) {

        const player = val[k];

        players.push({
            name: player.name,
            score: player.score,
            playerId: k,
            isReady: player.isReady
        })
    }


    players.sort((a,b)=> { return b.score - a.score });

    let allReady = true;

    for(const player of players) {
        if(!player.isReady) allReady = false;
        let rowNode = document.createElement("tr");

        if(player.playerId == currentPlayerId) {
            rowNode.className = "me";
        } else {
            rowNode.className = "player";    
        }

        if(gameIsStarted) {
            rowNode.innerHTML = 
            `
            <td class="playerName">${player.name}</td>
            <td class="playerScore">${player.score}</td>
            `;

        } else {

            rowNode.innerHTML = 
            `
            <td class="playerName">${player.name}</td>
            <td class="playerScore ${player.isReady ? 'ready': 'notReady'}">${player.isReady}</td>
            `;
        } 

        leaderboard.appendChild(rowNode);

    }

    if(allReady && !gameIsStarted && players.length > 0) {
        console.log('game has started');
        preGameStart();
    }
}

function preGameStart(){


    gameIsStarted = true;
    counterDiv.innerHTML = "";

    let pregameCounterTime = 3;

    const counterInterval = setInterval(_ => {
        if(pregameCounterTime == 0) {
            preGameCounterDiv.innerHTML = 'START!'
        } else {
            preGameCounterDiv.innerHTML = pregameCounterTime;
        }
        pregameCounterTime--;

    }, 1000);

    setTimeout(function( ) { 

        clearInterval(counterInterval);
        preGameCounterDiv.innerHTML = ""
    
        start_btn.hidden = true;

        const gameStarted = new Event("game_started");
        document.dispatchEvent(gameStarted);
        
        setIsReady(currentGameId, currentPlayerId, false);

    }, 5 * 1000);

}

document.addEventListener('game_ended',e => {
    play_again_btn.hidden = false;
    exit_btn.hidden = false;
    
    gameIsStarted = false;
    gameIsEnded = true;

    playersListener.off();
})