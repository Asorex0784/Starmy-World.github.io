const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERS_FILE = "users.json";

app.use(express.json());
app.use(cors());

// Kullanıcıları yükleme fonksiyonu
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

// Kullanıcı kaydetme
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    let data = loadUsers();

    // Kullanıcı adı kontrolü
    if (data.users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Bu kullanıcı adı zaten alınmış!" });
    }

    // Kullanıcı ekleme
    const newUser = { id: Date.now(), username, password };
    data.users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));

    res.status(201).json({ message: "Kayıt başarılı!" });
});

// Kullanıcı girişi
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    let data = loadUsers();

    const user = data.users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre!" });
    }

    res.status(200).json({ message: "Giriş başarılı!" });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
