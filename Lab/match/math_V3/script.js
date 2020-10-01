
document.getElementById("BtnPause").style.display = "none"; 
var min = document.getElementById("number_min").value;
var max = document.getElementById("number_max").value;
var items = document.getElementById("number_item").value; 
var input = document.getElementById("result");
var  randoms,answers;
var text = "";

input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    var displays = document.getElementById("BtnPause");
    if (displays.style.display == "") {
      document.getElementById("BtnPause").click();
    } else {
      document.getElementById("myBtn").click();
    }
  }
})
function myStart() {
    var space = "";
    min = localStorage.getItem("min");
    max = localStorage.getItem("max");
    items = localStorage.getItem("item");
    document.getElementById("myBtn").style.display = "none";
    document.getElementById("BtnPause").style.display = "";
    document.getElementById("result").value = space;
}
    var results = [];
    var pos = 0;
    var id = setInterval(frame, 50);
    

    function frame() {
      if (pos > 25) {
        clearInterval(id);        
        document.getElementById("result").focus();
        timer(t);
      } else {
        pos++; 
        for (i = 0; i < items; i++) {
            randoms = Number(getRandomInteger(min, max));
            if (i < items) {
            text += "<p>"+ value + "</p><span>+</span>";      
            }else {
                text += "<p>" + value + "</p><span>=</span>";   

            }
      }
     
    document.getElementById("numbers").innerHTML = text;
    }}
   
      




function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    //  return Math.floor(Math.random() * (+max - +min)) + +min;
}


function myAnswer() {
    var t = document.getElementById("numbers").innerHTML;
    t +=  " = " + "<span class= w3-text-yellow >" + answers + "</span>" ; 
    document.getElementById("numbers").innerHTML = t ;

}
function timer() {
  t = setTimeout(add, 10);
}

function clearTime(t) {
  clearTimeout(t);
}
function SaveData() {
  var min = newNumber(document.getElementById("number_min").value);
  var max = newNumber(document.getElementById("number_max").value);
  var items = newNumber(document.getElementById("number_item").value);
  localStorage.setItem("min", min);
  localStorage.setItem("max", max);
  localStorage.setItem("item", items)
}