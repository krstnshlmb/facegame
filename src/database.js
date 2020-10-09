
const db = firebase.database();

function createNewGame(username){
    return new Promise(function(resolve, reject){
        const gameID = (+new Date).toString(36);
        const playerID = 'host';

        db.ref('games/' + gameID).set({
            isReady: false,
            players: {
                [playerID]: {
                    name: username,
                    score: 0
                }
            }
        }).then(function(error){
            
            if(error){
                reject('Could not create new game');
    
            } else {
                console.log(gameID);
    
                resolve({id: gameID, creator: playerID})
            }
            
        });

        

        

    });

}

function joinGame(username, gameID) {
    return new Promise(function(resolve, reject){

        // Verifying existence of the game
        // db.ref('games/').orderByKey().equalTo(gameID).on("child_added", function(snapshot){
            
        //     const gameChecker = snapshot.key[gameID];

        //     if(!gameChecker){
        //         alert('Does not exist');
        //         reject('Game does not exist');
        //     }

        // });

        // Verify nickname uniqueness
        // db.ref('games/' + gameID).orderByChild().equalTo(username).once('value', function(snapshot){
        //     if(snapshot.exists()){
        //         alert('Username is taken by someone else in the game!');
        //         return;
        //     }
        // });

        const playerID = Date.now();

        db.ref('games/' + gameID + '/players/' + playerID).set({
            name: username,
            score: 0
        }).then(function(error){
            if(error){
                reject('Could not join the game');
            } else {
                console.log(playerID + '(' + username + ')' + ' has connected succesfully');
                resolve(playerID);
            }
        });

    });
}

function leaveGame(playerID){
    return new Promise(function(resolve, reject){


    });
}

function deleteGame(gameID){

}

function setIsReady(gameID){
    return new Promise(function(resolve, reject){

        db.ref('games/' + gameID + '/isReady').set(true).then(function(error){
            if(error){
                reject('Could not start the game');
            } else {
                resolve();
            }
        })
        
    });
}

function updateScore(gameID, playerID, score){
    return new Promise(function(resolve, reject){

        db.ref('games/' + gameID + '/players/' + playerID + '/score').set(score).then(function(error){
            if(error){
                reject('Could not update score');
            } else {
                resolve(playerID, score);
            }
        });

    });

}