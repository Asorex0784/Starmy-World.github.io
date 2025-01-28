// Menü açma ve kapama
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
    menu.style.transform = menu.classList.contains('show-menu') ? 'translateY(0)' : 'translateY(-100%)';
});

// Formlar arasında geçiş
document.getElementById('register-link').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('login-link-back').addEventListener('click', function() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Giriş ve kayıt işlemleri (şu an basit uyarılar)
document.getElementById('login-form-action').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Giriş başarılı!");
});

document.getElementById('register-form-action').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Kaydolma başarılı!");
});
