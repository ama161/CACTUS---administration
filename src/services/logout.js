import firebase from 'firebase';

export function logout() {
    return new Promise((resolve, reject) => {    
        firebase.auth().signOut()
            .then(() => {
                resolve("Bye");
            })
            .catch(error => console.log(error));
        })
}