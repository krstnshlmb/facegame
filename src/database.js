
const db = firebase.database();

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
            return;
        } else {
            console.log(gameID);

            return gameID;
        }
    });


}

function joinGame(username, gameID) {

    // 1. Verify if game exists
    // 2. Verify if nickname is taken

    var gameChecker = db.ref('games/' + gameID);

    gameChecker.transaction(function(currentData){
        if(currentData === null){
            console.log('OH SHIT!');
        }
    });

    if(gameChecker){
        console.log(gameChecker);
    } else {
        console.log('Oh, no!');
    }


    const playerID = Date.now();

    db.ref('games/' + gameID + '/players/' + playerID).set({
        name: username,
        score: 0
    },
    
    function(error){
        if(error){
            alert('Something went wrong...');
            return;
        } else {
            console.log(playerID + '(' + username + ')' + ' has connected succesfully');
            return playerID;
        }
    });

}

function deleteGame(){

}
