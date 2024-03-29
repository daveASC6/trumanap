$(document).ready(function(){
    $('.modal').modal();
});
var firebaseConfig = {
    apiKey: "AIzaSyC2FBeP7eL5VYTkOgQjnA5sfIpDUcNq968",
    authDomain: "truman-56fb2.firebaseapp.com",
    databaseURL: "https://truman-56fb2.firebaseio.com",
    projectId: "truman-56fb2",
    storageBucket: "",
    messagingSenderId: "497245308289",
    appId: "1:497245308289:web:cbe7b06794993fb7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Gain Access to firebase
  const auth = firebase.auth();
  const db = firebase.firestore();

//get elements
const txtEmail = document.getElementById('email_input')
const firstName = document.getElementById('firstName_input')
const lastName = document.getElementById('lastName_input')
const txtPassword = document.getElementById('password_input')
const signupForm = document.querySelector("#signUp-form")


//create account
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = txtEmail.value;
    const pass = txtPassword.value;

    //sign uo the user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            displayName: (firstName.value + " " + lastName.value)
        })
    }).then(() => {
        const modal = document.querySelector("#modal1");
        M.Modal.getInstance(modal).open();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = " ";
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
      })
    
})

//confirm passwords script
// const confirm_password = document.getElementById('confirmPassword');
// 	function validatePassword() {
// 		if (txtPassword.value != confirm_password.value) {
// 			confirm_password.setCustomValidity('Passwords Don\'t Match');
// 		} else {
// 			confirm_password.setCustomValidity('');
// 		}
// 	}
// 	txtPassword.onchange = validatePassword;
//     confirm_password.onkeyup = validatePassword;
    