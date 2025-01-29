function toggleForm() {
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function redirectToDashboard() {
    // Sayfalar arasında geçiş sağlamak için bu fonksiyonu kullanacağız.
    window.location.href = "dashboard.html";
}
