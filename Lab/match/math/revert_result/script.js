  document.getElementById('BtnPause').style.display = 'none'; 
  var counts = 0;
  var Lab = 0;
  var input = document.getElementById("result");
  var result_true = 0;
  var result_false = 0;
  var min = new Number(document.getElementById("number_min").value);   
  var max = new Number(document.getElementById("number_max").value); 

  // Execute a function when the user releases a key on the keyboard
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
  });


    function myStart() {
        
    var space = ""; 
    var min = new Number(document.getElementById("number_min").value);   
    var max = new Number(document.getElementById("number_max").value); 
    document.getElementById('myBtn').style.display = 'none'; 
    document.getElementById('BtnPause').style.display = ""; 
    document.getElementById("result").value = space;
    
          
      var pos = 0;
      var id = setInterval(frame, 50);
      function frame() {
        if (pos > 25) {
          clearInterval(id);
          
          document.getElementById("result").focus();
          timer(t);

        } else {
          pos++; 
          var random_first = getRandomInteger(min, max); 
          var random_second = getRandomInteger(min, max);
          
          document.getElementById("number_first").innerHTML = random_first;
          document.getElementById("number_second").innerHTML = random_second;


         
        }
      }
    }

    function CheckResult() {
      document.getElementById('myBtn').style.display = ''; 
    document.getElementById('BtnPause').style.display = "none"; 
    clearTime(t);
      var num_first = document.getElementById("number_first").innerHTML;   
      var num_second = document.getElementById("number_second").innerHTML; 
      var num_result = reverseString((document.getElementById("result").value)); 
      var results = "";
      var answers = Number(num_first) + Number(num_second);
      var descs = num_first + " + " + num_second + " = " + num_result;
      var scores = document.getElementById("my_score");

     
      hours = Math.floor( Lab / (100*60*60) );
      mins  = Math.floor( Lab / (100*60) );
      secs  = Math.floor( Lab / 100 );
      m_secs = Math.floor( Lab );
      m = zeroPadding(mins  - hours * 60,2);
      s =  zeroPadding(secs  - mins  * 60,2);
      m_s = zeroPadding(m_secs - secs * 100,2);

      var table = document.getElementById("myTable");
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      
      if (num_result == answers) {
        results =
          "<i class='far fa-check-circle' style='font-size:20px;color:green'></i>";
        result_true++;
      } else {
        results = "<i class='material-icons' style='font-size:20px;color:red'>clear</i>"; 
        row.style.color = "red";
        descs =  descs + " ["+ answers + "]";
      //  cell2.style.color = "#223A5E";
        

      }
        
        counts++;
        cell1.innerHTML = counts + "."; 
        cell2.innerHTML = descs;
        cell3.innerHTML = m + ":"+ s + ":"+ m_s;
        cell4.innerHTML = results;
       scores.innerHTML = result_true + "   /  " + counts;
       
        Lab = 0;

   
  }

  function reverseString(str) {
    return Number(str.split("").reverse().join(""));
}

  function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

    function getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      //  return Math.floor(Math.random() * (+max - +min)) + +min;
      }


// stopwatch

var h1 = document.getElementsByTagName('time')[0],
   
 Lab=0, ms=0,  seconds = 0, minutes = 0, t;

function add() {
  ms++;
  Lab++;
  if (ms >=100) {  
    ms = 0;      
    seconds++;
   
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    
        if (minutes >= 60) {
            ms,seconds,minutes = 0;
            
        }
    }
  }
    
    h1.textContent =     
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
      ":" +
      (ms ? (ms > 9 ? ms : "0" + ms) : "00");
   

    timer();
}
function timer() {
    t = setTimeout(add, 10);
}


function clearTime(t) {
    clearTimeout(t);
    
}
      
function SaveData() {
  var min = new Number(document.getElementById("number_min").value);   
  var max = new Number(document.getElementById("number_max").value); 
    
    localStorage.setItem("min", min);
    localStorage.setItem("max", max);
}