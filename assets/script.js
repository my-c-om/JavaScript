function checkAuth() {
    if (!localStorage.getItem("user")) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
