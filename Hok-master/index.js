let db = firebase.firestore();
firebase.onload=function () {
    var firebaseRef = firebase.database().ref("user");
    firebaseRef.once('value').then(function(datasnapshot){
        console.log(datasnapshot.val());
    })
    
}