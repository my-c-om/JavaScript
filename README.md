Web Project Structure

📂 Project Folder
```
📂 my_project
 ├── 📂 assets
 │    ├── rain.png
 │    ├── styles.css
 │    ├── script.js
 ├── index.html  (Redirects to login.html)
 ├── main.html
 ├── bottom.html
 ├── style.html
 ├── login.html
 ├── registration.html
 ├── forget_password.html
 ├── home.html
 ├── server.js (For backend)
 ├── package.json (For dependencies)
```

1. index.html (Redirect to Login)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script>
        window.location.href = "login.html";
    </script>
</head>
<body>
</body>
</html>


---

2. login.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p><a href="forget_password.html">Forgot Password?</a></p>
        <p>Don't have an account? <a href="registration.html">Register</a></p>
    </div>
</body>
</html>


---

3. registration.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <div class="container">
        <h2>Register</h2>
        <form action="/register" method="POST">
            <input type="text" name="name" placeholder="Full Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="login.html">Login</a></p>
    </div>
</body>
</html>


---

4. forget_password.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forget Password</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <div class="container">
        <h2>Reset Password</h2>
        <form action="/reset_password" method="POST">
            <input type="email" name="email" placeholder="Enter your email" required>
            <button type="submit">Send Reset Link</button>
        </form>
        <p>Back to <a href="login.html">Login</a></p>
    </div>
</body>
</html>


---

5. home.html (Redirects to Login if Not Authenticated)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/styles.css">
    <script src="assets/script.js"></script>
</head>
<body onload="checkAuth()">
    <header>
        <h1>Welcome to Home</h1>
    </header>
    <main>
        <p>This is the home page after login.</p>
        <button onclick="logout()">Logout</button>
    </main>
</body>
</html>


---

6. main.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Layout</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <header>
        <h1>Website Title</h1>
    </header>
    <nav>
        <a href="home.html">Home</a>
        <a href="login.html">Login</a>
        <a href="registration.html">Register</a>
    </nav>
    <footer>
        <p>&copy; 2025 My Website</p>
    </footer>
</body>
</html>


---

7. bottom.html

<footer>
    <p>&copy; 2025 My Website</p>
</footer>


---

8. style.html (Now assets/styles.css)

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: pink;
    text-align: center;
}

.container {
    width: 300px;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px gray;
}

input, button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
}

button {
    background: black;
    color: white;
    border: none;
}

a {
    text-decoration: none;
    color: blue;
}


---

9. script.js

function checkAuth() {
    if (!localStorage.getItem("user")) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


---

10. Backend (server.js)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/auth_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User Registered" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ message: "Login Successful", user });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));


---

✅ What’s Included?

✔ Login, Registration, Forget Password Pages
✔ Home Page Redirects to Login If Not Authenticated
✔ Main & Bottom Layouts for Reusability
✔ Styled with styles.css
✔ JavaScript for Authentication & Redirects
✔ Backend API with MongoDB (Node.js)

ဒီ format နဲ့ အတူ additional features ထပ်ပေါင်းလိုက်ပါမယ်။ ဘာ features ထပ်ထည့်ချင်သေးလဲ?

