
document.addEventListener('lobby_started', e => {
    startListeningForLeaderboard();
})

function startListeningForLeaderboard(){
    const leaderboard = document.getElementById('leaderboard');
    
    const leaderboardPlayer = document.getElementById('leaderboardPlayer');

    db.ref(`/games/${currentGameId}/players`).on('value', function(snapshot) {
        
        leaderboard.innerHTML = "";

        const val = snapshot.val();

        let players = [];

        for(const k in val) {
            
            const player = val[k];

            players.push({
                name: player.name,
                score: player.score
            })
        }

        players = players.sort((a,b)=> { return a.score > b.score });

        for(const player of players) {

            let rowNode = document.createElement("tr");
            
            rowNode.innerHTML = 
            `
            <td>${player.name}</td>
            <td>${player.score}</td>
            `;

            leaderboard.appendChild(rowNode);

        }
    })

}