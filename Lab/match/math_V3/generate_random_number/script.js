
var  randoms,answers;
var items = 4;

function myStart() {
    var results = [];
    var min = 10;
    var max = 30;
    var counts = 1;
    var text = "";
    answers = 0;

    for (i = 0; i < items; i++) {
        randoms = Number(getRandomInteger(min, max));
       
        results.push(randoms);

    }
    results.forEach(myFunction);
    document.getElementById("numbers").innerHTML = text;
    
    
    
    function myFunction(value) {
        answers += value;
        if (counts < items){
            text +=  value + " + ";
            
            counts++;

        }else {
        text +=  value;  

        document.getElementById("numbers").innerHTML = text; 
        
    } 

   
    

    }




function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    //  return Math.floor(Math.random() * (+max - +min)) + +min;
}
}

function myAnswer() {
    var t = document.getElementById("numbers").innerHTML

    t +=  " = " + "<span class= w3-text-yellow >" + answers + "</span>" ;  

    document.getElementById("numbers").innerHTML = t; 

    

}