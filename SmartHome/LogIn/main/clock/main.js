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
var btn = document.querySelector(".comfirm__btn")

btn.addEventListener('click', function() {
     let hours = document.querySelectorAll(".content-item__setup-time__hour")
     let minutes = document.querySelectorAll(".content-item__setup-tim__minute")
     let seconds = document.querySelectorAll(".content-item__setup-time-second")
     alert("Cài đặt thời gian thành công")
     if ((hours[0].value != "") && (minutes[0].value != "") && (seconds[0].value != "")) {
          if (Number(hours[0].value) >= 0 && Number(hours[0].value) < 24) {
               if (Number(minutes[0].value) >= 0 && Number(minutes[0].value) < 60) {
                    if (Number(seconds[0].value) >= 0 && Number(seconds[0].value) < 60) {
                         const scheduledTime_Livingroom = new Date();
                         scheduledTime_Livingroom.setHours(Number(hours[0].value));
                         scheduledTime_Livingroom.setMinutes(Number(minutes[0].value));
                         scheduledTime_Livingroom.setSeconds(Number(seconds[0].value));
                    
                         let currentTime_Livingroom = new Date();
                         let timeUntilScheduled_Livingroom = scheduledTime_Livingroom.getTime() - currentTime_Livingroom.getTime();
                         console.log("Đã lấy được thời gian")
                         // Đặt hàm thực hiện tác vụ vào thời điểm được đặt trước
                         setTimeout(function() {
                              firebase.database().ref("/livingroom/devices").update({
                                   "tv": 0,
                                   "quatmay": 0,
                                   "den": 0
                              })
                              firebase.database().ref("/livingroom/devices/maylanh").update({
                                   "status": 0
                              })
                              console.log("Tác vụ được thực hiện vào thời gian đã định trước.");
                         }, timeUntilScheduled_Livingroom);
                    }
               }
          }
        
     }
     if (hours[1].value != "" && minutes[1].value != "" && seconds[1].value != "") {
          if (Number(hours[1].value) >= 0 && Number(hours[1].value) < 24) {
               if (Number(minutes[1].value) >= 0 && Number(minutes[1].value)) {
                    if (Number(seconds[1].value) >= 0 && Number(seconds[1].value) < 60) {
                         const scheduledTime_Bedroom = new Date();
                         scheduledTime_Bedroom.setHours(Number(hours[1].value));
                         scheduledTime_Bedroom.setMinutes(Number(minutes[1].value));
                         scheduledTime_Bedroom.setSeconds(Number(seconds[1].value));
                    
                         let currentTime_Bedroom = new Date();
                         let timeUntilScheduled_Bedroom = scheduledTime_Bedroom.getTime() - currentTime_Bedroom.getTime();
                         console.log("Đã lấy được thời gian")
                         // Đặt hàm thực hiện tác vụ vào thời điểm được đặt trước
                         setTimeout(function() {
                              firebase.database().ref("/bedroom/devices").update({
                                   "tv": 0,
                                   "quatmay": 0,
                                   "den": 0
                              })
                              firebase.database().ref("/bedroom/devices/maylanh").update({
                                   "status": 0
                              })
                              console.log("Tác vụ được thực hiện vào thời gian đã định trước.");
                         }, timeUntilScheduled_Bedroom);
                    }
               }
          }
     }

     if (hours[2].value != "" && minutes[2].value != "" && seconds[2].value != "") {

          if (Number(hours[2].value) >= 0 && Number(hours[2].value) < 24) {
               if (Number(minutes[2].value) >= 0 && Number(minutes[2].value < 60)) {
                    if (Number(seconds[2].value) >= 0 && Number(seconds[2].value < 60)) {
                         const scheduledTime_Kitchenroom = new Date();
                         scheduledTime_Kitchenroom.setHours(Number(hours[2].value));
                         scheduledTime_Kitchenroom.setMinutes(Number(minutes[2].value));
                         scheduledTime_Kitchenroom.setSeconds(Number(seconds[2].value));
                    
                         let currentTime_Kitchenroom = new Date();
                         let timeUntilScheduled_Kitchenroom = scheduledTime_Kitchenroom.getTime() - currentTime_Kitchenroom.getTime();
                         console.log("Đã lấy được thời gian")
                         // Đặt hàm thực hiện tác vụ vào thời điểm được đặt trước
                         setTimeout(function() {
                              firebase.database().ref("/kitchenroom/devices").update({
                                   "bepdien": 0,
                                   "quatmay": 0,
                                   "den": 0
                              })
                              firebase.database().ref("/kitchenroom/devices/maylanh").update({
                                   "status": 0
                              })
                              console.log("Tác vụ được thực hiện vào thời gian đã định trước.");
                         }, timeUntilScheduled_Kitchenroom);
                    }
               }
          }
     }
})




