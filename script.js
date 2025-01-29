function toggleForm() {
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');

    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

async function registerUser() {
    let username = document.getElementById('register-username').value.trim();
    let password = document.getElementById('register-password').value.trim();
    let errorMessage = document.getElementById('register-error');

    if (username === "" || password === "") {
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = "none", 2000);
        return;
    }

    let response = await fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${username}&password=${password}`
    });

    let result = await response.json();
    if (result.status === "success") {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        toggleForm();
    } else {
        alert("Kayıt başarısız! Kullanıcı adı alınmış olabilir.");
    }
}

async function loginUser() {
    let username = document.getElementById('login-username').value.trim();
    let password = document.getElementById('login-password').value.trim();
    let errorMessage = document.getElementById('login-error');

    if (username === "" || password === "") {
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = "none", 2000);
        return;
    }

    let response = await fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${username}&password=${password}`
    });

    let result = await response.json();
    if (result.status === "success") {
        alert("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...");
        window.location.href = "dashboard.html";
    } else {
        alert("Hatalı kullanıcı adı veya şifre!");
    }
}
