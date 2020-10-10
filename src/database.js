
const db = firebase.database();

function createNewGame(username){
    return new Promise(function(resolve, reject){
        const gameID = (+new Date).toString(36).substring(2).toUpperCase();
        const playerID = Date.now();

        db.ref('games/' + gameID).set({
            players: {
                [playerID]: {
                    name: username,
                    score: 0,
                    isReady: false
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
            score: 0,
            isReady: false
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

function leaveGame(gameID, playerID){
    return new Promise(function(resolve, reject){

        db.ref('games/' + gameID + '/players/' + playerID).remove().then(function(error){
            if(error){
                reject('Could not leave game');
            } else {
                console.log('The game was left succesfully');
                resolve({id: gameID, player: playerID});
            }
        })

    });
}



function setIsReady(gameID, playerID, val){
    return new Promise(function(resolve, reject){

        db.ref(`games/${gameID}/players/${playerID}/isReady`).set(val).then(function(error){
            if(error){
                reject('Could not set is ready for player');
            } else {
                resolve(true);
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