const gameIdDiv = document.getElementById('gameId');
const leaderboard = document.getElementById('leaderboard');
const entry = document.getElementById('container');

leaderboard.hidden = true;

document.addEventListener('lobby_started', e => {

    gameIdDiv.innerHTML = currentGameId;
    startListeningForLeaderboard();
})

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
            })
        }


        players.sort((a,b)=> { return a.score > b.score });
        
        console.log(players);

        for(const player of players) {

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
            `;

            leaderboard.appendChild(rowNode);

        }
    })

}

document.addEventListener('game_ended',e => {
    console.log('ended');
})