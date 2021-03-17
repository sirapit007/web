let firebaseConfig = {
    apiKey: "AIzaSyCCSsn8WlFqwcuxRJUjO6P9DN1aY9_9RJ8",
    authDomain: "localhost",
    projectId: "classic-666",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let all = 0;
let cmale = 0, cfemale = 0, cother = 0;
let pmale = 0.00, pfemale = 0.00, pother = 0.00; 

$('button').click(() => {

    if (validate()) {
        db.collection("Hokkk").add({
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            gender: $('#gender').val(),
            email: $('#email').val(),
            massage: $('#massage').val(),         
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            $('#firstname').val('')
            $('#lastname').val('')
            $('#gender').val(-1);
            $('#email').val('');
            $('#massage').val('')
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
});

db.collection("Hokkk").onSnapshot(doc=>{
    let table = $('tbody')[0]
    $("tbody tr").remove();
    
    doc.forEach(item=>{
        let row= table.insertRow(-1)
        let firstcell =row.insertCell(0)
        let secondcell =row.insertCell(1)
        let thirdcell =row.insertCell(2)
        let fourthcell = row.insertCell(3)
        let fifthcell = row.insertCell(4)
        firstcell.textContent=item.data().firstname
        secondcell.textContent=item.data().lastname
        thirdcell.textContent=item.data().gender
        fourthcell.textContent=item.data().email
        fifthcell.textContent=item.data().massage
        if (item.data().gender === 'male') {
            all++;
            cmale++;
        } else if (item.data().gender === 'female') {
            all++;
            cfemale++;
        } else {
            all++;
            cother++;
        }
    })

    pmale = (100/all)*cmale;
    pfemale = (100/all)*cfemale;
    pother = (100/all)*cother;
    $('b1').text(pmale + " %")
    $('b2').text(pfemale + " %")
    $('b3').text(pother + " %")
})

function validate() {
    let fname = document.myForm.firstname.value;
    let lname = document.myForm.lastname.value;
    let gen = document.myForm.gender.value;
    let email = document.myForm.email.value;
    let msg = document.myForm.massage.value;

    if (fname === '') {
        alert('Please input your FirstName !');
        document.myForm.firstname.focus();
        return false;
    }

    if (lname === '') {
        alert('Please input your LastName !');
        document.myForm.lastname.focus();
        return false;
    }

    if (gen === 'none') {
        alert('Please input your Country !');   
        document.myForm.gender.focus();
        return false;
    }

    if (email === '' || !validateEmail(email)) {
        alert('Please input your Email !');
        document.myForm.email.focus();
        return false;
    }

    if (msg === '') {
        alert('Please input your Massage !');
        document.myForm.massage.focus();
        return false;
    }

    return true;
}

let validateEmail = (email) => {
    atpos = email.indexOf('@');
    dotpos = email.lastIndexOf('.');

    if (atpos < 1 || (dotpos-atpos) < 2) {
        document.myForm.email.focus();
        return false;
    }
    return true;
}