
document.addEventListener('lobby_started', e => {
    startListeningForLeaderboard();
})

function startListeningForLeaderboard(){
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';
    const leaderboardPlayer = document.getElementById('leaderboardPlayer');

    db.ref(`/games/${currentGameId}/players`).on('value', function(snapshot) {
        
        const val = snapshot.val();

        for(const k in val) {

            let rowNode = document.createElement("tr");
            const player = val[k];
            
            rowNode.innerHTML = 
            `
            <td>${player.name}</td>
            <td>${player.score}</td>
            `;

            leaderboard.appendChild(rowNode);
        }

    })

}