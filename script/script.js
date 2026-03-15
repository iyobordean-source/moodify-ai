 const signup = document.getElementById("signup");
 const login = document.getElementById("login");

 function handleclick() {
    window.location.href = "/signup.html";
    console.log("clicked");
 }
function handleclicked() {    window.location.href = "./home/login.html";
    console.log("clicked");
 }

 signup.addEventListener("click", handleclick);
 login.addEventListener("click", handleclicked);
