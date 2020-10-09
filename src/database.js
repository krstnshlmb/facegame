
const db = firebase.database();

function createNewGame(username){
    return new Promise(function(resolve, reject){
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

async function joinGame(username, gameID) {

    // Verifying existence of the game
    db.ref('games/').orderByKey().equalTo(gameID).on("child_added", function(snapshot){
        
        const gameChecker = snapshot.key[gameID];

        if(!gameChecker){
            alert('Does not exist');
            return;
        }

    });

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

function leaveGame(playerID){

}

function deleteGame(gameID){

}

