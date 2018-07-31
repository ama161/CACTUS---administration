import firebase from 'firebase';

export function getAll(){
    return new Promise((resolve, reject) => {
        firebase.database().ref('/reserve/').once('value')
        .then((snapshot) =>{
            console.log(snapshot.val())
            resolve(snapshot.val())
        })
    })
}

export function getAllPending(){
    return new Promise((resolve, reject) => {
        firebase.database().ref('/status-reserve/pending').once('value')
        .then((snapshot) =>{
            console.log(snapshot.val())
            resolve(snapshot.val())
        })
    })
}

export function getAllCanceled(){
    return new Promise((resolve, reject) => {
        firebase.database().ref('/status-reserve/canceled/').once('value')
        .then((snapshot) =>{
            console.log(snapshot.val())
            resolve(snapshot.val())
        })
    })
}

export function getAllAccepted(){
    return new Promise((resolve, reject) => {
        firebase.database().ref('/status-reserve/accepted/').once('value')
        .then((snapshot) =>{
            console.log(snapshot.val())
            resolve(snapshot.val())
        })
    })
}

export function getAllReserves(type){
    if(type === 'pending') return getAllPending()
    if(type === 'canceled') return getAllCanceled()
    if(type === 'accepted') return getAllAccepted()
}

export function getById(id){
    return new Promise((resolve, reject) => {    
        firebase.database().ref('/reserve/' + id).once('value')
            .then((snapshot) => {
                resolve(snapshot.val());
            })
            .catch((error) => {
                console.log(error);
            });
        })
}

export function canceledReserve(idReserve){
    return new Promise((resolve, reject) => {    
        getById(idReserve)
        .then(reserve => {
            if(reserve){
                let status = reserve.status;
                var updates = {};
                updates['/reserve/' + idReserve + '/status/'] = 'canceled';
                updates['/users-reserve/' + reserve.userId + '/' + idReserve + '/status/'] = 'canceled'; 
                updates['/status-reserve/canceled/' + idReserve] = reserve;    
                updates['/status-reserve/canceled/' + idReserve + '/status/'] = 'canceled';                    

                firebase.database().ref('/status-reserve/'+ status +'/' + idReserve).remove();
                
                resolve(firebase.database().ref().update(updates));
            }
        }) 
    })
}

export function acceptedReserve(idReserve){
    return new Promise((resolve, reject) => {    
        getById(idReserve)
        .then(reserve => {
            if(reserve){
                let status = reserve.status;
                var updates = {};
                updates['/reserve/' + idReserve + '/status/'] = 'accepted';
                updates['/users-reserve/' + reserve.userId + '/' + idReserve + '/status/'] = 'accepted'; 
                updates['/status-reserve/accepted/' + idReserve] = reserve;   
                updates['/status-reserve/accepted/' + idReserve + '/status/'] = 'accepted';                                     

                firebase.database().ref('/status-reserve/'+ status +'/' + idReserve).remove();
    
                resolve(firebase.database().ref().update(updates));
            }
        }) 
    })
}