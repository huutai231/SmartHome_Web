var headerMode = document.querySelector(".header__mode")
var mainItem = document.querySelector(".content")
var menuItems = document.querySelectorAll(".menu-item")
var rooms = document.querySelectorAll(".main-item")
var livingroom = document.querySelector(".main__livingroom")
var bedroom = document.querySelector(".main__bedroom")
var chickenroom = document.querySelector(".main__chickenroom")


var setuptime  = document.querySelector(".header__time_icon--icon")
setuptime.addEventListener('click', function() {
     //document.querySelector(".header__time_icon--address").click()
     window.open("./clock/index.html")
})


headerMode.addEventListener('click', function() {
     if (headerMode.className.includes(" active")) {
          headerMode.className = headerMode.className.replace(" active", "")
          mainItem.className = mainItem.className.replace(" mode_dark", "")
     }
     else {
          headerMode.className += " active"
          mainItem.className += " mode_dark"
     }
})

menuItems.forEach(function(item, index) {
     item.addEventListener('click', function() {
          menuItems.forEach(function(item) {
               item.className = item.className.replace(" active", "")
          })
          item.className += " active"

          rooms.forEach(function(room) {
               room.className = room.className.replace(" active", "")
          })
          if (index == 0) {  // Livingrooom
               livingroom.className += " active"
          } 
          else if (index == 1) {  //  Bedroom
               bedroom.className += " active"
          } else {       //   Chickenroom
               chickenroom.className += " active"
          }
     })
})


var timeCurentText = document.querySelectorAll(".main-item__sensor__table--humi-temp__time")
const t = new Date()
let day = t.getUTCDate();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = months[t.getUTCMonth()];
let year = t.getUTCFullYear();

timeCurentText.forEach(function(item) {
     item.innerHTML = `${month} ${day} ${year}`
})

//===================================================================================
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


var warningContainer = document.querySelector(".warning-container")
warningContainer.addEventListener('click', function() {
     warningContainer.classList.remove("active")
})
// Livingroom
firebase.database().ref("/livingroom/sensor/nhietdo").on("value",function(snapshot){
     var tempLivingroom = snapshot.val();  
     let iconWhether = document.querySelectorAll(".main-item__sensor__whether")[0]
     document.querySelectorAll(".main-item__sensor__temp_value")[0].innerHTML = `${tempLivingroom} &deg;C`
     if (tempLivingroom >= 30) {
          iconWhether.className.replace(" cloud", "")
          iconWhether.className += " sun"
     }
     else {
          iconWhether.className.replace(" sun", "")
          iconWhether.className += " cloud"
     }
});

firebase.database().ref("/livingroom/sensor/doam").on("value",function(snapshot){
     var humiLivingroom = snapshot.val();  
     document.querySelectorAll(".main-item__sensor__humi_value")[0].innerHTML = `${humiLivingroom} %`
});
var countWarningLivingroom = 0
firebase.database().ref("/livingroom/sensor/gas").on("value",function(snapshot){
     var gasLivingroom = snapshot.val();  
     if (gasLivingroom >= 50 && countWarningLivingroom == 0) {
          countWarningLivingroom = 1
          warningContainer.classList += " active"
          document.querySelector(".warning-content").innerHTML = "Khí gas phòng khách vượt quá ngưỡng"
     }
     else if (gasLivingroom < 50) {
          countWarningLivingroom = 0
     }
     document.querySelector(".speedometer_progressbar-livingroom").style.setProperty('--value', gasLivingroom.toString())
});

firebase.database().ref("/livingroom/sensor/anhsang").on("value",function(snapshot){
     var anhsangLivingroom = snapshot.val();  
     document.querySelector(".half_top_progressbar-livingroom").style.setProperty('--value', anhsangLivingroom.toString())
});


// TV
var tv_livingroom = document.querySelector(".main-item__control__TV_control-livingroom")
firebase.database().ref("/livingroom/devices/tv").on("value",function(snapshot){
     var tv_livingroom_status1 = snapshot.val()
     if (tv_livingroom_status1 == 0) 
          tv_livingroom.checked = false
     else
          tv_livingroom.checked = true
});
// firebase.database().ref("/livingroom/devices").get().then((snapshot) => {
//      if(snapshot.exists()){
//           console.log(snapshot.val())
   
//           var tv_livingroom_status = snapshot.val()
//           if (tv_livingroom_status["tv"] == 0)
//                tv_livingroom.checked = false
//           else
//                tv_livingroom.checked = true
//      }
//      else
//           console.log("No data available!")
     
// })

tv_livingroom.addEventListener('click', function() {
     if (tv_livingroom.checked) {
          firebase.database().ref("/livingroom/devices").update({
               "tv": 1
          })
     } else {
          firebase.database().ref("/livingroom/devices").update({
               "tv": 0
          })
     }
})

// Light
var light_livingroom = document.querySelector(".main-item__control__light_control")
firebase.database().ref("/livingroom/devices/den").on("value",function(snapshot){
     var den_livingroom_status1 = snapshot.val()
     if (den_livingroom_status1 == 0) 
          light_livingroom.checked = false
     else
          light_livingroom.checked = true
});
// firebase.database().ref("/livingroom/devices").get().then((snapshot) => {
//      if(snapshot.exists()){
//           console.log(snapshot.val())
   
//           var light_livingroom_status = snapshot.val()
//           if (light_livingroom_status["den"] == 0)
//                light_livingroom.checked = false
//           else
//                light_livingroom.checked = true
//      }
//      else
//           console.log("No data available!")
// })

light_livingroom.addEventListener('click', function() {
     if (light_livingroom.checked) {
          firebase.database().ref("/livingroom/devices").update({
               "den": 1
          })
     } else {
          firebase.database().ref("/livingroom/devices").update({
               "den": 0
          })
     }
})




// Air-condition
var air_status_livingroom
var air_livingroom = document.querySelector(".main-item__control__air_control--livingroom")
// firebase.database().ref("/livingroom/devices/maylanh").get().then((snapshot) => {
//      if(snapshot.exists()){ 
//           var air_livingroom_statusValue = snapshot.val()
//           var air_status_livingroom = air_livingroom_statusValue["status"]
//           if (air_status_livingroom == 0) {
//                air_livingroom.checked = false
//                document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "#808080"
//           }  
//           else {
//                air_livingroom.checked = true
//                document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "black"
//           }
               
//      }
//      else
//           console.log("No data available!")
// })

firebase.database().ref("/livingroom/devices/maylanh/status").on("value",function(snapshot){
     var air_status_livingroom = snapshot.val()
     if (air_status_livingroom == 0) {
          air_livingroom.checked = false
          document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "#808080"
     }  
     else {
          air_livingroom.checked = true
          document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "black"
     }
});

air_livingroom.addEventListener('click', function() {
     if (air_livingroom.checked) {
          firebase.database().ref("/livingroom/devices/maylanh").update({
               "status": 1
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "black"
     } else {
          firebase.database().ref("/livingroom/devices/maylanh").update({
               "status": 0
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue").style.color = "#808080"
     }

     firebase.database().ref("/livingroom/devices/maylanh/status").on("value",function(snapshot){
          air_status_livingroom = snapshot.val();  
     });
})



var air_value_livingroom
firebase.database().ref("/livingroom/devices/maylanh/dieuchinh").on("value",function(snapshot){
     air_value_livingroom = snapshot.val()
     document.querySelector(".main-item__control__air_conditioner_value--livingroom").innerHTML = air_value_livingroom
});

var btn_air_up_livingroom = document.querySelector(".main-item__control__air_conditioner_high--livingroom")
var btn_air_down_livingroom = document.querySelector(".main-item__control__air_conditioner_low--livingroom")
btn_air_up_livingroom.addEventListener('click', function() {
     if (air_status_livingroom == 1) {
          air_value_livingroom += 1 
          firebase.database().ref("/livingroom/devices/maylanh").update({
               "dieuchinh": air_value_livingroom
          })
     }    
})
btn_air_down_livingroom.addEventListener('click', function() {
     if (air_status_livingroom == 1) {
          air_value_livingroom -= 1
          firebase.database().ref("/livingroom/devices/maylanh").update({
               "dieuchinh": air_value_livingroom
          })
     }    
})



//=============================================================
// Loa
var control_buzzer_livingroom = document.querySelector(".main-item__control__buzzer_control__value--livingroom")
// firebase.database().ref("/livingroom/devices/loa").get().then((snapshot) => {
//      if(snapshot.exists()){ 
//           let value = snapshot.val()
//           control_buzzer_livingroom.setAttribute('value', value.toString())
//           document.querySelector(".main-item__control__buzzer_display__value--livingroom").innerHTML = value
//      }
//      else
//           console.log("No data available!")
// })

firebase.database().ref("/livingroom/devices/loa").on("value",function(snapshot){
     let value = snapshot.val()
     control_buzzer_livingroom.setAttribute('value', value.toString())
     document.querySelector(".main-item__control__buzzer_display__value--livingroom").innerHTML = value
     
});

control_buzzer_livingroom.oninput = function() {
     let value = this.value
     document.querySelector(".main-item__control__buzzer_display__value--livingroom").innerHTML = value
     firebase.database().ref("/livingroom/devices").update({
          "loa": value
     })   
}


//   Quat may
var btn0_fan_livingroom = document.querySelector(".main-item__control__fan_btn0--livingroom")
var btn1_fan_livingroom = document.querySelector(".main-item__control__fan_btn1--livingroom")
var btn2_fan_livingroom = document.querySelector(".main-item__control__fan_btn2--livingroom")


// firebase.database().ref("/livingroom/devices").get().then((snapshot) => {
//      var statusFan_livingroom
//      if(snapshot.exists()){ 
//           statusFan_livingroom = snapshot.val()["quatmay"]
//           if (statusFan_livingroom == 1) {
//                btn1_fan_livingroom.style.backgroundColor = "yellow"
//           }
//           else if (statusFan_livingroom == 2) {
//                btn2_fan_livingroom.style.backgroundColor = "yellow"
//           } else {
//                btn0_fan_livingroom.style.backgroundColor = "rgb(159, 6, 6)"
//           }         
//      }
//      else
//           console.log("No data available!")
// })

firebase.database().ref("/livingroom/devices/quatmay").on("value",function(snapshot){
     let statusFan_livingroom = snapshot.val()
     if (statusFan_livingroom == 1) {
          btn1_fan_livingroom.style.backgroundColor = "yellow"
          btn2_fan_livingroom.style.backgroundColor = "#808080"
          btn0_fan_livingroom.style.backgroundColor = "#808080"
     }
     else if (statusFan_livingroom == 2) {
          btn2_fan_livingroom.style.backgroundColor = "yellow"
          btn1_fan_livingroom.style.backgroundColor = "#808080"
          btn0_fan_livingroom.style.backgroundColor = "#808080"
     } else {
          btn0_fan_livingroom.style.backgroundColor = "rgb(159, 6, 6)"
          btn2_fan_livingroom.style.backgroundColor = "#808080"
          btn1_fan_livingroom.style.backgroundColor = "#808080"
     }        
});

btn0_fan_livingroom.addEventListener('click', function() {
     btn1_fan_livingroom.style.backgroundColor = "#808080"
     btn2_fan_livingroom.style.backgroundColor = "#808080"
     btn0_fan_livingroom.style.backgroundColor = "rgb(159, 6, 6)"
     firebase.database().ref("/livingroom/devices").update({
          "quatmay": 0
     })   
})
btn1_fan_livingroom.addEventListener('click', function() {
     btn0_fan_livingroom.style.backgroundColor = "#808080"
     btn2_fan_livingroom.style.backgroundColor = "#808080"
     btn1_fan_livingroom.style.backgroundColor = "yellow"
     firebase.database().ref("/livingroom/devices").update({
          "quatmay": 1
     })   
})
btn2_fan_livingroom.addEventListener('click', function() {
     btn0_fan_livingroom.style.backgroundColor = "#808080"
     btn1_fan_livingroom.style.backgroundColor = "#808080"
     btn2_fan_livingroom.style.backgroundColor = "yellow"
     firebase.database().ref("/livingroom/devices").update({
          "quatmay": 2
     })   
})



// ==================================================
// ==================================================
// Bedroom

firebase.database().ref("/bedroom/sensor/nhietdo").on("value",function(snapshot){
     var tempLivingroom = snapshot.val();  
     let iconWhether = document.querySelectorAll(".main-item__sensor__whether")[1]
     document.querySelectorAll(".main-item__sensor__temp_value")[1].innerHTML = `${tempLivingroom} &deg;C`
     if (tempLivingroom >= 30) {
          iconWhether.className.replace(" cloud", "")
          iconWhether.className += " sun"
     }
     else {
          iconWhether.className.replace(" sun", "")
          iconWhether.className += " cloud"
     }
});

firebase.database().ref("/bedroom/sensor/doam").on("value",function(snapshot){
     var humiLivingroom = snapshot.val();  
     document.querySelectorAll(".main-item__sensor__humi_value")[1].innerHTML = `${humiLivingroom} %`
});
var countWarningBedroom = 0
firebase.database().ref("/bedroom/sensor/gas").on("value",function(snapshot){
     var gasLivingroom = snapshot.val();  
     if (gasLivingroom >= 50 && countWarningBedroom == 0) {
          countWarningBedroom = 1
          warningContainer.classList += " active"
          document.querySelector(".warning-content").innerHTML = "Khí gas phòng ngủ vượt quá ngưỡng"
     }
     else if (gasLivingroom < 50) {
          countWarningBedroom = 0
     }
     document.querySelector(".speedometer_progressbar-bedroom").style.setProperty('--value', gasLivingroom.toString())
});

firebase.database().ref("/bedroom/sensor/anhsang").on("value",function(snapshot){
     var anhsangLivingroom = snapshot.val();  
     document.querySelector(".half_top_progressbar-bedroom").style.setProperty('--value', anhsangLivingroom.toString())
});

// TV
var tv_bedroom = document.querySelector(".main-item__control__TV_control-bedroom")
firebase.database().ref("/bedroom/devices").get().then((snapshot) => {
     if(snapshot.exists()){
          var tv_bedroom_status = snapshot.val()
          if (tv_bedroom_status["tv"] == 0)
               tv_bedroom.checked = false
          else
               tv_bedroom.checked = true
     }
     else
          console.log("No data available!")
})

tv_bedroom.addEventListener('click', function() {
     if (tv_bedroom.checked) {
          firebase.database().ref("/bedroom/devices").update({
               "tv": 1
          })
     } else {
          firebase.database().ref("/bedroom/devices").update({
               "tv": 0
          })
     }
})


// Light
var light_bedroom = document.querySelector(".main-item__control__light_control-bedroom")
firebase.database().ref("/bedroom/devices").get().then((snapshot) => {
     if(snapshot.exists()){
          var light_bedroom_status = snapshot.val()
          if (light_bedroom_status["den"] == 0)
               light_bedroom.checked = false
          else
               light_bedroom.checked = true
     }
     else
          console.log("No data available!")
})

light_bedroom.addEventListener('click', function() {
     if (light_bedroom.checked) {
          firebase.database().ref("/bedroom/devices").update({
               "den": 1
          })
     } else {
          firebase.database().ref("/bedroom/devices").update({
               "den": 0
          })
     }
})


// Air-condition
var air_status_bedroom
var air_bedroom = document.querySelector(".main-item__control__air_control--bedroom")
firebase.database().ref("/bedroom/devices/maylanh").get().then((snapshot) => {
     if(snapshot.exists()){ 
          var air_bedroom_statusValue = snapshot.val()
          var air_status_livingroom = air_bedroom_statusValue["status"]
          if (air_status_livingroom == 0) {
               air_bedroom.checked = false
               document.querySelector(".main-item__control__air_conditioner_controlValue--bedroom").style.color = "#808080"
          }  
          else {
               air_bedroom.checked = true
               document.querySelector(".main-item__control__air_conditioner_controlValue--bedroom").style.color = "black"
          }
               
     }
     else
          console.log("No data available!")
})

air_bedroom.addEventListener('click', function() {
     if (air_bedroom.checked) {
          firebase.database().ref("/bedroom/devices/maylanh").update({
               "status": 1
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue--bedroom").style.color = "black"
     } else {
          firebase.database().ref("/bedroom/devices/maylanh").update({
               "status": 0
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue--bedroom").style.color = "#808080"
     }

     firebase.database().ref("/bedroom/devices/maylanh/status").on("value",function(snapshot){
          air_status_bedroom = snapshot.val();  
     });
})

var air_value_bedroom
firebase.database().ref("/bedroom/devices/maylanh/dieuchinh").on("value",function(snapshot){
     air_value_bedroom = snapshot.val()
     document.querySelector(".main-item__control__air_conditioner_value--bedroom").innerHTML = air_value_bedroom
});

var btn_air_up_bedroom = document.querySelector(".main-item__control__air_conditioner_high--bedroom")
var btn_air_down_bedroom = document.querySelector(".main-item__control__air_conditioner_low--bedroom")
btn_air_up_bedroom.addEventListener('click', function() {
     if (air_status_bedroom == 1) {
          air_value_bedroom += 1 
          firebase.database().ref("/bedroom/devices/maylanh").update({
               "dieuchinh": air_value_bedroom
          })
     }    
})
btn_air_down_bedroom.addEventListener('click', function() {
     if (air_status_bedroom == 1) {
          air_value_bedroom -= 1
          firebase.database().ref("/bedroom/devices/maylanh").update({
               "dieuchinh": air_value_bedroom
          })
     }    
})


// Loa
var control_buzzer_bedroom = document.querySelector(".main-item__control__buzzer_control__value--bedroom")
firebase.database().ref("/bedroom/devices/loa").get().then((snapshot) => {
     if(snapshot.exists()){ 
          let value = snapshot.val()
          control_buzzer_bedroom.setAttribute('value', value.toString())
          document.querySelector(".main-item__control__buzzer_display__value--bedroom").innerHTML = value
     }
     else
          console.log("No data available!")
})


control_buzzer_bedroom.oninput = function() {
     let value = this.value
     document.querySelector(".main-item__control__buzzer_display__value--bedroom").innerHTML = value
     firebase.database().ref("/bedroom/devices").update({
          "loa": value
     })   
}


//   Quat may
var btn0_fan_bedroom = document.querySelector(".main-item__control__fan_btn0--bedroom")
var btn1_fan_bedroom = document.querySelector(".main-item__control__fan_btn1--bedroom")
var btn2_fan_bedroom = document.querySelector(".main-item__control__fan_btn2--bedroom")


firebase.database().ref("/bedroom/devices").get().then((snapshot) => {
     var statusFan_bedroom
     if(snapshot.exists()){ 
          statusFan_bedroom = snapshot.val()["quatmay"]
          if (statusFan_bedroom == 1) {
               btn1_fan_bedroom.style.backgroundColor = "yellow"
          }
          else if (statusFan_bedroom == 2) {
               btn2_fan_bedroom.style.backgroundColor = "yellow"
          } else {
               btn0_fan_bedroom.style.backgroundColor = "rgb(159, 6, 6)"
          }         
     }
     else
          console.log("No data available!")
})

btn0_fan_bedroom.addEventListener('click', function() {
     btn1_fan_bedroom.style.backgroundColor = "#808080"
     btn2_fan_bedroom.style.backgroundColor = "#808080"
     btn0_fan_bedroom.style.backgroundColor = "rgb(159, 6, 6)"
     firebase.database().ref("/bedroom/devices").update({
          "quatmay": 0
     })   
})
btn1_fan_bedroom.addEventListener('click', function() {
     btn0_fan_bedroom.style.backgroundColor = "#808080"
     btn2_fan_bedroom.style.backgroundColor = "#808080"
     btn1_fan_bedroom.style.backgroundColor = "yellow"
     firebase.database().ref("/bedroom/devices").update({
          "quatmay": 1
     })   
})
btn2_fan_bedroom.addEventListener('click', function() {
     btn0_fan_bedroom.style.backgroundColor = "#808080"
     btn1_fan_bedroom.style.backgroundColor = "#808080"
     btn2_fan_bedroom.style.backgroundColor = "yellow"
     firebase.database().ref("/bedroom/devices").update({
          "quatmay": 2
     })   
})


// ==================================================
// ==================================================
// kitchenroom

firebase.database().ref("/kitchenroom/sensor/nhietdo").on("value",function(snapshot){
     var tempLivingroom = snapshot.val();  
     let iconWhether = document.querySelectorAll(".main-item__sensor__whether")[2]
     document.querySelectorAll(".main-item__sensor__temp_value")[2].innerHTML = `${tempLivingroom} &deg;C`
     if (tempLivingroom >= 30) {
          iconWhether.className.replace(" cloud", "")
          iconWhether.className += " sun"
     }
     else {
          iconWhether.className.replace(" sun", "")
          iconWhether.className += " cloud"
     }
});

firebase.database().ref("/kitchenroom/sensor/doam").on("value",function(snapshot){
     var humiLivingroom = snapshot.val();  
     document.querySelectorAll(".main-item__sensor__humi_value")[2].innerHTML = `${humiLivingroom} %`
});
var countWarningKitchenroom = 0
firebase.database().ref("/kitchenroom/sensor/gas").on("value",function(snapshot){
     var gasLivingroom = snapshot.val();  
     if (gasLivingroom >= 50 && countWarningKitchenroom == 0) {
          countWarningKitchenroom = 1
          warningContainer.classList += " active"
      
          document.querySelector(".warning-content").innerHTML = "Khí gas phòng bếp vượt quá ngưỡng"
     }
     else if (gasLivingroom < 50) {
          countWarningKitchenroom = 0
     }
     document.querySelector(".speedometer_progressbar-kitchenroom").style.setProperty('--value', gasLivingroom.toString())
});

firebase.database().ref("/kitchenroom/sensor/anhsang").on("value",function(snapshot){
     var anhsangLivingroom = snapshot.val();  
     document.querySelector(".half_top_progressbar-kitchenroom").style.setProperty('--value', anhsangLivingroom.toString())
});

// Bếp
var control_fireE_kitchenroom = document.querySelector(".main-item__control__fire_control__value--kitchenroom")
firebase.database().ref("/kitchenroom/devices/bepdien").get().then((snapshot) => {
     if(snapshot.exists()){ 
          let value = snapshot.val()
          control_fireE_kitchenroom.setAttribute('value', value.toString())
          document.querySelector(".main-item__control__fireE_display__value--kitchenroom").innerHTML = value
     }
     else
          console.log("No data available!")
})


control_fireE_kitchenroom.oninput = function() {
     let value = this.value
     document.querySelector(".main-item__control__fireE_display__value--kitchenroom").innerHTML = value
     firebase.database().ref("/kitchenroom/devices").update({
          "bepdien": value
     })   
}


// Light
var light_kitchenroom = document.querySelector(".main-item__control__light_control-kitchenroom")
firebase.database().ref("/kitchenroom/devices").get().then((snapshot) => {
     if(snapshot.exists()){
          var light_kitchenroom_status = snapshot.val()
          if (light_kitchenroom_status["den"] == 0)
               light_kitchenroom.checked = false
          else
               light_kitchenroom.checked = true
     }
     else
          console.log("No data available!")
})

light_kitchenroom.addEventListener('click', function() {
     if (light_kitchenroom.checked) {
          firebase.database().ref("/kitchenroom/devices").update({
               "den": 1
          })
     } else {
          firebase.database().ref("/kitchenroom/devices").update({
               "den": 0
          })
     }
})


// Air-condition
var air_status_kitchenroom
var air_kitchenroom = document.querySelector(".main-item__control__air_control--kitchenroom")
firebase.database().ref("/kitchenroom/devices/maylanh").get().then((snapshot) => {
     if(snapshot.exists()){ 
          var air_kitchenroom_statusValue = snapshot.val()
          var air_status_kitchenroom = air_kitchenroom_statusValue["status"]
          if (air_status_kitchenroom == 0) {
               air_kitchenroom.checked = false
               document.querySelector(".main-item__control__air_conditioner_controlValue--kitchenroom").style.color = "#808080"
          }  
          else {
               air_bedroom.checked = true
               document.querySelector(".main-item__control__air_conditioner_controlValue--kitchenroom").style.color = "black"
          }
               
     }
     else
          console.log("No data available!")
})

air_kitchenroom.addEventListener('click', function() {
     if (air_kitchenroom.checked) {
          firebase.database().ref("/kitchenroom/devices/maylanh").update({
               "status": 1
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue--kitchenroom").style.color = "black"
     } else {
          firebase.database().ref("/kitchenroom/devices/maylanh").update({
               "status": 0
          })
          document.querySelector(".main-item__control__air_conditioner_controlValue--kitchenroom").style.color = "#808080"
     }

     firebase.database().ref("/kitchenroom/devices/maylanh/status").on("value",function(snapshot){
          air_status_kitchenroom = snapshot.val();  
     });
})

var air_value_kitchenroom
firebase.database().ref("/kitchenroom/devices/maylanh/dieuchinh").on("value",function(snapshot){
     air_value_kitchenroom = snapshot.val()
     document.querySelector(".main-item__control__air_conditioner_value--kitchenroom").innerHTML = air_value_kitchenroom
});

var btn_air_up_kitchenroom = document.querySelector(".main-item__control__air_conditioner_high--kitchenroom")
var btn_air_down_kitchenroom = document.querySelector(".main-item__control__air_conditioner_low--kitchenroom")
btn_air_up_kitchenroom.addEventListener('click', function() {
     if (air_status_kitchenroom == 1) {
          air_value_kitchenroom += 1 
          firebase.database().ref("/kitchenroom/devices/maylanh").update({
               "dieuchinh": air_value_kitchenroom
          })
     }    
})
btn_air_down_kitchenroom.addEventListener('click', function() {
     if (air_status_kitchenroom == 1) {
          air_value_kitchenroom -= 1
          firebase.database().ref("/kitchenroom/devices/maylanh").update({
               "dieuchinh": air_value_kitchenroom
          })
     }    
})


// Loa
var control_buzzer_kitchenroom = document.querySelector(".main-item__control__buzzer_control__value--kitchenroom")
firebase.database().ref("/kitchenroom/devices/loa").get().then((snapshot) => {
     if(snapshot.exists()){ 
          let value = snapshot.val()
          control_buzzer_kitchenroom.setAttribute('value', value.toString())
          document.querySelector(".main-item__control__buzzer_display__value--kitchenroom").innerHTML = value
     }
     else
          console.log("No data available!")
})


control_buzzer_kitchenroom.oninput = function() {
     let value = this.value
     document.querySelector(".main-item__control__buzzer_display__value--kitchenroom").innerHTML = value
     firebase.database().ref("/kitchenroom/devices").update({
          "loa": value
     })   
}


//   Quat may
var btn0_fan_kitchenroom = document.querySelector(".main-item__control__fan_btn0--kitchenroom")
var btn1_fan_kitchenroom = document.querySelector(".main-item__control__fan_btn1--kitchenroom")
var btn2_fan_kitchenroom = document.querySelector(".main-item__control__fan_btn2--kitchenroom")


firebase.database().ref("/kitchenroom/devices").get().then((snapshot) => {
     var statusFan_kitchenroom
     if(snapshot.exists()){ 
          statusFan_kitchenroom = snapshot.val()["quatmay"]
          if (statusFan_kitchenroom == 1) {
               btn1_fan_kitchenroom.style.backgroundColor = "yellow"
          }
          else if (statusFan_kitchenroom == 2) {
               btn2_fan_kitchenroom.style.backgroundColor = "yellow"
          } else {
               btn0_fan_kitchenroom.style.backgroundColor = "rgb(159, 6, 6)"
          }         
     }
     else
          console.log("No data available!")
})

btn0_fan_kitchenroom.addEventListener('click', function() {
     btn1_fan_kitchenroom.style.backgroundColor = "#808080"
     btn2_fan_kitchenroom.style.backgroundColor = "#808080"
     btn0_fan_kitchenroom.style.backgroundColor = "rgb(159, 6, 6)"
     firebase.database().ref("/kitchenroom/devices").update({
          "quatmay": 0
     })   
})
btn1_fan_kitchenroom.addEventListener('click', function() {
     btn0_fan_kitchenroom.style.backgroundColor = "#808080"
     btn2_fan_kitchenroom.style.backgroundColor = "#808080"
     btn1_fan_kitchenroom.style.backgroundColor = "yellow"
     firebase.database().ref("/kitchenroom/devices").update({
          "quatmay": 1
     })   
})
btn2_fan_kitchenroom.addEventListener('click', function() {
     btn0_fan_kitchenroom.style.backgroundColor = "#808080"
     btn1_fan_kitchenroom.style.backgroundColor = "#808080"
     btn2_fan_kitchenroom.style.backgroundColor = "yellow"
     firebase.database().ref("/kitchenroom/devices").update({
          "quatmay": 2
     })   
})










