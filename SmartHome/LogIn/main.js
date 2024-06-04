// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyC-nBAzPSUzHKzogQzcSjiV4Ae2cPfmla4",
     authDomain: "smarthome-tt-iot.firebaseapp.com",
     databaseURL: "https://smarthome-tt-iot-default-rtdb.firebaseio.com",
     projectId: "smarthome-tt-iot",
     storageBucket: "smarthome-tt-iot.appspot.com",
     messagingSenderId: "870822229821",
     appId: "1:870822229821:web:7f4c5c2e92997bea6f7754",
     measurementId: "G-V2MWXH2JV7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var nameUser
var password
firebase.database().ref("/account").get().then((snapshot) => {
     if(snapshot.exists()){
          var data = snapshot.val()
          var name = Object.keys(data)
          nameUser = name
          password = data[name]
     }
     else
          console.log("No data available!")
})



var btn = document.querySelector(".login-btn")
var errorBtn = document.querySelector(".error-pass--container")
btn.addEventListener('click', function() {
     var nameInput = document.querySelector(".userNameInput").value
     var passInput = document.querySelector(".passInput").value
     console.log(nameInput)
     var check = 0
     if (nameUser == nameInput) {
          if (password == passInput) {
               document.querySelector(".SmartHome").click();
               check = 1
               console.log("Success")
          }
     }
     if (check === 0) {
          errorBtn.classList += " active"
     }
})
errorBtn.addEventListener('click', function() {
     errorBtn.classList.remove("active")
})



