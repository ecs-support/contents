function GetDefault() {
    var get_min = Number(localStorage.getItem("min"));
    var get_max = Number(localStorage.getItem("max"));

    if (get_min < 1) {
        localStorage.setItem("min", 10);

    }
    if (get_max < 1) {
        localStorage.setItem("max", 100);
    }
    document.getElementById("number_min").value = localStorage.getItem("min");
    document.getElementById("number_max").value =  localStorage.getItem("max");      

}

function reverseString(str) {
    return str;
}

