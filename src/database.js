
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

    const gameChecker = db.ref('games/' + gameID);

    // Verifying existence of the game
    db.ref('games/').orderByKey().equalTo(gameID).once("value", function(snapshot){
        if(!snapshot.exists()){
            alert('The game you are trying to join does not exist!');
            return;
        }
    });

    // Verify nickname uniqueness
    db.ref('games/' + gameID).orderByChild().equalTo(username).once('value', function(snapshot){
        if(snapshot.exists()){
            alert('Username is taken by someone else in the game!');
            return;
        }
    });

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

