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

async function validateLogin() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Login Successful! ,go start shopping ");
        localStorage.setItem("token", data.token);
        window.location.href = "homepage.html";
    } else {
        alert(data.error || "Login failed");
    }
}

async function validateSignup() {
    let email = document.getElementById("signupEmail").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let terms = document.getElementById("terms").checked;

    if (email === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    if (!terms) {
        alert("You must accept the terms and conditions");
        return;
    }

    const name = firstName + " " + lastName;

    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Signup successful! Please login.");
        showLogin(); // switch to login
    } else {
        alert(data.error || "Signup failed");
    }
}
