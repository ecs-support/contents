var attempt = 0; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
  //var username = document.getElementById("username").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById('password').value;

  password = password.toLowerCase();
  if (username ==  password) {
    if (username == 'customs') {
     window.location =
        "https://docs.google.com/forms/d/e/1FAIpQLSfO1erpTnnc8QyGaPN8QxkJhtwebHbHRBoUZoExcqkBD_izEA/viewform?entry.1732401284=GCL+CUSTOMS+TEAM";
    } else if (username == 'transport') {
     window.location =
        "https://docs.google.com/forms/d/e/1FAIpQLSfO1erpTnnc8QyGaPN8QxkJhtwebHbHRBoUZoExcqkBD_izEA/viewform?entry.1732401284=GCL+TRANSPORT+TEAM";
    } else if (username == 'shipping') {
     window.location =
        "https://docs.google.com/forms/d/e/1FAIpQLSfO1erpTnnc8QyGaPN8QxkJhtwebHbHRBoUZoExcqkBD_izEA/viewform?usp=pp_url&entry.1732401284=V-Serve+SHIPPING";
    } else {
       window.location =
        "https://docs.google.com/forms/d/e/1FAIpQLSfO1erpTnnc8QyGaPN8QxkJhtwebHbHRBoUZoExcqkBD_izEA/viewform?entry.1732401284=Administrator";
    }

   

   // window.location = "https://forms.gle/xrUQdLuys83TvKmL9"; // Redirecting to other page.
    // return false;

  } else {
    attempt--; // Decrementing by one.
    alert("User or Password Incorrect")   
    //document.getElementById("username").innerHTML = "";
    document.getElementById("password").value = "";
    }
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      return false;
    }
  }



