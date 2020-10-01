function Start() {
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    var digits;
    digits = $('.d');
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
        var f1 = getRandomInteger(min, max); 
        var f2 = getRandomInteger(min, max); 
         
        digits.removeClass('d0 d1 d2 d3 d4 d5 d6 d7 d8 d9');
        one.addClass('d' + f1);   
        two.addClass('d' + f2);  
      }
      
       
        
      
    }
  
  



function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  //  return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}