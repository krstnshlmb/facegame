document.addEventListener("DOMContentLoaded", function(event) {
    
    
    var database = firebase.database();


    function createNewGame(username){
        
        const gameID = (+new Date).toString(16);
        
        firebase.database().ref('games/' + gameID).set({
            isReady: false,
            players : {
                name: username,
                score: 0
            }
        });
    }


    var button = document.getElementById('new_game');

    button.onclick = function(){
        console.log(firebase.database().ref().toString());
    }

});
