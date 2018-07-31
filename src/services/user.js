import firebase from 'firebase';

export function onAuthStateChanged(){
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);

            } else {
                resolve(false);
            }
          });
    })
}

export function isAdmin(){
    return new Promise((resolve, reject) => {
        onAuthStateChanged().then(result => {
            var userId = result.uid;
            if(userId){
                firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
                    if(snapshot.val().role === 'admin')
                        resolve(true);
                    else resolve(false);
                });
            }
        })
    })
}

export function allUsers(){
    
}