
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

function verifyGame(gameID){
    return new Promise(function(resolve, reject){
        
        db.ref('games/').orderByKey().equalTo(gameID).once("value").then(function(snapshot){
            
            console.log(snapshot.val());

            if(snapshot.val()){
                resolve(true);
            } else {
                resolve(false);
            }

        });

    });
}


function joinGame(username, gameID) {
    return new Promise(function(resolve, reject){

        // Verifying existence of the game
        verifyGame(gameID).then(function(exists){

            if(exists){
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
            } else {
                alert('The game you are trying to join does not exist!');
                reject('Game does not exist');
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