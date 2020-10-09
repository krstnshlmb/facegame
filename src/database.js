document.addEventListener("DOMContentLoaded", function(event) {
    
    
    var db = firebase.database();


    function createNewGame(username){
        
        const gameID = (+new Date).toString(36);
        const playerID = Date.now();

        db.ref('games/' + gameID).set({
            isReady: false,
            players: {
                [playerID]: {
                    name: username,
                    score: 0
                }
            }
        },
        
        function(error){
            if(error){
                alert('Something went wrong...');
            } else {
                console.log(gameID);

                return gameID;
            }
        });


    }

    function joinGame(username, gameID) {

        const playerID = Date.now();

        db.ref('games/' + gameID + '/players/' + playerID).set({
            name: username,
            score: 0
        },
        
        function(error){
            if(error){
                alert('Something went wrong...');
            } else {
                console.log(playerID + '(' + username + ')' + ' has connected succesfully');
                return playerID;
            }
        });

    }


    var new_game_btn = document.getElementById('new_game');

    var join_game_btn = document.getElementById('join_game');

    new_game_btn.onclick = function(){
        createNewGame('Adil');
    }

    join_game_btn.onclick = function(){
        joinGame('Robert', 0);
    } 

});
