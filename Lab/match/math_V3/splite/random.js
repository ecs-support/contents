function Start() {

    var min = 0;
    var max = 9;
    var pos = 0;
    var id = setInterval(frame, 50);
    function frame() {
      if (pos > 25) {
        clearInterval(id);
        
        
        timer(t);

      } else {
        pos++; 
        var random_one = getRandomInteger(min, max); 
        var random_two = getRandomInteger(min, max);     
        var random_three = getRandomInteger(min, max);    
        var random_nine = getRandomInteger(min, max); 
        var random_ten = getRandomInteger(min, max);     
        var random_eight = getRandomInteger(min, max);
        document.getElementById("one").innerHTML = random_one;
        document.getElementById("two").innerHTML = random_two;
        document.getElementById("three").innerHTML = random_three;
        document.getElementById("nine").innerHTML = random_nine;
        document.getElementById("ten").innerHTML = random_ten;
        document.getElementById("eight").innerHTML = random_eight;

        document.getElementById("four").innerHTML = "+";
      
    }
  }


}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  //  return Math.floor(Math.random() * (+max - +min)) + +min;
  }
