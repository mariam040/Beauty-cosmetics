function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
}

function showSignup() {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
}

function validateLogin() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return false;
    }
    alert("Login Successful!");
}

function validateSignup() {
    let email = document.getElementById("signupEmail").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let terms = document.getElementById("terms").checked;
    if(email == "") {
        alert("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            alert("emailErr should contain '@'", "Please enter a valid email address");
        } 
    
    if (firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }
    if (!terms) {
        alert("You must accept the terms and conditions");
        return false;
    }
    

else{
alert("Sign Up Successful!");
}
}
}