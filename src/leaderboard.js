const gameIdDiv = document.getElementById('gameId');
const leaderboard = document.getElementById('leaderboard');
const entry = document.getElementById('container');
const preGameCounterDiv = document.getElementById('preGameCounter');

leaderboard.hidden = true;

document.addEventListener('lobby_started', e => {

    gameIdDiv.innerHTML = currentGameId;
    startListeningForLeaderboard();
})

let gameIsStarted = false;

function startListeningForLeaderboard(){
    
    leaderboard.hidden = false;
    entry.hidden = true;

    const leaderboardPlayer = document.getElementById('leaderboardPlayer');

    db.ref(`/games/${currentGameId}/players`).on('value', function(snapshot) {
        
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


        players.sort((a,b)=> { return a.score > b.score });

        let allReady = true;

        for(const player of players) {
            if(!player.isReady) allReady = false;
            let rowNode = document.createElement("tr");
    
            if(player.playerId == currentPlayerId) {
                rowNode.className = "me";
            } else {
                rowNode.className = "player";    
            }

            rowNode.innerHTML = 
            `
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.isReady}</td>
            `;

            leaderboard.appendChild(rowNode);

        }

        if(allReady && !gameIsStarted) {
            preGameStart();
        }
    })

}



function preGameStart(){
    gameIsStarted = true;

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
    
    }, 5 * 1000);

}

document.addEventListener('game_ended',e => {
    play_again_btn.hidden = false;
    exit_btn.hidden = false;
})