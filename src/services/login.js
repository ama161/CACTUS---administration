import firebase from 'firebase';

export function login(email, password){
    return new Promise((resolve, reject) => {  
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) =>{
                var userId = result.user.uid;
                firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
                    if(snapshot.val().role === 'admin')
                        resolve(true);
                    else resolve(false);
                });
            })
            .catch((error) => {
                resolve(false);
            });
        })
      
}